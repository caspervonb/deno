// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

#![deny(warnings)]

use deno_core::error::null_opbuf;
use deno_core::error::AnyError;
use deno_core::serde::Deserialize;
use deno_core::serde_json::json;
use deno_core::serde_json::Value;
use deno_core::JsRuntime;
use deno_core::OpState;
use deno_core::ZeroCopyBuf;
use rand::rngs::StdRng;
use rand::thread_rng;
use rand::Rng;
use std::cell::RefCell;
use std::path::PathBuf;
use std::rc::Rc;

pub use rand; // Re-export rand

/// Execute this crates' JS source files.
pub fn init(isolate: &mut JsRuntime) {
  let files = vec![(
    "deno:op_crates/crypto/01_crypto.js",
    include_str!("01_crypto.js"),
  )];
  for (url, source_code) in files {
    isolate.execute(url, source_code).unwrap();
  }
}

pub fn get_declaration() -> PathBuf {
  PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("lib.deno_crypto.d.ts")
}

pub fn op_crypto_get_random_values(
  state: &mut OpState,
  _args: Value,
  zero_copy: Option<ZeroCopyBuf>,
) -> Result<Value, AnyError> {
  let mut zero_copy = zero_copy.ok_or_else(null_opbuf)?;
  let maybe_seeded_rng = state.try_borrow_mut::<StdRng>();
  if let Some(seeded_rng) = maybe_seeded_rng {
    seeded_rng.fill(&mut *zero_copy);
  } else {
    let mut rng = thread_rng();
    rng.fill(&mut *zero_copy);
  }

  Ok(json!({}))
}

#[derive(Deserialize)]
#[serde(tag = "name")]
enum DigestAlgorithmName {
  #[serde(rename = "SHA-1")]
  SHA1 = 0,
  #[serde(rename = "SHA-256")]
  SHA256 = 1,
  #[serde(rename = "SHA-384")]
  SHA384 = 2,
  #[serde(rename = "SHA-512")]
  SHA512 = 3,
}

static DIGEST_ALGORITHMS: [&ring::digest::Algorithm; 4] = [
  &ring::digest::SHA1_FOR_LEGACY_USE_ONLY,
  &ring::digest::SHA256,
  &ring::digest::SHA384,
  &ring::digest::SHA512,
];

pub async fn op_crypto_subtle_digest(
  _state: Rc<RefCell<OpState>>,
  args: Value,
  zero_copy: Option<ZeroCopyBuf>,
) -> Result<Value, AnyError> {
  let zero_copy = zero_copy.ok_or_else(null_opbuf)?;

  let alg: DigestAlgorithmName = serde_json::from_value(args)?;
  let digest_algorithm = DIGEST_ALGORITHMS[alg as usize];

  let _digest = tokio::task::spawn_blocking(move || {
    ring::digest::digest(digest_algorithm, &zero_copy)
  })
  .await?;

  Ok(Value::Null)
}

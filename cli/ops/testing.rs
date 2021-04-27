use crate::tools::test_runner::TestMessage;
use deno_core::error::generic_error;
use deno_core::error::AnyError;
use deno_core::serde_json;
use deno_core::serde_json::json;
use deno_core::serde_json::Value;
use deno_core::JsRuntime;
use deno_core::OpState;
use deno_core::ZeroCopyBuf;
use deno_runtime::ops::worker_host::create_worker_permissions;
use deno_runtime::ops::worker_host::PermissionsArg;
use deno_runtime::permissions::Permissions;
use serde::Deserialize;
use std::sync::mpsc::Sender;
use uuid::Uuid;

pub fn init(rt: &mut JsRuntime) {
  super::reg_sync(rt, "op_pledge_test_permissions", op_pledge_test_permissions);
  super::reg_sync(
    rt,
    "op_restore_test_permissions",
    op_restore_test_permissions,
  );
  super::reg_sync(rt, "op_send_test_message", op_send_test_message);
}

#[derive(Clone)]
struct PermissionsHolder(Uuid, Permissions);

pub fn op_pledge_test_permissions(
  state: &mut OpState,
  args: Value,
  _zero_copy: Option<ZeroCopyBuf>,
) -> Result<Uuid, AnyError> {
  deno_runtime::ops::check_unstable(state, "Deno.test.permissions");

  let token = Uuid::new_v4();
  let parent_permissions = state.borrow::<Permissions>().clone();
  let worker_permissions = {
    let permissions: PermissionsArg = serde_json::from_value(args)?;
    create_worker_permissions(parent_permissions.clone(), permissions)?
  };

  state.put::<PermissionsHolder>(PermissionsHolder(token, parent_permissions));

  // NOTE: This call overrides current permission set for the worker
  state.put::<Permissions>(worker_permissions);

  Ok(token)
}

pub fn op_restore_test_permissions(
  state: &mut OpState,
  token: Uuid,
  _zero_copy: Option<ZeroCopyBuf>,
) -> Result<(), AnyError> {
  deno_runtime::ops::check_unstable(state, "Deno.test.permissions");

  if let Some(permissions_holder) = state.try_take::<PermissionsHolder>() {
    if token != permissions_holder.0 {
      panic!("restore test permissions token does not match the stored token");
    }

    let permissions = permissions_holder.1;
    state.put::<Permissions>(permissions);
    Ok(())
  } else {
    Err(generic_error("no permissions to restore"))
  }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct SendTestMessageArgs {
  message: TestMessage,
}

fn op_send_test_message(
  state: &mut OpState,
  args: Value,
  _zero_copy: Option<ZeroCopyBuf>,
) -> Result<Value, AnyError> {
  let args: SendTestMessageArgs = serde_json::from_value(args)?;
  let sender = state.borrow::<Sender<TestMessage>>().clone();

  if sender.send(args.message).is_err() {
    Ok(json!(false))
  } else {
    Ok(json!(true))
  }
}

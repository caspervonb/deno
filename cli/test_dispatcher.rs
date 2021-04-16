use serde::Deserialize;
use serde::Serialize;

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub enum TestResult {
  Ok,
  Ignored,
  Failed(String),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(tag = "kind", content = "data", rename_all = "camelCase")]
pub enum TestMessage {
  Plan {
    pending: usize,
    filtered: usize,
    only: bool,
  },
  Wait {
    name: String,
  },
  Result {
    name: String,
    duration: usize,
    result: TestResult,
  },
}

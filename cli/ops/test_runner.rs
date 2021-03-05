use crate::create_main_worker;
use crate::program_state::ProgramState;
use deno_core::error::AnyError;
use deno_core::resolve_url_or_path;
use deno_core::serde_json;
use deno_core::serde_json::json;
use deno_core::serde_json::Value;
use deno_core::BufVec;
use deno_core::ModuleSpecifier;
use deno_core::OpState;
use deno_runtime::permissions::Permissions;
use serde::Deserialize;
use std::cell::RefCell;
use std::rc::Rc;
use std::sync::Arc;

pub fn init(rt: &mut deno_core::JsRuntime) {
  super::reg_json_async(rt, "op_run_test", op_run_test);
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct RunTestArgs {
  index: usize,
}

async fn op_run_test(
  state: Rc<RefCell<OpState>>,
  args: Value,
  data: BufVec,
) -> Result<Value, AnyError> {
  let args: RunTestArgs = serde_json::from_value(args)?;

  let main_module = state.borrow().borrow::<ModuleSpecifier>().clone();
  let program_state = state.borrow().borrow::<Arc<ProgramState>>().clone();
  let permissions = state.borrow().borrow::<Permissions>().clone();

  let mut worker =
    create_main_worker(&program_state, main_module.clone(), permissions);

  let execute_result = worker.execute_module(&main_module).await;
  execute_result?;

  worker
    .execute(&format!("Deno[Deno.internal].tests[{}].fn();", args.index))?;

  worker.run_event_loop().await?;

  Ok(json!({}))
}

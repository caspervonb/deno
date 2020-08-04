// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

#![allow(unused)]

use crate::futures::SinkExt;
use crate::futures::StreamExt;
use crate::tokio_util;
use deno_core::ErrBox;
use serde::Deserialize;
use serde::Serialize;
use url::Url;

pub struct CoverageCollector {
  socket: tokio_tungstenite::WebSocketStream<tokio::net::TcpStream>,
}

// TODO(caspervonb) do not hard-code message ids.
// TODO yield then await each command response after sending the request.
impl CoverageCollector {
  pub async fn connect(url: Url) -> Result<Self, ErrBox> {
    let (socket, response) = tokio_tungstenite::connect_async(url)
      .await
      .expect("Can't connect");
    assert_eq!(response.status(), 101);

    Ok(Self { socket })
  }

  pub async fn start_collecting(&mut self) -> Result<(), ErrBox> {
    self
      .socket
      .send(r#"{"id":1,"method":"Runtime.enable"}"#.into())
      .await?;

    let _msg = self.socket.next().await;

    Ok(())
  }
}

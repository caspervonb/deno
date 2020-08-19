// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import {
  assertEquals,
  assertThrows,
  createResolvable,
  fail,
} from "./unit/test_util.ts";

Deno.test("invalid scheme", () => {
  assertThrows(() => new WebSocket("foo://localhost:4242"));
});

Deno.test("fragment", () => {
  assertThrows(() => new WebSocket("ws://localhost:4242/#"));
  assertThrows(() => new WebSocket("ws://localhost:4242/#foo"));
});

Deno.test("duplicate protocols", () => {
  assertThrows(() => new WebSocket("ws://localhost:4242", ["foo", "foo"]));
});

Deno.test("invalid server", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:2121");
  let i = 0;
  ws.onerror = (): void => {
    i++;
  };
  ws.onclose = (): void => {
    if (i !== 1) {
      fail();
    } else {
      promise.resolve();
    }
  };
  ws.onopen = (): void => fail();
  await promise;
});

Deno.test("connect & close", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => {
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("connect & close custom valid code", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.close(1000);
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("connect & close custom invalid code", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => {
    assertThrows(() => ws.close(1001));
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("connect & close custom valid reason", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.close(1000, "foo");
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("connect & close custom invalid reason", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => {
    assertThrows(() => ws.close(1000, "".padEnd(124, "o")));
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo string", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send("foo");
  ws.onmessage = (e): void => {
    assertEquals(e.data, "foo");
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo blob with binaryType blob", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  const blob = new Blob(["foo"]);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(blob);
  ws.onmessage = (e): void => {
    Promise.all([e.data.text(), blob.text]).then((actual, expected) => {
      assertEquals(actual, expected);
      ws.close();
    });
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo blob with binaryType arraybuffer", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.binaryType = "arraybuffer";
  const blob = new Blob(["foo"]);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(blob);
  ws.onmessage = async (e): Promise<void> => {
    assertEquals(await e.data, await blob.arrayBuffer());
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo uint8array with binaryType blob", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  const uint = new Uint8Array([102, 111, 111]);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(uint);
  ws.onmessage = async (e): Promise<void> => {
    assertEquals(await e.data.arrayBuffer(), uint.buffer);
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo uint8array with binaryType arraybuffer", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.binaryType = "arraybuffer";
  const uint = new Uint8Array([102, 111, 111]);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(uint);
  ws.onmessage = (e): void => {
    assertEquals(e.data, uint.buffer);
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo arraybuffer with binaryType blob", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  const buffer = new ArrayBuffer(3);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(buffer);
  ws.onmessage = async (e): Promise<void> => {
    assertEquals(await e.data.arrayBuffer(), buffer);
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("echo arraybuffer with binaryType arraybuffer", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.binaryType = "arraybuffer";
  const buffer = new ArrayBuffer(3);
  ws.onerror = (): void => fail();
  ws.onopen = (): void => ws.send(buffer);
  ws.onmessage = (e): void => {
    assertEquals(e.data, buffer);
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

Deno.test("send setinterval", async () => {
  const promise = createResolvable();
  const ws = new WebSocket("ws://localhost:4242");
  ws.onerror = (): void => fail();
  ws.onopen = (): void => {
    let i = 0;
    const interval = setInterval(() => {
      ws.send("foo");
      if (i == 9) {
        clearInterval(interval);
      }
      i++;
    }, 100);
    ws.close();
  };
  ws.onclose = (): void => {
    promise.resolve();
  };
  await promise;
});

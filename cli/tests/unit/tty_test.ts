// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { unitTest, assert } from "./test_util.ts";

// Note tests for Deno.setRaw is in integration tests.

unitTest(
  { ignore: Deno.build.os === "windows" },
  function getConsoleSize(): void {
    const winsize = Deno.getConsoleSize(Deno.stdout.rid);

    assert(winsize.columns >= 0);
    assert(winsize.innerHeight >= 0);
    assert(winsize.innerWidth >= 0);
    assert(winsize.rows >= 0);
  }
);

unitTest({ perms: { read: true } }, function isatty(): void {
  // CI not under TTY, so cannot test stdin/stdout/stderr.
  const f = Deno.openSync("cli/tests/hello.txt");
  assert(!Deno.isatty(f.rid));
  f.close();
});

unitTest(function isattyError(): void {
  let caught = false;
  try {
    // Absurdly large rid.
    Deno.isatty(0x7fffffff);
  } catch (e) {
    caught = true;
    assert(e instanceof Deno.errors.BadResource);
  }
  assert(caught);
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
"use strict";

((window) => {
  const core = window.Deno.core;
  const webidl = window.__bootstrap.webidl;

  function getRandomValues(arrayBufferView) {
    if (!ArrayBuffer.isView(arrayBufferView)) {
      throw new TypeError(
        "Argument 1 does not implement interface ArrayBufferView",
      );
    }
    if (
      !(
        arrayBufferView instanceof Int8Array ||
        arrayBufferView instanceof Uint8Array ||
        arrayBufferView instanceof Int16Array ||
        arrayBufferView instanceof Uint16Array ||
        arrayBufferView instanceof Int32Array ||
        arrayBufferView instanceof Uint32Array ||
        arrayBufferView instanceof Uint8ClampedArray
      )
    ) {
      throw new DOMException(
        "The provided ArrayBufferView is not an integer array type",
        "TypeMismatchError",
      );
    }
    if (arrayBufferView.byteLength > 65536) {
      throw new DOMException(
        `The ArrayBufferView's byte length (${arrayBufferView.byteLength}) exceeds the number of bytes of entropy available via this API (65536)`,
        "QuotaExceededError",
      );
    }
    const ui8 = new Uint8Array(
      arrayBufferView.buffer,
      arrayBufferView.byteOffset,
      arrayBufferView.byteLength,
    );
    core.opSync("op_crypto_get_random_values", null, ui8);
    return arrayBufferView;
  }

  const supportedAlgorithms = {
    "digest": {
      "SHA-1": {},
      "SHA-256": {},
      "SHA-384": {},
      "SHA-512": {},
    },
  };

  function normalizeAlgorithm(algorithm, op) {
    if (typeof algorithm == "string") {
      return normalizeAlgorithm({ name: algorithm }, op);
    }

    const initialAlgorithm = webidl.converters["Algorithm"](algorithm, {
      context: "Argument 1",
    });

    const registeredAlgorithms = supportedAlgorithms[op];
    const algorithmName = Object.keys(registeredAlgorithms)
      .find((key) => key.toLowerCase() == initialAlgorithm.name.toLowerCase());

    if (algorithmName === undefined) {
      throw new DOMException(
        "Unrecognized algorithm name",
        "NotSupportedError",
      );
    }

    // TODO(caspervonb) Step 6 (create from webidl definition), when the need arises.
    // See https://www.w3.org/TR/WebCryptoAPI/#dfn-normalize-an-algorithm
    const normalizedAlgorithm = {};
    normalizedAlgorithm.name = algorithmName;

    // TODO(caspervonb) Step 9 and 10, when the need arises.
    // See https://www.w3.org/TR/WebCryptoAPI/#dfn-normalize-an-algorithm
    return normalizedAlgorithm;
  }

  // Should match op_crypto_subtle_digest() in extensions/crypto/lib.rs
  function digestToId(name) {
    switch (name) {
      case "SHA-1":
        return 0;
      case "SHA-256":
        return 1;
      case "SHA-384":
        return 2;
      case "SHA-512":
        return 3;
    }
  }

  class SubtleCrypto {
    constructor() {
      webidl.illegalConstructor();
    }

    async digest(algorithm, data) {
      webidl.assertBranded(this, SubtleCrypto);
      webidl.requiredArguments(arguments.length, 2);

      algorithm = webidl.converters.AlgorithmIdentifier(algorithm, {
        context: "Argument 1",
      });

      data = webidl.converters.BufferSource(data, {
        context: "Argument 2",
      });

      if (ArrayBuffer.isView(data)) {
        data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      } else {
        data = new Uint8Array(data);
      }

      data = data.slice();

      algorithm = normalizeAlgorithm(algorithm, "digest");

      const result = await core.opAsync(
        "op_crypto_subtle_digest",
        digestToId(algorithm.name),
        data,
      );

      return result.buffer;
    }
  }

  const subtle = webidl.createBranded(SubtleCrypto);

  window.crypto = {
    getRandomValues,
    subtle,
  };

  window.SubtleCrypto = SubtleCrypto;

  window.__bootstrap.crypto = {
    getRandomValues,
    subtle,
    SubtleCrypto,
  };
})(this);

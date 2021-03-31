// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
"use strict";

// Implements https://www.w3.org/TR/WebCryptoAPI

((window) => {
  const core = window.Deno.core;

  function getRandomValues(arrayBufferView) {
    if (!ArrayBuffer.isView(arrayBufferView)) {
      throw new TypeError(
        "Argument 1 does not implement the interface ArrayBufferView",
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
    core.jsonOpSync("op_crypto_get_random_values", {}, ui8);
    return arrayBufferView;
  }

  // Algorithm normalization, which involves storing the expected data for
  // each pair of algorithm and crypto operation, is done on the JS side because
  // it is convenient.
  // Shall it stay that way, or are we better to move it on the Rust side?

  // We need this method after initialization, anytime we need to normalize
  // a provided algorithm. We store it here to prevent prototype pollution.
  const toUpperCase = String.prototype.toUpperCase;

  class RegisteredAlgorithmsContainer {
    #nameIndex;
    #definitions;

    constructor(definitions) {
      this.#nameIndex = Object.create(null);
      this.#definitions = Object.create(null);
      for (const [name, definition] of Object.entries(definitions)) {
        this.#nameIndex[name.toUpperCase()] = name;
        this.#definitions[name] = definition;
      }
    }

    /**
     * A definition is an object whose keys are the keys that the input must
     * have and whose values are validation functions for the associate value.
     * The validation function will either return the value if it valid, or
     * throw an error that must be forwarded.
     */
    getDefinition(name) {
      return this.#definitions[name];
    }

    normalizeName(providedName) {
      const upperCaseName = toUpperCase.call(providedName);
      return this.#nameIndex[upperCaseName];
    }
  }

  const supportedAlgorithms = {
    digest: new RegisteredAlgorithmsContainer({
      "SHA-1": {},
      "SHA-256": {},
      "SHA-384": {},
      "SHA-512": {},
    }),
  };

  const digestByteLengths = {
    "SHA-1": 20,
    "SHA-256": 32,
    "SHA-384": 48,
    "SHA-512": 64,
  };

  function normalizeAlgorithm(algorithm, registeredAlgorithms) {
    let alg;
    if (typeof algorithm === "string") {
      alg = { name: algorithm };
    } else if (typeof algorithm === "object" && algorithm !== null) {
      if (typeof algorithm.name !== "string") {
        throw new TypeError("Algorithm name is missing or not a string");
      }
      alg = { ...algorithm };
    } else {
      throw new TypeError("Argument 1 must be an object or a string");
    }
    const algorithmName = registeredAlgorithms.normalizeName(alg.name);
    if (algorithmName === undefined) {
      throw new DOMException(
        "Unrecognized algorithm name",
        "NotSupportedError",
      );
    }
    const definition = registeredAlgorithms.getDefinition(algorithmName);
    for (const [propertyName, validate] of Object.entries(definition)) {
      alg[propertyName] = validate(algorithm[propertyName]);
    }
    alg.name = algorithmName;
    return alg;
  }

  const subtle = {
    async digest(algorithm, data) {
      let input;
      if (data instanceof ArrayBuffer) {
        input = new Uint8Array(data);
      } else if (ArrayBuffer.isView(data)) {
        input = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      } else {
        throw new TypeError(
          "Argument 2 is not an ArrayBuffer nor does it implement the interface ArrayBufferView",
        );
      }
      const alg = normalizeAlgorithm(algorithm, supportedAlgorithms.digest);
      const output = new ArrayBuffer(digestByteLengths[alg.name]);
      await core.jsonOpAsync(
        "op_crypto_subtle_digest",
        alg,
        // We need to copy the input because the specs require it.
        input.slice(0),
        new Uint8Array(output, 0, output.byteLength),
      );
      return output;
    },
  };

  window.crypto = {
    getRandomValues,
    subtle,
  };
  window.__bootstrap = window.__bootstrap || {};
  window.__bootstrap.crypto = {
    getRandomValues,
    subtle,
  };
})(this);

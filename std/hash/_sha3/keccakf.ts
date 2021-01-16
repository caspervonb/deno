// Ported from Go:
// https://github.com/golang/crypto/blob/master/sha3/keccakf.go
// Copyright 2011 The Go Authors. All rights reserved. BSD license.
// https://github.com/golang/go/blob/master/LICENSE
// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

const KECCAK_ROUNDS = 24;
const KECCAK_RC: number[] = [
  0x1,
  0x0,
  0x8082,
  0x0,
  0x808a,
  0x80000000,
  0x80008000,
  0x80000000,
  0x808b,
  0x0,
  0x80000001,
  0x0,
  0x80008081,
  0x80000000,
  0x8009,
  0x80000000,
  0x8a,
  0x0,
  0x88,
  0x0,
  0x80008009,
  0x0,
  0x8000000a,
  0x0,
  0x8000808b,
  0x0,
  0x8b,
  0x80000000,
  0x8089,
  0x80000000,
  0x8003,
  0x80000000,
  0x8002,
  0x80000000,
  0x80,
  0x80000000,
  0x800a,
  0x0,
  0x8000000a,
  0x80000000,
  0x80008081,
  0x80000000,
  0x8080,
  0x80000000,
  0x80000001,
  0x0,
  0x80008008,
  0x80000000,
];

/** keccak1600 permutation function */
export function keccakf(state: Uint8Array): void {
  const s = new Uint32Array(state.buffer);
  let bc0 = 0;
  let bc1 = 0;
  let bc2 = 0;
  let bc3 = 0;
  let bc4 = 0;
  let bc5 = 0;
  let bc6 = 0;
  let bc7 = 0;
  let bc8 = 0;
  let bc9 = 0;
  let d0 = 0;
  let d1 = 0;
  let d2 = 0;
  let d3 = 0;
  let d4 = 0;
  let d5 = 0;
  let d6 = 0;
  let d7 = 0;
  let d8 = 0;
  let d9 = 0;
  let t0 = 0;
  let t1 = 0;

  for (let n = 0; n < KECCAK_ROUNDS * 2; n += 8) {
    // Round 1
    bc0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    bc1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    bc2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    bc3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    bc4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    bc5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    bc6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    bc7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    bc8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    bc9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    d0 = bc8 ^ ((bc2 << 1) | (bc3 >>> 31));
    d1 = bc9 ^ ((bc3 << 1) | (bc2 >>> 31));
    d2 = bc0 ^ ((bc4 << 1) | (bc5 >>> 31));
    d3 = bc1 ^ ((bc5 << 1) | (bc4 >>> 31));
    d4 = bc2 ^ ((bc6 << 1) | (bc7 >>> 31));
    d5 = bc3 ^ ((bc7 << 1) | (bc6 >>> 31));
    d6 = bc4 ^ ((bc8 << 1) | (bc9 >>> 31));
    d7 = bc5 ^ ((bc9 << 1) | (bc8 >>> 31));
    d8 = bc6 ^ ((bc0 << 1) | (bc1 >>> 31));
    d9 = bc7 ^ ((bc1 << 1) | (bc0 >>> 31));

    bc0 = s[0] ^ d0;
    bc1 = s[1] ^ d1;
    t0 = s[12] ^ d2;
    t1 = s[13] ^ d3;
    bc2 = (t1 << 12) | (t0 >>> 20);
    bc3 = (t0 << 12) | (t1 >>> 20);
    t0 = s[24] ^ d4;
    t1 = s[25] ^ d5;
    bc4 = (t1 << 11) | (t0 >>> 21);
    bc5 = (t0 << 11) | (t1 >>> 21);
    t0 = s[36] ^ d6;
    t1 = s[37] ^ d7;
    bc6 = (t0 << 21) | (t1 >>> 11);
    bc7 = (t1 << 21) | (t0 >>> 11);
    t0 = s[48] ^ d8;
    t1 = s[49] ^ d9;
    bc8 = (t0 << 14) | (t1 >>> 18);
    bc9 = (t1 << 14) | (t0 >>> 18);
    s[0] = bc0 ^ (bc4 & ~bc2) ^ KECCAK_RC[n];
    s[1] = bc1 ^ (bc5 & ~bc3) ^ KECCAK_RC[n + 1];
    s[12] = bc2 ^ (bc6 & ~bc4);
    s[13] = bc3 ^ (bc7 & ~bc5);
    s[24] = bc4 ^ (bc8 & ~bc6);
    s[25] = bc5 ^ (bc9 & ~bc7);
    s[36] = bc6 ^ (bc0 & ~bc8);
    s[37] = bc7 ^ (bc1 & ~bc9);
    s[48] = bc8 ^ (bc2 & ~bc0);
    s[49] = bc9 ^ (bc3 & ~bc1);

    t0 = s[20] ^ d0;
    t1 = s[21] ^ d1;
    bc4 = (t0 << 3) | (t1 >>> 29);
    bc5 = (t1 << 3) | (t0 >>> 29);
    t0 = s[32] ^ d2;
    t1 = s[33] ^ d3;
    bc6 = (t1 << 13) | (t0 >>> 19);
    bc7 = (t0 << 13) | (t1 >>> 19);
    t0 = s[44] ^ d4;
    t1 = s[45] ^ d5;
    bc8 = (t1 << 29) | (t0 >>> 3);
    bc9 = (t0 << 29) | (t1 >>> 3);
    t0 = s[6] ^ d6;
    t1 = s[7] ^ d7;
    bc0 = (t0 << 28) | (t1 >>> 4);
    bc1 = (t1 << 28) | (t0 >>> 4);
    t0 = s[18] ^ d8;
    t1 = s[19] ^ d9;
    bc2 = (t0 << 20) | (t1 >>> 12);
    bc3 = (t1 << 20) | (t0 >>> 12);
    s[20] = bc0 ^ (bc4 & ~bc2);
    s[21] = bc1 ^ (bc5 & ~bc3);
    s[32] = bc2 ^ (bc6 & ~bc4);
    s[33] = bc3 ^ (bc7 & ~bc5);
    s[44] = bc4 ^ (bc8 & ~bc6);
    s[45] = bc5 ^ (bc9 & ~bc7);
    s[6] = bc6 ^ (bc0 & ~bc8);
    s[7] = bc7 ^ (bc1 & ~bc9);
    s[18] = bc8 ^ (bc2 & ~bc0);
    s[19] = bc9 ^ (bc3 & ~bc1);

    t0 = s[40] ^ d0;
    t1 = s[41] ^ d1;
    bc8 = (t0 << 18) | (t1 >>> 14);
    bc9 = (t1 << 18) | (t0 >>> 14);
    t0 = s[2] ^ d2;
    t1 = s[3] ^ d3;
    bc0 = (t0 << 1) | (t1 >>> 31);
    bc1 = (t1 << 1) | (t0 >>> 31);
    t0 = s[14] ^ d4;
    t1 = s[15] ^ d5;
    bc2 = (t0 << 6) | (t1 >>> 26);
    bc3 = (t1 << 6) | (t0 >>> 26);
    t0 = s[26] ^ d6;
    t1 = s[27] ^ d7;
    bc4 = (t0 << 25) | (t1 >>> 7);
    bc5 = (t1 << 25) | (t0 >>> 7);
    t0 = s[38] ^ d8;
    t1 = s[39] ^ d9;
    bc6 = (t0 << 8) | (t1 >>> 24);
    bc7 = (t1 << 8) | (t0 >>> 24);
    s[40] = bc0 ^ (bc4 & ~bc2);
    s[41] = bc1 ^ (bc5 & ~bc3);
    s[2] = bc2 ^ (bc6 & ~bc4);
    s[3] = bc3 ^ (bc7 & ~bc5);
    s[14] = bc4 ^ (bc8 & ~bc6);
    s[15] = bc5 ^ (bc9 & ~bc7);
    s[26] = bc6 ^ (bc0 & ~bc8);
    s[27] = bc7 ^ (bc1 & ~bc9);
    s[38] = bc8 ^ (bc2 & ~bc0);
    s[39] = bc9 ^ (bc3 & ~bc1);

    t0 = s[10] ^ d0;
    t1 = s[11] ^ d1;
    bc2 = (t1 << 4) | (t0 >>> 28);
    bc3 = (t0 << 4) | (t1 >>> 28);
    t0 = s[22] ^ d2;
    t1 = s[23] ^ d3;
    bc4 = (t0 << 10) | (t1 >>> 22);
    bc5 = (t1 << 10) | (t0 >>> 22);
    t0 = s[34] ^ d4;
    t1 = s[35] ^ d5;
    bc6 = (t0 << 15) | (t1 >>> 17);
    bc7 = (t1 << 15) | (t0 >>> 17);
    t0 = s[46] ^ d6;
    t1 = s[47] ^ d7;
    bc8 = (t1 << 24) | (t0 >>> 8);
    bc9 = (t0 << 24) | (t1 >>> 8);
    t0 = s[8] ^ d8;
    t1 = s[9] ^ d9;
    bc0 = (t0 << 27) | (t1 >>> 5);
    bc1 = (t1 << 27) | (t0 >>> 5);
    s[10] = bc0 ^ (bc4 & ~bc2);
    s[11] = bc1 ^ (bc5 & ~bc3);
    s[22] = bc2 ^ (bc6 & ~bc4);
    s[23] = bc3 ^ (bc7 & ~bc5);
    s[34] = bc4 ^ (bc8 & ~bc6);
    s[35] = bc5 ^ (bc9 & ~bc7);
    s[46] = bc6 ^ (bc0 & ~bc8);
    s[47] = bc7 ^ (bc1 & ~bc9);
    s[8] = bc8 ^ (bc2 & ~bc0);
    s[9] = bc9 ^ (bc3 & ~bc1);

    t0 = s[30] ^ d0;
    t1 = s[31] ^ d1;
    bc6 = (t1 << 9) | (t0 >>> 23);
    bc7 = (t0 << 9) | (t1 >>> 23);
    t0 = s[42] ^ d2;
    t1 = s[43] ^ d3;
    bc8 = (t0 << 2) | (t1 >>> 30);
    bc9 = (t1 << 2) | (t0 >>> 30);
    t0 = s[4] ^ d4;
    t1 = s[5] ^ d5;
    bc0 = (t1 << 30) | (t0 >>> 2);
    bc1 = (t0 << 30) | (t1 >>> 2);
    t0 = s[16] ^ d6;
    t1 = s[17] ^ d7;
    bc2 = (t1 << 23) | (t0 >>> 9);
    bc3 = (t0 << 23) | (t1 >>> 9);
    t0 = s[28] ^ d8;
    t1 = s[29] ^ d9;
    bc4 = (t1 << 7) | (t0 >>> 25);
    bc5 = (t0 << 7) | (t1 >>> 25);
    s[30] = bc0 ^ (bc4 & ~bc2);
    s[31] = bc1 ^ (bc5 & ~bc3);
    s[42] = bc2 ^ (bc6 & ~bc4);
    s[43] = bc3 ^ (bc7 & ~bc5);
    s[4] = bc4 ^ (bc8 & ~bc6);
    s[5] = bc5 ^ (bc9 & ~bc7);
    s[16] = bc6 ^ (bc0 & ~bc8);
    s[17] = bc7 ^ (bc1 & ~bc9);
    s[28] = bc8 ^ (bc2 & ~bc0);
    s[29] = bc9 ^ (bc3 & ~bc1);

    // Round 2
    bc0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    bc1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    bc2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    bc3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    bc4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    bc5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    bc6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    bc7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    bc8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    bc9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    d0 = bc8 ^ ((bc2 << 1) | (bc3 >>> 31));
    d1 = bc9 ^ ((bc3 << 1) | (bc2 >>> 31));
    d2 = bc0 ^ ((bc4 << 1) | (bc5 >>> 31));
    d3 = bc1 ^ ((bc5 << 1) | (bc4 >>> 31));
    d4 = bc2 ^ ((bc6 << 1) | (bc7 >>> 31));
    d5 = bc3 ^ ((bc7 << 1) | (bc6 >>> 31));
    d6 = bc4 ^ ((bc8 << 1) | (bc9 >>> 31));
    d7 = bc5 ^ ((bc9 << 1) | (bc8 >>> 31));
    d8 = bc6 ^ ((bc0 << 1) | (bc1 >>> 31));
    d9 = bc7 ^ ((bc1 << 1) | (bc0 >>> 31));

    bc0 = s[0] ^ d0;
    bc1 = s[1] ^ d1;
    t0 = s[32] ^ d2;
    t1 = s[33] ^ d3;
    bc2 = (t1 << 12) | (t0 >>> 20);
    bc3 = (t0 << 12) | (t1 >>> 20);
    t0 = s[14] ^ d4;
    t1 = s[15] ^ d5;
    bc4 = (t1 << 11) | (t0 >>> 21);
    bc5 = (t0 << 11) | (t1 >>> 21);
    t0 = s[46] ^ d6;
    t1 = s[47] ^ d7;
    bc6 = (t0 << 21) | (t1 >>> 11);
    bc7 = (t1 << 21) | (t0 >>> 11);
    t0 = s[28] ^ d8;
    t1 = s[29] ^ d9;
    bc8 = (t0 << 14) | (t1 >>> 18);
    bc9 = (t1 << 14) | (t0 >>> 18);
    s[0] = bc0 ^ (bc4 & ~bc2) ^ KECCAK_RC[n + 2];
    s[1] = bc1 ^ (bc5 & ~bc3) ^ KECCAK_RC[n + 3];
    s[32] = bc2 ^ (bc6 & ~bc4);
    s[33] = bc3 ^ (bc7 & ~bc5);
    s[14] = bc4 ^ (bc8 & ~bc6);
    s[15] = bc5 ^ (bc9 & ~bc7);
    s[46] = bc6 ^ (bc0 & ~bc8);
    s[47] = bc7 ^ (bc1 & ~bc9);
    s[28] = bc8 ^ (bc2 & ~bc0);
    s[29] = bc9 ^ (bc3 & ~bc1);

    t0 = s[40] ^ d0;
    t1 = s[41] ^ d1;
    bc4 = (t0 << 3) | (t1 >>> 29);
    bc5 = (t1 << 3) | (t0 >>> 29);
    t0 = s[22] ^ d2;
    t1 = s[23] ^ d3;
    bc6 = (t1 << 13) | (t0 >>> 19);
    bc7 = (t0 << 13) | (t1 >>> 19);
    t0 = s[4] ^ d4;
    t1 = s[5] ^ d5;
    bc8 = (t1 << 29) | (t0 >>> 3);
    bc9 = (t0 << 29) | (t1 >>> 3);
    t0 = s[36] ^ d6;
    t1 = s[37] ^ d7;
    bc0 = (t0 << 28) | (t1 >>> 4);
    bc1 = (t1 << 28) | (t0 >>> 4);
    t0 = s[18] ^ d8;
    t1 = s[19] ^ d9;
    bc2 = (t0 << 20) | (t1 >>> 12);
    bc3 = (t1 << 20) | (t0 >>> 12);
    s[40] = bc0 ^ (bc4 & ~bc2);
    s[41] = bc1 ^ (bc5 & ~bc3);
    s[22] = bc2 ^ (bc6 & ~bc4);
    s[23] = bc3 ^ (bc7 & ~bc5);
    s[4] = bc4 ^ (bc8 & ~bc6);
    s[5] = bc5 ^ (bc9 & ~bc7);
    s[36] = bc6 ^ (bc0 & ~bc8);
    s[37] = bc7 ^ (bc1 & ~bc9);
    s[18] = bc8 ^ (bc2 & ~bc0);
    s[19] = bc9 ^ (bc3 & ~bc1);

    t0 = s[30] ^ d0;
    t1 = s[31] ^ d1;
    bc8 = (t0 << 18) | (t1 >>> 14);
    bc9 = (t1 << 18) | (t0 >>> 14);
    t0 = s[12] ^ d2;
    t1 = s[13] ^ d3;
    bc0 = (t0 << 1) | (t1 >>> 31);
    bc1 = (t1 << 1) | (t0 >>> 31);
    t0 = s[44] ^ d4;
    t1 = s[45] ^ d5;
    bc2 = (t0 << 6) | (t1 >>> 26);
    bc3 = (t1 << 6) | (t0 >>> 26);
    t0 = s[26] ^ d6;
    t1 = s[27] ^ d7;
    bc4 = (t0 << 25) | (t1 >>> 7);
    bc5 = (t1 << 25) | (t0 >>> 7);
    t0 = s[8] ^ d8;
    t1 = s[9] ^ d9;
    bc6 = (t0 << 8) | (t1 >>> 24);
    bc7 = (t1 << 8) | (t0 >>> 24);
    s[30] = bc0 ^ (bc4 & ~bc2);
    s[31] = bc1 ^ (bc5 & ~bc3);
    s[12] = bc2 ^ (bc6 & ~bc4);
    s[13] = bc3 ^ (bc7 & ~bc5);
    s[44] = bc4 ^ (bc8 & ~bc6);
    s[45] = bc5 ^ (bc9 & ~bc7);
    s[26] = bc6 ^ (bc0 & ~bc8);
    s[27] = bc7 ^ (bc1 & ~bc9);
    s[8] = bc8 ^ (bc2 & ~bc0);
    s[9] = bc9 ^ (bc3 & ~bc1);

    t0 = s[20] ^ d0;
    t1 = s[21] ^ d1;
    bc2 = (t1 << 4) | (t0 >>> 28);
    bc3 = (t0 << 4) | (t1 >>> 28);
    t0 = s[2] ^ d2;
    t1 = s[3] ^ d3;
    bc4 = (t0 << 10) | (t1 >>> 22);
    bc5 = (t1 << 10) | (t0 >>> 22);
    t0 = s[34] ^ d4;
    t1 = s[35] ^ d5;
    bc6 = (t0 << 15) | (t1 >>> 17);
    bc7 = (t1 << 15) | (t0 >>> 17);
    t0 = s[16] ^ d6;
    t1 = s[17] ^ d7;
    bc8 = (t1 << 24) | (t0 >>> 8);
    bc9 = (t0 << 24) | (t1 >>> 8);
    t0 = s[48] ^ d8;
    t1 = s[49] ^ d9;
    bc0 = (t0 << 27) | (t1 >>> 5);
    bc1 = (t1 << 27) | (t0 >>> 5);
    s[20] = bc0 ^ (bc4 & ~bc2);
    s[21] = bc1 ^ (bc5 & ~bc3);
    s[2] = bc2 ^ (bc6 & ~bc4);
    s[3] = bc3 ^ (bc7 & ~bc5);
    s[34] = bc4 ^ (bc8 & ~bc6);
    s[35] = bc5 ^ (bc9 & ~bc7);
    s[16] = bc6 ^ (bc0 & ~bc8);
    s[17] = bc7 ^ (bc1 & ~bc9);
    s[48] = bc8 ^ (bc2 & ~bc0);
    s[49] = bc9 ^ (bc3 & ~bc1);

    t0 = s[10] ^ d0;
    t1 = s[11] ^ d1;
    bc6 = (t1 << 9) | (t0 >>> 23);
    bc7 = (t0 << 9) | (t1 >>> 23);
    t0 = s[42] ^ d2;
    t1 = s[43] ^ d3;
    bc8 = (t0 << 2) | (t1 >>> 30);
    bc9 = (t1 << 2) | (t0 >>> 30);
    t0 = s[24] ^ d4;
    t1 = s[25] ^ d5;
    bc0 = (t1 << 30) | (t0 >>> 2);
    bc1 = (t0 << 30) | (t1 >>> 2);
    t0 = s[6] ^ d6;
    t1 = s[7] ^ d7;
    bc2 = (t1 << 23) | (t0 >>> 9);
    bc3 = (t0 << 23) | (t1 >>> 9);
    t0 = s[38] ^ d8;
    t1 = s[39] ^ d9;
    bc4 = (t1 << 7) | (t0 >>> 25);
    bc5 = (t0 << 7) | (t1 >>> 25);
    s[10] = bc0 ^ (bc4 & ~bc2);
    s[11] = bc1 ^ (bc5 & ~bc3);
    s[42] = bc2 ^ (bc6 & ~bc4);
    s[43] = bc3 ^ (bc7 & ~bc5);
    s[24] = bc4 ^ (bc8 & ~bc6);
    s[25] = bc5 ^ (bc9 & ~bc7);
    s[6] = bc6 ^ (bc0 & ~bc8);
    s[7] = bc7 ^ (bc1 & ~bc9);
    s[38] = bc8 ^ (bc2 & ~bc0);
    s[39] = bc9 ^ (bc3 & ~bc1);

    // Round 3
    bc0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    bc1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    bc2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    bc3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    bc4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    bc5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    bc6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    bc7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    bc8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    bc9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    d0 = bc8 ^ ((bc2 << 1) | (bc3 >>> 31));
    d1 = bc9 ^ ((bc3 << 1) | (bc2 >>> 31));
    d2 = bc0 ^ ((bc4 << 1) | (bc5 >>> 31));
    d3 = bc1 ^ ((bc5 << 1) | (bc4 >>> 31));
    d4 = bc2 ^ ((bc6 << 1) | (bc7 >>> 31));
    d5 = bc3 ^ ((bc7 << 1) | (bc6 >>> 31));
    d6 = bc4 ^ ((bc8 << 1) | (bc9 >>> 31));
    d7 = bc5 ^ ((bc9 << 1) | (bc8 >>> 31));
    d8 = bc6 ^ ((bc0 << 1) | (bc1 >>> 31));
    d9 = bc7 ^ ((bc1 << 1) | (bc0 >>> 31));

    bc0 = s[0] ^ d0;
    bc1 = s[1] ^ d1;
    t0 = s[22] ^ d2;
    t1 = s[23] ^ d3;
    bc2 = (t1 << 12) | (t0 >>> 20);
    bc3 = (t0 << 12) | (t1 >>> 20);
    t0 = s[44] ^ d4;
    t1 = s[45] ^ d5;
    bc4 = (t1 << 11) | (t0 >>> 21);
    bc5 = (t0 << 11) | (t1 >>> 21);
    t0 = s[16] ^ d6;
    t1 = s[17] ^ d7;
    bc6 = (t0 << 21) | (t1 >>> 11);
    bc7 = (t1 << 21) | (t0 >>> 11);
    t0 = s[38] ^ d8;
    t1 = s[39] ^ d9;
    bc8 = (t0 << 14) | (t1 >>> 18);
    bc9 = (t1 << 14) | (t0 >>> 18);
    s[0] = bc0 ^ (bc4 & ~bc2) ^ KECCAK_RC[n + 4];
    s[1] = bc1 ^ (bc5 & ~bc3) ^ KECCAK_RC[n + 5];
    s[22] = bc2 ^ (bc6 & ~bc4);
    s[23] = bc3 ^ (bc7 & ~bc5);
    s[44] = bc4 ^ (bc8 & ~bc6);
    s[45] = bc5 ^ (bc9 & ~bc7);
    s[16] = bc6 ^ (bc0 & ~bc8);
    s[17] = bc7 ^ (bc1 & ~bc9);
    s[38] = bc8 ^ (bc2 & ~bc0);
    s[39] = bc9 ^ (bc3 & ~bc1);

    t0 = s[30] ^ d0;
    t1 = s[31] ^ d1;
    bc4 = (t0 << 3) | (t1 >>> 29);
    bc5 = (t1 << 3) | (t0 >>> 29);
    t0 = s[2] ^ d2;
    t1 = s[3] ^ d3;
    bc6 = (t1 << 13) | (t0 >>> 19);
    bc7 = (t0 << 13) | (t1 >>> 19);
    t0 = s[24] ^ d4;
    t1 = s[25] ^ d5;
    bc8 = (t1 << 29) | (t0 >>> 3);
    bc9 = (t0 << 29) | (t1 >>> 3);
    t0 = s[46] ^ d6;
    t1 = s[47] ^ d7;
    bc0 = (t0 << 28) | (t1 >>> 4);
    bc1 = (t1 << 28) | (t0 >>> 4);
    t0 = s[18] ^ d8;
    t1 = s[19] ^ d9;
    bc2 = (t0 << 20) | (t1 >>> 12);
    bc3 = (t1 << 20) | (t0 >>> 12);
    s[30] = bc0 ^ (bc4 & ~bc2);
    s[31] = bc1 ^ (bc5 & ~bc3);
    s[2] = bc2 ^ (bc6 & ~bc4);
    s[3] = bc3 ^ (bc7 & ~bc5);
    s[24] = bc4 ^ (bc8 & ~bc6);
    s[25] = bc5 ^ (bc9 & ~bc7);
    s[46] = bc6 ^ (bc0 & ~bc8);
    s[47] = bc7 ^ (bc1 & ~bc9);
    s[18] = bc8 ^ (bc2 & ~bc0);
    s[19] = bc9 ^ (bc3 & ~bc1);

    t0 = s[10] ^ d0;
    t1 = s[11] ^ d1;
    bc8 = (t0 << 18) | (t1 >>> 14);
    bc9 = (t1 << 18) | (t0 >>> 14);
    t0 = s[32] ^ d2;
    t1 = s[33] ^ d3;
    bc0 = (t0 << 1) | (t1 >>> 31);
    bc1 = (t1 << 1) | (t0 >>> 31);
    t0 = s[4] ^ d4;
    t1 = s[5] ^ d5;
    bc2 = (t0 << 6) | (t1 >>> 26);
    bc3 = (t1 << 6) | (t0 >>> 26);
    t0 = s[26] ^ d6;
    t1 = s[27] ^ d7;
    bc4 = (t0 << 25) | (t1 >>> 7);
    bc5 = (t1 << 25) | (t0 >>> 7);
    t0 = s[48] ^ d8;
    t1 = s[49] ^ d9;
    bc6 = (t0 << 8) | (t1 >>> 24);
    bc7 = (t1 << 8) | (t0 >>> 24);
    s[10] = bc0 ^ (bc4 & ~bc2);
    s[11] = bc1 ^ (bc5 & ~bc3);
    s[32] = bc2 ^ (bc6 & ~bc4);
    s[33] = bc3 ^ (bc7 & ~bc5);
    s[4] = bc4 ^ (bc8 & ~bc6);
    s[5] = bc5 ^ (bc9 & ~bc7);
    s[26] = bc6 ^ (bc0 & ~bc8);
    s[27] = bc7 ^ (bc1 & ~bc9);
    s[48] = bc8 ^ (bc2 & ~bc0);
    s[49] = bc9 ^ (bc3 & ~bc1);

    t0 = s[40] ^ d0;
    t1 = s[41] ^ d1;
    bc2 = (t1 << 4) | (t0 >>> 28);
    bc3 = (t0 << 4) | (t1 >>> 28);
    t0 = s[12] ^ d2;
    t1 = s[13] ^ d3;
    bc4 = (t0 << 10) | (t1 >>> 22);
    bc5 = (t1 << 10) | (t0 >>> 22);
    t0 = s[34] ^ d4;
    t1 = s[35] ^ d5;
    bc6 = (t0 << 15) | (t1 >>> 17);
    bc7 = (t1 << 15) | (t0 >>> 17);
    t0 = s[6] ^ d6;
    t1 = s[7] ^ d7;
    bc8 = (t1 << 24) | (t0 >>> 8);
    bc9 = (t0 << 24) | (t1 >>> 8);
    t0 = s[28] ^ d8;
    t1 = s[29] ^ d9;
    bc0 = (t0 << 27) | (t1 >>> 5);
    bc1 = (t1 << 27) | (t0 >>> 5);
    s[40] = bc0 ^ (bc4 & ~bc2);
    s[41] = bc1 ^ (bc5 & ~bc3);
    s[12] = bc2 ^ (bc6 & ~bc4);
    s[13] = bc3 ^ (bc7 & ~bc5);
    s[34] = bc4 ^ (bc8 & ~bc6);
    s[35] = bc5 ^ (bc9 & ~bc7);
    s[6] = bc6 ^ (bc0 & ~bc8);
    s[7] = bc7 ^ (bc1 & ~bc9);
    s[28] = bc8 ^ (bc2 & ~bc0);
    s[29] = bc9 ^ (bc3 & ~bc1);

    t0 = s[20] ^ d0;
    t1 = s[21] ^ d1;
    bc6 = (t1 << 9) | (t0 >>> 23);
    bc7 = (t0 << 9) | (t1 >>> 23);
    t0 = s[42] ^ d2;
    t1 = s[43] ^ d3;
    bc8 = (t0 << 2) | (t1 >>> 30);
    bc9 = (t1 << 2) | (t0 >>> 30);
    t0 = s[14] ^ d4;
    t1 = s[15] ^ d5;
    bc0 = (t1 << 30) | (t0 >>> 2);
    bc1 = (t0 << 30) | (t1 >>> 2);
    t0 = s[36] ^ d6;
    t1 = s[37] ^ d7;
    bc2 = (t1 << 23) | (t0 >>> 9);
    bc3 = (t0 << 23) | (t1 >>> 9);
    t0 = s[8] ^ d8;
    t1 = s[9] ^ d9;
    bc4 = (t1 << 7) | (t0 >>> 25);
    bc5 = (t0 << 7) | (t1 >>> 25);
    s[20] = bc0 ^ (bc4 & ~bc2);
    s[21] = bc1 ^ (bc5 & ~bc3);
    s[42] = bc2 ^ (bc6 & ~bc4);
    s[43] = bc3 ^ (bc7 & ~bc5);
    s[14] = bc4 ^ (bc8 & ~bc6);
    s[15] = bc5 ^ (bc9 & ~bc7);
    s[36] = bc6 ^ (bc0 & ~bc8);
    s[37] = bc7 ^ (bc1 & ~bc9);
    s[8] = bc8 ^ (bc2 & ~bc0);
    s[9] = bc9 ^ (bc3 & ~bc1);

    // Round 4
    bc0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    bc1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    bc2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    bc3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    bc4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    bc5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    bc6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    bc7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    bc8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    bc9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    d0 = bc8 ^ ((bc2 << 1) | (bc3 >>> 31));
    d1 = bc9 ^ ((bc3 << 1) | (bc2 >>> 31));
    d2 = bc0 ^ ((bc4 << 1) | (bc5 >>> 31));
    d3 = bc1 ^ ((bc5 << 1) | (bc4 >>> 31));
    d4 = bc2 ^ ((bc6 << 1) | (bc7 >>> 31));
    d5 = bc3 ^ ((bc7 << 1) | (bc6 >>> 31));
    d6 = bc4 ^ ((bc8 << 1) | (bc9 >>> 31));
    d7 = bc5 ^ ((bc9 << 1) | (bc8 >>> 31));
    d8 = bc6 ^ ((bc0 << 1) | (bc1 >>> 31));
    d9 = bc7 ^ ((bc1 << 1) | (bc0 >>> 31));

    bc0 = s[0] ^ d0;
    bc1 = s[1] ^ d1;
    t0 = s[2] ^ d2;
    t1 = s[3] ^ d3;
    bc2 = (t1 << 12) | (t0 >>> 20);
    bc3 = (t0 << 12) | (t1 >>> 20);
    t0 = s[4] ^ d4;
    t1 = s[5] ^ d5;
    bc4 = (t1 << 11) | (t0 >>> 21);
    bc5 = (t0 << 11) | (t1 >>> 21);
    t0 = s[6] ^ d6;
    t1 = s[7] ^ d7;
    bc6 = (t0 << 21) | (t1 >>> 11);
    bc7 = (t1 << 21) | (t0 >>> 11);
    t0 = s[8] ^ d8;
    t1 = s[9] ^ d9;
    bc8 = (t0 << 14) | (t1 >>> 18);
    bc9 = (t1 << 14) | (t0 >>> 18);
    s[0] = bc0 ^ (bc4 & ~bc2) ^ KECCAK_RC[n + 6];
    s[1] = bc1 ^ (bc5 & ~bc3) ^ KECCAK_RC[n + 7];
    s[2] = bc2 ^ (bc6 & ~bc4);
    s[3] = bc3 ^ (bc7 & ~bc5);
    s[4] = bc4 ^ (bc8 & ~bc6);
    s[5] = bc5 ^ (bc9 & ~bc7);
    s[6] = bc6 ^ (bc0 & ~bc8);
    s[7] = bc7 ^ (bc1 & ~bc9);
    s[8] = bc8 ^ (bc2 & ~bc0);
    s[9] = bc9 ^ (bc3 & ~bc1);

    t0 = s[10] ^ d0;
    t1 = s[11] ^ d1;
    bc4 = (t0 << 3) | (t1 >>> 29);
    bc5 = (t1 << 3) | (t0 >>> 29);
    t0 = s[12] ^ d2;
    t1 = s[13] ^ d3;
    bc6 = (t1 << 13) | (t0 >>> 19);
    bc7 = (t0 << 13) | (t1 >>> 19);
    t0 = s[14] ^ d4;
    t1 = s[15] ^ d5;
    bc8 = (t1 << 29) | (t0 >>> 3);
    bc9 = (t0 << 29) | (t1 >>> 3);
    t0 = s[16] ^ d6;
    t1 = s[17] ^ d7;
    bc0 = (t0 << 28) | (t1 >>> 4);
    bc1 = (t1 << 28) | (t0 >>> 4);
    t0 = s[18] ^ d8;
    t1 = s[19] ^ d9;
    bc2 = (t0 << 20) | (t1 >>> 12);
    bc3 = (t1 << 20) | (t0 >>> 12);
    s[10] = bc0 ^ (bc4 & ~bc2);
    s[11] = bc1 ^ (bc5 & ~bc3);
    s[12] = bc2 ^ (bc6 & ~bc4);
    s[13] = bc3 ^ (bc7 & ~bc5);
    s[14] = bc4 ^ (bc8 & ~bc6);
    s[15] = bc5 ^ (bc9 & ~bc7);
    s[16] = bc6 ^ (bc0 & ~bc8);
    s[17] = bc7 ^ (bc1 & ~bc9);
    s[18] = bc8 ^ (bc2 & ~bc0);
    s[19] = bc9 ^ (bc3 & ~bc1);

    t0 = s[20] ^ d0;
    t1 = s[21] ^ d1;
    bc8 = (t0 << 18) | (t1 >>> 14);
    bc9 = (t1 << 18) | (t0 >>> 14);
    t0 = s[22] ^ d2;
    t1 = s[23] ^ d3;
    bc0 = (t0 << 1) | (t1 >>> 31);
    bc1 = (t1 << 1) | (t0 >>> 31);
    t0 = s[24] ^ d4;
    t1 = s[25] ^ d5;
    bc2 = (t0 << 6) | (t1 >>> 26);
    bc3 = (t1 << 6) | (t0 >>> 26);
    t0 = s[26] ^ d6;
    t1 = s[27] ^ d7;
    bc4 = (t0 << 25) | (t1 >>> 7);
    bc5 = (t1 << 25) | (t0 >>> 7);
    t0 = s[28] ^ d8;
    t1 = s[29] ^ d9;
    bc6 = (t0 << 8) | (t1 >>> 24);
    bc7 = (t1 << 8) | (t0 >>> 24);
    s[20] = bc0 ^ (bc4 & ~bc2);
    s[21] = bc1 ^ (bc5 & ~bc3);
    s[22] = bc2 ^ (bc6 & ~bc4);
    s[23] = bc3 ^ (bc7 & ~bc5);
    s[24] = bc4 ^ (bc8 & ~bc6);
    s[25] = bc5 ^ (bc9 & ~bc7);
    s[26] = bc6 ^ (bc0 & ~bc8);
    s[27] = bc7 ^ (bc1 & ~bc9);
    s[28] = bc8 ^ (bc2 & ~bc0);
    s[29] = bc9 ^ (bc3 & ~bc1);

    t0 = s[30] ^ d0;
    t1 = s[31] ^ d1;
    bc2 = (t1 << 4) | (t0 >>> 28);
    bc3 = (t0 << 4) | (t1 >>> 28);
    t0 = s[32] ^ d2;
    t1 = s[33] ^ d3;
    bc4 = (t0 << 10) | (t1 >>> 22);
    bc5 = (t1 << 10) | (t0 >>> 22);
    t0 = s[34] ^ d4;
    t1 = s[35] ^ d5;
    bc6 = (t0 << 15) | (t1 >>> 17);
    bc7 = (t1 << 15) | (t0 >>> 17);
    t0 = s[36] ^ d6;
    t1 = s[37] ^ d7;
    bc8 = (t1 << 24) | (t0 >>> 8);
    bc9 = (t0 << 24) | (t1 >>> 8);
    t0 = s[38] ^ d8;
    t1 = s[39] ^ d9;
    bc0 = (t0 << 27) | (t1 >>> 5);
    bc1 = (t1 << 27) | (t0 >>> 5);
    s[30] = bc0 ^ (bc4 & ~bc2);
    s[31] = bc1 ^ (bc5 & ~bc3);
    s[32] = bc2 ^ (bc6 & ~bc4);
    s[33] = bc3 ^ (bc7 & ~bc5);
    s[34] = bc4 ^ (bc8 & ~bc6);
    s[35] = bc5 ^ (bc9 & ~bc7);
    s[36] = bc6 ^ (bc0 & ~bc8);
    s[37] = bc7 ^ (bc1 & ~bc9);
    s[38] = bc8 ^ (bc2 & ~bc0);
    s[39] = bc9 ^ (bc3 & ~bc1);

    t0 = s[40] ^ d0;
    t1 = s[41] ^ d1;
    bc6 = (t1 << 9) | (t0 >>> 23);
    bc7 = (t0 << 9) | (t1 >>> 23);
    t0 = s[42] ^ d2;
    t1 = s[43] ^ d3;
    bc8 = (t0 << 2) | (t1 >>> 30);
    bc9 = (t1 << 2) | (t0 >>> 30);
    t0 = s[44] ^ d4;
    t1 = s[45] ^ d5;
    bc0 = (t1 << 30) | (t0 >>> 2);
    bc1 = (t0 << 30) | (t1 >>> 2);
    t0 = s[46] ^ d6;
    t1 = s[47] ^ d7;
    bc2 = (t1 << 23) | (t0 >>> 9);
    bc3 = (t0 << 23) | (t1 >>> 9);
    t0 = s[48] ^ d8;
    t1 = s[49] ^ d9;
    bc4 = (t1 << 7) | (t0 >>> 25);
    bc5 = (t0 << 7) | (t1 >>> 25);
    s[40] = bc0 ^ (bc4 & ~bc2);
    s[41] = bc1 ^ (bc5 & ~bc3);
    s[42] = bc2 ^ (bc6 & ~bc4);
    s[43] = bc3 ^ (bc7 & ~bc5);
    s[44] = bc4 ^ (bc8 & ~bc6);
    s[45] = bc5 ^ (bc9 & ~bc7);
    s[46] = bc6 ^ (bc0 & ~bc8);
    s[47] = bc7 ^ (bc1 & ~bc9);
    s[48] = bc8 ^ (bc2 & ~bc0);
    s[49] = bc9 ^ (bc3 & ~bc1);
  }
}

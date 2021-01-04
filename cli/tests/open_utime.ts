const tempDir = await Deno.makeTempDir();
await Deno.writeTextFile(`${tempDir}/foo`);
await Deno.writeTextFile(`${tempDir}/bar`);

await Promise.all([
	Deno.open(`${tempDir}/foo`),
	Deno.utime(`${tempDir}/bar`, Date.now(), Date.now())
]);

console.log("Success");

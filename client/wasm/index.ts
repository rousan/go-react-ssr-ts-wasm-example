import wasmFilePath from './wasm-path';

let isWasmInitialized = false;
const registryName = "wasm";

declare global {
  interface Window {
    Go: any,
    [registryName]: any
  }
}

async function initWasm() {
  if (isWasmInitialized) {
    return;
  }

  // @ts-ignore
  await import("./wasm_exec.js");

  if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
    };
  }

  const go = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch(wasmFilePath), go.importObject);
  go.run(result.instance);

  isWasmInitialized = true;
  console.log("WebAssembly is initialized!");
}

export async function add(x: number, y: number): Promise<number> {
  await initWasm();
  return window.wasm.add(x, y);
}

export async function subtract(x: number, y: number): Promise<number> {
  await initWasm();
  return window.wasm.subtract(x, y);
}
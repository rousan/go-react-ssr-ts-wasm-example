let isWasmInitialize = false;

const registryName = "wasm";

declare global {
  interface Window {
    Go: any,
    [registryName]: any
  }
}

async function initWasm() {
  if (!isWasmInitialize) {
    if (!WebAssembly.instantiateStreaming) {
      WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
      };
    }

    const go = new window.Go();
    const result = await WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject);
    go.run(result.instance);

    isWasmInitialize = true;
  }
}

export async function add(x: number, y: number): Promise<number> {
  await initWasm();
  return window.wasm.add(x, y)
}
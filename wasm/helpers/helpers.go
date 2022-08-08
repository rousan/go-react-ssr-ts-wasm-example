package helpers

import (
	"fmt"
	"runtime/debug"
	"syscall/js"
)

const (
	registryName string = "wasm"
)

func getRegistry() js.Value {
	registry := js.Global().Get(registryName)
	if registry.Type() != js.TypeObject {
		js.Global().Set(registryName, map[string]any{})
		registry = js.Global().Get(registryName)
	}

	return registry
}

func RegisterFn(name string, fn func(args ...js.Value) any) {
	registry := getRegistry()

	registry.Set(name, js.FuncOf(func(this js.Value, fnArgs []js.Value) any {
		promiseConstructor := js.Global().Get("Promise")
		return promiseConstructor.New(js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
			resolve, reject := promiseArgs[0], promiseArgs[1]

			go func() {
				defer func() {
					if err := recover(); err != nil {
						errMsg := fmt.Sprintf("Stacktrace from panic: %v", string(debug.Stack()))
						jsErr := js.Global().Get("Error").New(errMsg)
						reject.Invoke(jsErr)
					}
				}()

				res := fn(fnArgs...)
				resolve.Invoke(res)
			}()

			return nil
		}))
	}))
}

func RegisterValue(name string, value any) {
	registry := getRegistry()
	registry.Set(name, value)
}

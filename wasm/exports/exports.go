package exports

import (
	"syscall/js"

	"rousan.io/myapp/wasm/helpers"
)

func add(args ...js.Value) any {
	a, b := args[0].Float(), args[1].Float()
	return a + b
}

func divide(args ...js.Value) any {
	a, b := args[0].Float(), args[1].Float()
	return a / b
}

func subtract(args ...js.Value) any {
	a, b := args[0].Float(), args[1].Float()
	return a - b
}

func Register() {
	helpers.RegisterFn("add", add)
	helpers.RegisterFn("divide", divide)
	helpers.RegisterFn("subtract", subtract)
}

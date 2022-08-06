# go-react-ts-wasm-example

An example project with uses Golang, React, TypeScript and WebAssembly.

## Requirements

It's using [tusk](https://github.com/rliebz/tusk) to run the automated scripts. Install it from the following:

```sh
brew install rliebz/tusk/tusk
```

## Development

Setup the project by installing all the required dev tools:

```sh
tusk setup
```

Start the dev server:

```sh
tusk dev
```

Start the prod server:

```sh
tusk start
```

Start the prod server in Docker:

```sh
tusk up
```

Start the prod server in Docker in detached mode:

```sh
tusk up:detached
```

Deploy the staging server in VPS:

```sh
tusk deploy:staging
```

Deploy the production server in VPS:

```sh
tusk deploy:prod
```

**Note:** Please make sure to stop the staging server in VPS when it is NOT needed, otherwise it will consume resources which will affect the production server.

Please refer to `tusk.yml` file for more commands.
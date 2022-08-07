# go-react-ts-wasm-example

An example project which uses Golang as backend, NextJS as frontend, also it uses TypeScript and WebAssembly(Golang).

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

Start the dev server for client:

```sh
tusk dev:client
```

Start the dev server for server:

```sh
tusk dev:server
```

## Deployment

First, go to VPS machine and create env files in `client` and `server` folders from `client/.env.local.example` as `.env.local` and from `server/.env.example` as `.env` respectively.

Deploy in staging environment:

```sh
tusk deploy:staging
```

Deploy in production environment:

```sh
tusk deploy:prod
```
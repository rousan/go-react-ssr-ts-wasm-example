# go-react-ts-wasm-example

An example project which uses Golang as backend, NextJS as frontend, also it uses TypeScript and WebAssembly(Golang).

## Requirements

It's using [tusk](https://github.com/rliebz/tusk) to run the automated scripts. Install it from the following:

```sh
$ brew install rliebz/tusk/tusk
```

## Development

Setup the project by installing all the required dev tools:

```sh
$ tusk setup
```

Start the dev servers (`http://localhost:3001/`):

```sh
$ tusk dev
```

Start the app in prod mode (`http://localhost:3001/`):

```sh
$ tusk start
```

Start the app in prod mode in Docker (`http://localhost:80/`):

```sh
$ tusk up
```

Start the app in prod mode in Docker in detached mode (`http://localhost:80/`):

```sh
$ tusk up:detached
```

## Deployment

First, go to VPS machine and create env files in `client` and `server` folders from `client/.env.local.example` as `.env.local` and from `server/.env.example` as `.env` respectively.

Deploy in staging environment:

```sh
$ tusk deploy:staging
```

Deploy in production environment:

```sh
$ tusk deploy:prod
```
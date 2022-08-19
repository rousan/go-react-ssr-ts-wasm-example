### WARNING: Do not use Golang as Wasm, use Rust instead.
1. Rust wasm file size is very low compared to Golnag.
2. Rust takes very little memory, Golang takes more due to GC.
3. Rust is faster than Golang.
4. Also, Golang is perfect for server/services (due to goroutine), not for WebAssembly.

# go-react-ts-wasm-example

An example project which uses Golang as backend, NextJS as frontend, also it uses TypeScript and WebAssembly(Golang).

## Requirements

It's using [tusk](https://github.com/rliebz/tusk) to run the automated scripts. Install it from the following:

```sh
$ brew install rliebz/tusk/tusk
```

## Development

Setup the project for development:

```sh
$ tusk setup:dev
```

Setup the project for production:

```sh
$ tusk setup:prod
```

Start the dev servers (`http://localhost:3001/`):

```sh
$ tusk dev
```

Start the app in prod mode (`http://localhost:3001/`):

```sh
$ tusk build && tusk start
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

Deploy in staging environment:

```sh
$ tusk deploy:staging
```

Deploy in production environment:

```sh
$ tusk deploy:prod
```

## Deploy on Heroku

1. After creating the app on heroku, connect the app with the Github repo to automate deployment on `push` (See `Deploy` tab).
2. Run the following command to enable container deployment:

```sh
$ heroku stack:set container --app <app_name_on_heroku>
```
3. Click on `Enable Automatic Deploys` to automate the deployment on branch push.
4. Push to the configured branch or click on `Deploy Branch` button to deploy.

**Notes:** The same process can be followed with the staging (deployed from `develop` branch) and production (deployed from `main` branch) apps.

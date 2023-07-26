# React quick start

## Install NodeJS

Use your system's package manager or [fnm](https://github.com/Schniz/fnm):

```shell
$ curl -fsSL https://fnm.vercel.app/install | bash
$ fnm install v20.2.0
$ fnm use v20.2.0
```

## Create a new app

Create a new React app. Note that while using the npm development server, the app will not have access to
astral APIs.

```shell
$ npx create-react-app myapp
$ cd myapp
$ npm start
```

## Run using wails runtime

Build the app and launch it using wails runtime:

```shell
$ npm run build
$ astral-runtime-wails build/
```

You can zip the contents of the build directory:
```shell
$ (cd build; zip ../app.zip -r .)
$ astral-runtime-wails app.zip
```

## Create bundle with frontend & backend 

App bundle can be installed on the astral agent app.

1. Create `service.js` implementation in project `src` directory.
2. Append service filename to `public/manifest.json`:
```json
  ...
  "service": "service.js"
}
```
3. Add `bundle` command to `package.json` scripts:
```json
  ...
  "scripts": {
    ...
    "bundle": "cp ./src/service.js ./build/ && rm app.zip && cd ./build && zip -r ../app.zip *"
  },
  ...
```
4. Build & bundle app:
```shell
$ npm run build
$ npm run bundle
```

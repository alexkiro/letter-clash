# letter-clash

[![Run Tests](https://github.com/alexkiro/letter-clash/actions/workflows/tests.yml/badge.svg)](https://github.com/alexkiro/letter-clash/actions/workflows/tests.yml)
[![Code Style](https://github.com/alexkiro/letter-clash/actions/workflows/style.yml/badge.svg)](https://github.com/alexkiro/letter-clash/actions/workflows/style.yml)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

```sh
npm run style:fix
```

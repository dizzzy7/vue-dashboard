# vue-dashboard

## Libraries

- chart.js
- pinia (state management library)

## Notes

Possible Dashboards that I could build:

- Currency Graph, display graph that shows some currency in EUR
- Weather
- BVG/S-Bahn
- Open Street Maps

TODO:
add https://vue-chartjs.org/ for graphs

### Weather

- Show current temps,
- Show weather charts

  - Show rain probabilities for the day, (blue column chart)
  - Show the temps for the day (line graph)

- Show temps of following days

Weather Codes to display different weather states can be found here:
https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

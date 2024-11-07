# vue-dashboard

## Setup

To build the project you can use your favorite package manager.
I have been using bun. I tried npm and it works as well.

## Project Setup

```sh
bun install
npm install
```

### Compile and Hot-Reload for Development

```sh
bun dev
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## APIs used

I have used the the following APIs:

Location:
http://ip-api.com/json/

Weather:
http://api.open-meteo.com/v1/forecast?latitude=${location.value.lat}&longitude=${location.value.lon}&forecast_days=${forecastDays}&timezone=${timeZone}&${interval}=precipitation_probability,temperature_2m,weather_code,is_day

Currency:
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json

Look into the service files (/src/api/.\*Service.ts) to see the api usage and how i fetch the data.

## Libraries

- "@tanstack/vue-query": "^5.59.17",
- "@vueuse/core": "^11.2.0",
- "chart.js": "^4.4.6",
- "chartjs-plugin-datalabels": "^2.2.0",
- "date-fns": "^4.1.0",
- "pinia": "^2.2.6",
- "vue": "^3.5.12",
- "vue-chartjs": "^5.3.2",
- "vue-router": "^4.4.5"

## Notes

Possible Dashboards that I could build:

- Currency Graph, display graph that shows some currency in EUR
- Weather
- BVG/S-Bahn
- Open Street Maps

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

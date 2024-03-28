# pika-api.js

pika-api.js is an NPM package that helps to interact with the public Pika Network API.

## Features

- Fully type-safe
- Complete type safety in runtime with zod
- Easy to understand
- Fully promise-based
- Built with modern and blazing fast technology
- Supports both CommonJS and ESModules

## Installation

```sh
npm install pika-api.js
yarn add pika-api.js
pnpm add pika-api.js
```

## Usage

```js
import Pika from "pika-api.js";
// or
const Pika = require("pika-api.js");

const pika = new Pika.PikaNetwork();
pika.getTotalLeaderboard(Pika.Gamemode.BedWars);
pika.getLeaderboard({
  gamemode: Pika.Gamemode.BedWars,
  leaderboardType: Pika.LeaderboardType.Kills,
  interval: Pika.Interval.Weekly, // Not required, defaults to Interval.AllTime
  mode: Pika.Mode.Solo, // Not required, defaults to Mode.AllModes
  limit: 10, // Not required, defaults to 15
});
pika.getProfile("mallusrgreat");
pika.getProfileLeaderboard({
  username: "BlakD3mon_",
  gamemode: Pika.Gamemode.BedWars,
  interval: Pika.Interval.Weekly, // Not required, defaults to Interval.AllTime
  mode: Pika.Mode.Solo, // Not required, defaults to Mode.AllModes
  limit: 10, // Not required, defaults to 15
});
pika.getRecap("d1a2a364-148a-4efe-af1e-f40cd7973d4f");
```

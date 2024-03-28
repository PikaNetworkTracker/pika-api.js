# pika.js

Pika.js is an NPM package that helps to interact with the public Pika Network API.

## Features

- Fully type-safe
- Complete type safety in runtime with zod
- Easy to understand
- Fully promise-based
- Built with modern and blazing fast technology
- Supports both CommonJS and ESModules

## Usage

```js
import Pika from "pika.js";
// or
const Pika = require("pika.js");

const pika = new Pika.PikaNetwork();
pika.getTotalLeaderboard(Gamemode.BedWars);
pika.getLeaderboard({
  gamemode: Gamemode.BedWars,
  leaderboardType: LeaderboardType.Kills,
  interval: Interval.Weekly, // Not required, defaults to Interval.AllTime
  mode: Mode.Solo, // Not required, defaults to Mode.AllModes
  limit: 10, // Not required, defaults to 15
});
pika.getProfile("mallusrgreat");
```

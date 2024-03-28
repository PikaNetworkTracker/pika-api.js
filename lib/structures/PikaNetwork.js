const { request } = require("undici");
const { Interval, Mode, Gamemode, LeaderboardType } = require("../index.js");
const { z } = require("zod");
const { fromZodError } = require("zod-validation-error");
class PikaNetworkError extends Error {}
module.exports = class PikaNetwork {
  /**
   * @private
   */
  BASE_URL = "https://stats.pika-network.net/api";
  /**
   * The total data about all leaderboards.
   * @param {import("../enums/Gamemode.js")[keyof import("../enums/Gamemode.js")]} gamemode The gamemode to check the total data of
   * @returns {import("../types/index.js").TotalLeaderboardEntry[]}
   */
  async getTotalLeaderboard(gamemode) {
    const schema = z.enum(Object.values(Gamemode));
    const data = schema.safeParse(gamemode);
    if (!data.success) throw new PikaNetworkError(fromZodError(data.error));
    const res = await request(
      `${this.BASE_URL}/leaderboards/total?type=${gamemode}`
    );
    const body = await res.body.json();
    return body;
  }
  /**
   *
   * @param {import("../types/index.js").GetLeaderboardOptions} options
   * @returns {import("../types/index.js").Leaderboard}
   */
  async getLeaderboard(options) {
    if (!options.limit) options.limit = 15;
    if (!options.interval) options.interval = Interval.Weekly;
    if (!options.mode) options.mode = Mode.AllModes;
    const schema = z.object({
      gamemode: z.enum(Object.values(Gamemode)),
      leaderboardType: z.enum(Object.values(LeaderboardType)),
      interval: z.enum(Object.values(Interval)),
      mode: z.enum(Object.values(Mode)),
      limit: z.number().min(1),
    });
    const parsed = schema.safeParse(options);
    if (!parsed.success) throw new PikaNetworkError(fromZodError(parsed.error));
    const { data } = parsed;
    const res = await request(
      `${this.BASE_URL}/leaderboards?type=${data.gamemode}&stat=${data.leaderboardType}&interval=${data.interval}&mode=${data.mode}&limit=${data.limit}`
    );
    return res.body.json();
  }
  /**
   * Get the profile of a player.
   * @param {string} username The username of the player
   */
  async getProfile(username) {
    const schema = z.string().regex(/^[A-Za-z0-9_]{3,16}$/, "Invalid username");
    const parsed = schema.safeParse(username);
    if (!parsed.success) throw new PikaNetworkError(fromZodError(parsed.error));
    const { data } = parsed;
    const res = await request(`${this.BASE_URL}/profile/${data}`);
    return res.body.json().catch((e) => {
      if (e.message === "Unexpected end of JSON input")
        throw new PikaNetworkError("Player not found");
      throw e;
    });
  }
};

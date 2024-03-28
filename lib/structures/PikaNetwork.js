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
   * @returns {Promise<import("../types/index.js").TotalLeaderboardEntry[]>}
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
   * Get the leaderboard of a gamemode with specific stats
   * @param {import("../types/index.js").GetLeaderboardOptions} options
   * @returns {Promise<import("../types/index.js").Leaderboard>}
   */
  async getLeaderboard(options) {
    if (nullOrUndefined(options.limit)) options.limit = 15;
    if (nullOrUndefined(options.interval)) options.interval = Interval.Weekly;
    if (nullOrUndefined(options.mode)) options.mode = Mode.AllModes;
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
   * @returns {Promise<import("../types/index.js").Profile>}
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
  /**
   * Gets information about a recap
   * @param {string} id The recap ID.
   * @returns {Promise<import("../types/index.js").Recap>}
   */
  async getRecap(id) {
    const schema = z.string().uuid("Not a valid recap UUID");
    const parsed = schema.safeParse(id);
    if (!parsed.success) throw new PikaNetworkError(fromZodError(parsed.error));
    const res = await request(`${this.BASE_URL}/recaps/${parsed.data}`);
    return res.body.json().catch((e) => {
      if (e.message === "Unexpected end of JSON input")
        throw new PikaNetworkError("Invalid recap");
    });
  }
};
function nullOrUndefined(v) {
  return v === null || typeof v === "undefined";
}
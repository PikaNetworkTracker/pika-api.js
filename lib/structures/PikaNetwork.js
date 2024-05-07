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
    return queue(`${this.BASE_URL}/leaderboards/total?type=${gamemode}`);
  }
  /**
   * Get the leaderboard of a gamemode with specific stats
   * @param {import("../types/index.js").GetLeaderboardOptions} options
   * @returns {Promise<import("../types/index.js").Leaderboard>}
   */
  async getLeaderboard(options) {
    options.limit ??= 15;
    options.interval ??= Interval.Weekly;
    options.mode ??= Mode.AllModes;
    options.offset ??= 0;
    const schema = z.object({
      gamemode: z.enum(Object.values(Gamemode)),
      leaderboardType: z.enum(Object.values(LeaderboardType)),
      interval: z.enum(Object.values(Interval)),
      mode: z.enum(Object.values(Mode)),
      limit: z.number().min(1),
      offset: z.number().min(0),
    });
    const parsed = schema.safeParse(options);
    if (!parsed.success) throw new PikaNetworkError(fromZodError(parsed.error));
    const { data } = parsed;
    return queue(
      `${this.BASE_URL}/leaderboards?type=${data.gamemode}&stat=${data.leaderboardType}&interval=${data.interval}&mode=${data.mode}&limit=${data.limit}&offset=${data.offset}`
    );
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
    return queue(`${this.BASE_URL}/profile/${data}`);
  }
  /**
   * Get the leaderboard of a gamemode with specific stats
   * @param {import("../types/index.js").GetProfileLeaderboardOptions} options
   * @returns {Promise<import("../types/index.js").ProfileLeaderboard>}
   */
  async getProfileLeaderboard(options) {
    options.limit ??= 15;
    options.interval ??= Interval.Weekly;
    options.mode ??= Mode.AllModes;
    const schema = z.object({
      username: z.string().regex(/^[A-Za-z0-9_]{3,16}$/, "Invalid username"),
      gamemode: z.enum(Object.values(Gamemode)),
      interval: z.enum(Object.values(Interval)),
      mode: z.enum(Object.values(Mode)),
      limit: z.number().min(1),
    });
    const parsed = schema.safeParse(options);
    if (!parsed.success) throw new PikaNetworkError(fromZodError(parsed.error));
    const { data } = parsed;
    return queue(
      `${this.BASE_URL}/profile/${data.username}/leaderboard?type=${data.gamemode}&interval=${data.interval}&mode=${data.mode}&limit=${data.limit}`
    );
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
    return queue(`${this.BASE_URL}/recaps/${parsed.data}`);
  }

  /**
   * Gets the top factions from OPFactions
   * @returns {Promise<import("../types/index.js").FactionsTop>}
   */
  async getFactionsTop() {
    return queue(`${this.BASE_URL}/factionstop?type=opfactions`);
  }

  /**
   * Gets the basic information about pika network, including IP, player count, discord online count, etc.
   * @returns {Promise<import("../types/index.js").Count>}
   */
  async getCount() {
    const res = await queue(
      "https://api.craftigames.net/count/play.pika-network.net"
    );
    return {
      ...res,
      updatedAtDate: new Date(res.updated_at),
    };
  }
};
async function queue(url) {
  let res = await request(url);
  let body = await res.body.text();
  let time = 700;
  while (body === "Too many requests") {
    await sleep(time);
    time += 100;
    res = await request(url);
    body = await res.body.text();
  }
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new PikaNetworkError(body);
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

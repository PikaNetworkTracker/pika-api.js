const assert = require("node:assert");
const lib = require("../lib");
describe("PikaNetwork", () => {
  const pika = new lib.PikaNetwork();
  describe("#getCount", () => {
    it("ip must return play.pika-network.net", async () => {
      const count = await pika.getCount();
      assert.equal(count?.ip, "play.pika-network.net");
    });
  });
  describe("#getProfileLeaderboard", () => {
    it("metadata total must be a number", async () => {
      const obj = await pika.getProfileLeaderboard({
        gamemode: lib.Gamemode.BedWars,
        username: "mallusrgreat",
      });
      assert.strictEqual(typeof obj?.Kills.metadata.total, "number");
    });
  });
  describe("#getProfile", () => {
    it("username should be mallusrgreat", async () => {
      const obj = await pika.getProfile("mallusrgreat");
      assert.strictEqual(obj?.username, "mallusrgreat");
    });
  });
  describe("#getLeaderboard", () => {
    it("bedwars lb total kills must be a number", async () => {
      const obj = await pika.getLeaderboard({
        gamemode: lib.Gamemode.BedWars,
        leaderboardType: lib.LeaderboardType.Kills,
      });
      assert.strictEqual(typeof obj?.metadata.total, "number");
    });
  });
  describe("#getTotalLeaderboard", () => {
    it("bedwars total lb total must be a number", async () => {
      const obj = await pika.getTotalLeaderboard(lib.Gamemode.BedWars);
      assert.strictEqual(typeof obj?.[0]?.total, "number");
    });
  });
});

export enum Gamemode {
  OPFactions = "opfactions",
  OPPrison = "opprison",
  OPSkyblock = "opskyblock",
  ClassicSkyblock = "classicskyblock",
  Survival = "survival",
  KitPvP = "kitpvp",
  UnrankedPractice = "unrankedpractice",
  RankedPractice = "rankedpractice",
  BedWars = "bedwars",
  SkyWars = "skywars",
  LifeSteal = "lifesteal",
  OPLifesteal = "oplifesteal",
  SkyPvP = "skypvp",
}
export enum Interval {
  Weekly = "weekly",
  Monthly = "monthly",
  AllTime = "total",
}
export enum LeaderboardType {
  Kills = "kills",
  Balance = "balance",
  PlayerLevel = "PLAYER_LEVEL",
  HighestKillstreak = "HIGHEST_KILLSTREAK",
  MobsKilled = "MOBS_KILLED",
  PrisonTokens = "TOKENS_BALANCE",
  Prestige = "prison_prestige",
  BlocksBroken = "BLOCKS_BROKEN",
  Souls = "Souls",
  KitpvpLevel = "KITPVP_LEVEL",
  KitpvpPrestige = "KITPVP_PRESTIGE",
  KitpvpWins = "WINS",
  KitpvpLosses = "LOSSES",
  KitpvpMatchesPlayed = "PLAYED",
  PracticeKills = "KILLS",
  HighestWinstreak = "HIGHEST_WIN_STREAK",
  HitsDealt = "MELEE_DEALT",
  HitsTaken = "MELEE_TAKEN",
  BowKills = "PROJECTILE_KILLS",
  VoidKills = "VOID_KILLS",
  Elo = "ELO",
  Wins = "wins",
  GamesPlayed = "played",
  BedsDestroyed = "BED_DESTROYED",
  FinalKills = "FINAL_KILLS",
  CustomCropsFarmed = "CUSTOM_CROPS_FARMED",
  RankRating = "RANK_RATING",
  LuckyCratesOpened = "LUCKYCRATES_OPENED",
  CurrentKillstreak = "CURRENT_KILLSTREAK",
  Deaths = "DEATHS",
}
export enum Mode {
  AllModes = "ALL_MODES",
  Solo = "SOLO",
  Doubles = "DOUBLES",
  Triples = "TRIPLES",
  Quadruples = "QUAD",
}
export interface TotalLeaderboardEntry {
  name: string;
  total: number;
  average: number;
  sum: number;
}
export interface Leaderboard {
  metadata: Metadata;
  entries: Entry[] | null;
}

export interface Entry {
  place: number;
  value: string;
  id: string;
  clan?: string;
}

export interface Metadata {
  total: number;
}
export interface GetLeaderboardOptions {
  gamemode: (typeof Gamemode)[keyof typeof Gamemode];
  leaderboardType: (typeof LeaderboardType)[keyof typeof LeaderboardType];
  interval?: (typeof Interval)[keyof typeof Interval] | null;
  mode?: (typeof Mode)[keyof typeof Mode] | null;
  limit?: number | null;
  offset?: number | null;
}
export interface GetProfileLeaderboardOptions {
  username: string;
  gamemode: (typeof Gamemode)[keyof typeof Gamemode];
  interval?: (typeof Interval)[keyof typeof Interval] | null;
  mode?: (typeof Mode)[keyof typeof Mode] | null;
  limit?: number | null;
}
export interface Profile {
  discord_verified: boolean;
  lastSeen: number;
  ranks: GamemodeRank[];
  email_verified: boolean;
  discord_boosting: boolean;
  clan: Clan;
  rank: PlayerLevel;
  friends: User[];
  username: string;
}

export interface PlayerLevel {
  level: number;
  experience: number;
  percentage: number;
  rankDisplay: string;
}

export interface Clan {
  name: string;
  tag: string;
  currentTrophies: number;
  creationTime: string;
  members: Member[];
  owner: User;
  leveling: Leveling;
}

export interface Leveling {
  level: number;
  exp: number;
  totalExp: number;
}

export interface Member {
  user: User;
  joinDate: string;
}

export interface User {
  username: string;
}

export interface GamemodeRank {
  name: string;
  displayName: string;
  server: string;
  season?: boolean | null;
  expiry: number;
}
export interface Recap {
  id: string;
  mapName: string;
  gameType: string;
  gameServerName: string;
  gameStart: string;
  gameDuration: string;
  users: RecapUser[];
  winners: string[];
  stats: string[];
}

export interface RecapUser {
  username: string;
  stats: Stats;
}

export interface Stats {
  Kills: number | string;
  Deaths: string;
  "Blocks moved": string;
  "Time of death": string;
  "Time of death (ms)": number;
  "Blocks placed": number | string;
  "Blocks mined": number | string;
  "Resources collected": string;
  "Items bought": number | string;
  "Beds destroyed": number | string;
  Assists: number | string;
  "Final kills": number | string;
}
export interface ProfileLeaderboard {
  "Bow kills": Leaderboard;
  Kills: Leaderboard;
  "Games played": Leaderboard;
  "Final deaths": Leaderboard;
  "Arrows shot": Leaderboard;
  "Highest winstreak reached": Leaderboard;
  "Beds destroyed": Leaderboard;
  Losses: Leaderboard;
  "Arrows hit": Leaderboard;
  "Melee kills": Leaderboard;
  "Final kills": Leaderboard;
  Deaths: Leaderboard;
  "Void kills": Leaderboard;
  Wins: Leaderboard;
}
export interface FactionsTop {
  factionTag: string;
  place: number;
  worth: number;
  factionData: FactionData;
  creationTime: string;
}

export interface FactionData {
  faction: string;
  worth: string;
  place: number;
  active_strikes: number;
  total_strikes: number;
  owner?: string;
  founded_date: number;
  members: string[];
  blocks: FactionBlocks;
  spawners: FactionBlocks;
}

export interface FactionBlocks {
  SILVERFISH?: number;
  VILLAGER?: number;
  BLAZE?: number;
  CREEPER?: number;
  ZOMBIE?: number;
  WITCH?: number;
  PIGZOMBIE?: number;
  SHEEP?: number;
  CHICKEN?: number;
  SPIDER?: number;
  PIG?: number;
  COW?: number;
  SKELETON?: number;
  IRONGOLEM?: number;
}
export interface Count {
  ip: string;
  count: number;
  discordCount: number;
  updated_at: string;
  updatedAtDate: Date;
}

export class PikaNetwork {
  /**
   * @private
   */
  BASE_URL: string;
  /**
   * The total data about all leaderboards.
   * @param gamemode The gamemode to check the total data of
   */
  getTotalLeaderboard(gamemode: Gamemode): Promise<TotalLeaderboardEntry[]>;
  /**
   * Get the leaderboard of a gamemode with specific stats
   */
  getLeaderboard(options: GetLeaderboardOptions): Promise<Leaderboard>;
  /**
   * Get the profile of a player.
   */
  getProfile(username: string): Promise<Profile>;
  /**
   * Get the leaderboard of a gamemode with specific stats
   */
  getProfileLeaderboard(
    options: GetProfileLeaderboardOptions
  ): Promise<ProfileLeaderboard>;
  /**
   * Gets information about a recap
   * @param id The recap ID.
   */
  getRecap(id: string): Promise<Recap>;
  /**
   * Gets the top factions from OPFactions
   */
  getFactionsTop(): Promise<FactionsTop>;
  /**
   * Gets the basic information about pika network, including IP, player count, discord online count, etc.
   */
  getCount(): Promise<Count>;
  /**
   * Gets information about a guild.
   */
  getGuild(name: string): Promise<Clan>;
}

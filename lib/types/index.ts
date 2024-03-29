import type { Gamemode, Interval, LeaderboardType, Mode } from "..";

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

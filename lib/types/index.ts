import type { Gamemode, Interval, LeaderboardType, Mode } from "..";

export interface TotalLeaderboardEntry {
	name: string;
	total: number;
	average: number;
	sum: number;
}
export interface Leaderboard {
	metadata: Metadata;
	entries: Entry[];
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
	season?: unknown; // TODO: set real type, dk anyone with ssnl rank rn
	expiry: number;
}

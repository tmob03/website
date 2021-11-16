import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

const rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const configs: IAllConfigs = {
	test: {
		root: rootPath,
		baseURL: 'http://localhost:3002',
		baseURL_API: 'http://localhost:3002',
		baseURL_Auth: 'http://localhost:3002',
		baseURL_CDN: 'http://localhost:3002',
		domain: 'localhost',
		port: 3002,
		accessToken: {
			secret: 'G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A',
			expTime: '15m',
			gameExpTime: '24h'
		},
		discord: {
			clientID: 'discord1234',
			clientSecret: 'shhhhh!',
		},
		twitch: {
			clientID: 'twitch1234',
			clientSecret: '*hey lil mama lemme whisper in your ear*',
		},
		twitter: {
			consumerKey: 'twitter12354',
			consumerSecret: '*lemme tell ya somethin youd like to hear*',
		},
		steam: {
			webAPIKey: process.env.STEAM_WEB_API_KEY,
			preventLimited: true,
		},
		db: {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "mom_test",
			password: "",
			database: "momentum_test",
			synchronize: true,
			logging: false,
			entities: [
				"src/entity/**/*.ts"
			]			 
		},
		session: {
			secret: 'keyboard cat',
		},
	},
	development: {
		root: rootPath,
		baseURL: 'http://localhost:3002',
		baseURL_API: 'http://localhost:3002',
		baseURL_Auth: 'http://localhost:3002',
		baseURL_CDN: 'http://localhost:3002',
		domain: 'localhost',
		port: 3002,
		accessToken: {
			secret: 'G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A',
			expTime: '15m',
			gameExpTime: '24h'
		},
		discord: {
			clientID: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		},
		twitch: {
			clientID: process.env.TWITCH_CLIENT_ID,
			clientSecret: process.env.TWITCH_CLIENT_SECRET,
		},
		twitter: {
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		},
		steam: {
			webAPIKey: process.env.STEAM_WEB_API_KEY,
			preventLimited: true,
		},
		db: {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "mom",
			password: "",
			database: "momentum",
			synchronize: true,
			logging: true,
			entities: [
				"src/entity/**/*.ts"
			]
		},
		session: {
			secret: 'keyboard cat',
		},
	},
	production: {
		root: rootPath,
		baseURL: process.env.BASE_URL,
		baseURL_API: process.env.API_URL,
		baseURL_Auth: process.env.AUTH_URL,
		baseURL_CDN: process.env.CDN_URL,
		domain: 'momentum-mod.org',
		port: +process.env.NODE_PORT,
		accessToken: {
			secret: process.env.JWT_SECRET,
			expTime: '15m',
			gameExpTime: '24h'
		},
		discord: {
			clientID: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		},
		twitch: {
			clientID: process.env.TWITCH_CLIENT_ID,
			clientSecret: process.env.TWITCH_CLIENT_SECRET,
		},
		twitter: {
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		},
		steam: {
			webAPIKey: process.env.STEAM_WEB_API_KEY,
			preventLimited: true,
		},
		db: 
		{
			type: "mysql",
			host: process.env.MOM_DATABASE_HOST,
			port: 3306,
			username: process.env.MOM_DATABASE_USER,
			password: process.env.MOM_DATABASE_PW,
			database: "momentum",
			synchronize: true,
			logging: false,
			entities: [
				"src/entity/**/*.ts"
			]			 
		},
		session: {
			secret: process.env.EXPRESS_SESSION_SECRET,
		},
	}
};

export interface IAllConfigs {
	test: IConfig;
	development: IConfig;
	production: IConfig;
}

export interface IConfig {
	root: string;
		baseURL: string;
		baseURL_API: string;
		baseURL_Auth: string;

		baseURL_CDN: string;
		domain: string;
		port: number
		accessToken: {
			secret: string;
			expTime: string;
			gameExpTime: string;
		},
		discord: {
			clientID: string;
			clientSecret: string;
		};
		twitch: {
			clientID: string;
			clientSecret: string;
		};
		twitter: {
			consumerKey: string;
			consumerSecret: string;
		};
		steam: {
			webAPIKey: string;
			preventLimited: boolean;
		};
		db: ConnectionOptions;
		session: {
			secret: string;
		};
}

export const config: IConfig = configs[env];

/*
import { Entity, Column } from "typeorm";

@Entity()
export class AuthDiscordModel {		
    @Column()
	discordID: string;

	@Column()
	displayName: string;

	@Column()
	accessToken: string;

	@Column()
	refreshToken: string;
}
*/

export class AuthDiscordModel {
	discordID: string;
	displayName: string;
	accessToken: string;
	refreshToken: string;
}

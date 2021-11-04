/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthDiscordModel {		
    @PrimaryGeneratedColumn()
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

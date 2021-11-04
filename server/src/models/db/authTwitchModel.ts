/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthTwitchModel {		
    @PrimaryGeneratedColumn()
	twitchID: string;

	@Column()
	displayName: string;

	@Column()
	token: string;
}
*/

export class AuthTwitchModel {		
	twitchID: string;
	displayName: string;
	token: string;
}

/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BadgeModel {		
    @PrimaryGeneratedColumn()
	twitchID: string;

	@Column()
	description: string;

	@Column()
	image: string;
}
*/

export class BadgeModel {		
	name: string;
	description: string;
	image: string;
}

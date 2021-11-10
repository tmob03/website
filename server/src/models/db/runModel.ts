/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RunModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	track: number;

	@Column()
	zoneNum: number;

	@Column()
	tick: number;

	@Column()
	tickRate: number;

	@Column()
	time: number; // ViewModel?

	@Column()
	flags: number;

	@Column()
	file: string;

	@Column()
	hash: string;	
}
*/

export class RunModel {		
	id: number;
	track: number;
	zoneNum: number;
	tick: number;
	tickRate: number;
	time: number; // ViewModel?
	flags: number;
	file: string;
	hash: string;	
}

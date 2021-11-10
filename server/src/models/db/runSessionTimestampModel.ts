/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RunSessionTimestampModel {		
	@PrimaryGeneratedColumn()		
	id: number;	

	@Column()
	zone: number;

	@Column()
	tick: number;
}
*/

export class RunSessionTimestampModel {		
	id: number;
	zone: number;
	tick: number;
}

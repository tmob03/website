/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RunSessionModel {		
	@PrimaryGeneratedColumn()		
	id: number;	

	@Column()
	trackNum: number;

	@Column()
	zoneNum: number;
}
*/

export class RunSessionModel {		
	id: number;
	trackNum: number;
	zoneNum: number;
}

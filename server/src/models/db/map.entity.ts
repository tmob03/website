/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MapZoneModel {		
	@PrimaryGeneratedColumn()		
	id: number;		

	@Column()		
	name: string;
	
	@Column()		
	type: number;
	
	@Column()		
	statusFlag: number;
	
	@Column()		
	downloadURL: string;
	
	@Column()		
	hash: string;
}
*/

export class MapZoneModel {		
	id: number;
	name: string;
	type: number;
	statusFlag: number;
	downloadURL: string;
	hash: string;
}

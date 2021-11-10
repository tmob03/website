/*
import { Entity, Column } from "typeorm";

@Entity()
export class MapZoneTriggerModel {		
	@Column()
	properties: string;		

	@Column()
	pointsHeight: number;		

	@Column()
	pointsZPos: number;		

	@Column()
	points: number;
}
*/

export class MapZoneTriggerModel {		
	type: number;
	pointsHeight: number;
	pointsZPos: number;
	points: number;
}

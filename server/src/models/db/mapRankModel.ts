/*
import { Entity, Column } from "typeorm";

@Entity()
export class MapRankModel {		
	@Column()
	mapID: number;
		
	@Column()
	userID: number;	

	@Column()
	gameType: number;
	
	@Column()
	flags: number;
	
	@Column()
	trackNum: number;
	
	@Column()
	zoneNum: number;
	
	@Column()
	runID: number;	
	
	@Column()
	rank: number;
	
	@Column()
	rankXP: number;
}
*/

export class MapRankModel {		
	mapID: number;	//maps to mapModel.ts
	userID: number;	//maps to userModel.ts
	gameType: number;
	flags: number;
	trackNum: number;
	zoneNum: number;
	runID: number;	//maps to runModel.ts
	rank: number;
	rankXP: number;
}

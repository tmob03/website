/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BaseStatsModel {		
    @PrimaryGeneratedColumn()
	id: number;

	@Column()
	jumps: number;

	@Column()
	strafes: number;

	@Column()
	avgStrafeSync: number;

	@Column()
	avgStrafeSync2: number;

	@Column()
	enterTime: number;

	@Column()
	totalTime: number;

	@Column()
	velAvg3D: number;

	@Column()
	velAvg2D: number;

	@Column()
	velMax3D: number;

	@Column()
	velMax2D: number;

	@Column()
	velEnter3D: number;

	@Column()
	velEnter2D: number;

	@Column()
	velExit3D: number;

	@Column()
	velExit2D: number;
}
*/

export class BaseStatsModel {		
	id: number;
	jumps: number;
	strafes: number;
	avgStrafeSync: number;
	avgStrafeSync2: number;
	enterTime: number;
	totalTime: number;
	velAvg3D: number;
	velAvg2D: number;
	velMax3D: number;
	velMax2D: number;
	velEnter3D: number;
	velEnter2D: number;
	velExit3D: number;
	velExit2D: number;
}

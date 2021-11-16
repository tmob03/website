/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ActivityModel {		
    @PrimaryGeneratedColumn()
	id: number;
	
    @Column()
	type: Activity_Type;
	
    @Column()
	data: number;
}
*/

export class ActivityModel {
	id: number;
	type: Activity_Type;
	data: number;
}

export enum Activity_Type {
	ALL = 0,
	TIME_SUBMITTED = 1,
	MAP_UPLOADED = 2,
}

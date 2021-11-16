/*
import { Entity, Column } from "typeorm";

@Entity()
export class ReportModel {		
	@Column()		
	data: string;		

	@Column()		
	type: number;
	
	@Column()		
	category: string;
	
	@Column()		
	message: string;
	
	@Column()		
	resolved: boolean;
	
	@Column()		
	resolutionMessage: string;
}
*/

export class ReportModel {		
	data: string;
	type: number;
	category: string;
	message: string;
	resolved: boolean;
	resolutionMessage: string;
}

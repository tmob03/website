/*
import { Entity, Column } from "typeorm";

@Entity()
export class XpSystemModel {
	@Column()
	rankXP: string;
	@Column()
	cosXP: string;
}
*/

// TODO: FINISH

export class XpSystemModel {		
	rankXP: string; // JSON
	cosXP: string; // JSON
}

export class RankXPModel {
	top10: {
		WRPoints: 3000,
		rankPercentages: [
			1,
			.75,
			.68,
			.61,
			.57,
			.53,
			.505,
			.48,
			.455,
			.43,
		],
	};
	formula: {
		A: 50000,
		B: 49,
	};
	groups: {
		maxGroups: 4,
		groupScaleFactors: [
			1,
			1.5,
			2,
			2.5
		],
		groupExponents: [
			0.5,
			0.56,
			0.62,
			0.68
		],
		groupMinSizes: [
			10,
			45,
			125,
			250
		],
		groupPointPcts: [ // How much, of a % of WRPoints, does each group get
			0.2,
			0.13,
			0.07,
			0.03,
		],
	};
}

export class CosXPModel {
	levels: {
		maxLevels: 500,
		startingValue: 20000,
		linearScaleBaseIncrease: 1000,
		linearScaleInterval: 10,
		linearScaleIntervalMultiplier: 1.0,
		staticScaleStart: 101,
		staticScaleBaseMultiplier: 1.5,
		staticScaleInterval: 25,
		staticScaleIntervalMultiplier: 0.5,
	};
	completions: {
		unique: {
			tierScale: {
				linear: 2500,
				staged: 2500,
				// bonus is static, as (tierScale.linear * (initialScale(tier3)) + tierScale.linear * (initialScale(tier4))) / 2
			};
		};
		repeat: {
			tierScale: {
				linear: 20,
				staged: 40,
				stages: 5,
				bonus: 40, // = staged
			}
		};
	};
}

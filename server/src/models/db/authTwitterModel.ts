/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthTwitterModel {		
    @PrimaryGeneratedColumn()
	twitchID: string;

	@Column()
	displayName: string;

	@Column()
	oauthKey: string;
	
	@Column()
	oauthSecret: string;
}
*/

export class AuthTwitterModel {		
	twitterID: string;
	displayName: string;
	oauthKey: string;
	oauthSecret: string;
}


module.exports = (sequelize, type) => {
	return sequelize.define('twitterAuth', {
		twitterID: type.STRING,
		displayName: type.STRING,
		oauthKey: type.STRING,
		oauthSecret: type.STRING,
	});
};

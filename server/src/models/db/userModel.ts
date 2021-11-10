/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	steamID: string;

	@Column()
	alias: string;

	@Column()
	aliasLocked: boolean;

	@Column()
	avatar: string;

	@Column()
	roles: number;

	@Column()
	bans: number;

	@Column()
	country: string;
}
*/

export class UserModel {		
	id: number;
	steamID: string;
	alias: string;
	aliasLocked: boolean;
	avatar: string;
	avatarURL: string; //ViewModel
	/*
	get() {
		const bans = this.getDataValue('bans');
		const isAvatarBanned = bans & 1 << 2; // TODO: Refactor however needed to use Ban 'enum' (cyclic dep issue occurs when requiring user model in this file)
		if (isAvatarBanned) {
			return config.baseURL + '/assets/images/blank_avatar.jpg';
		} else {
			const avatar = this.getDataValue('avatar');
			return avatar ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/${avatar}` : null;
		}
	},
	set(val) {
		let newVal = val.replace('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/', '');
		this.setDataValue('avatar', newVal);
	},
	*/
	roles: number;
	bans: number;
	country: string;
}

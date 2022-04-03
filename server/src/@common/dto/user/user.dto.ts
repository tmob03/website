import { Profile, User } from '@prisma/client';
import { appConfig } from '../../../../config/config';
import { ERole, EBan } from '../../enums/user.enum';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsInt, IsISO31661Alpha2, IsString } from 'class-validator';
import { IsSteamCommunityID } from '../../validators/is-steam-id.validator';
import { ProfileDto } from './profile.dto';

export class UserDto implements User {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsSteamCommunityID()
    steamID: string;

    @ApiProperty()
    @IsString()
    alias: string;

    @ApiProperty()
    @IsBoolean()
    aliasLocked: boolean;

    @ApiProperty()
    @IsEnum(ERole)
    roles: ERole;

    @ApiProperty()
    @IsEnum(EBan)
    bans: EBan;

    @ApiProperty()
    @IsISO31661Alpha2()
    country: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;

    private _avatar: string;

    @ApiProperty()
    get avatarURL(): string {
        const bans = this.bans;
        const isAvatarBanned = bans & EBan.BANNED_AVATAR;
        if (isAvatarBanned) {
            return appConfig.baseURL + '/assets/images/blank_avatar.jpg';
        } else {
            const avatar = this._avatar;
            // TODO: apparently steam's hosting has changed and this stuff is on cloudfare now, ask goc
            return avatar ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/${avatar}` : null;
        }
    }
    set avatarURL(val: string) {
        this._avatar = val?.replace('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/', '');
    }

    @ApiProperty()
    get avatar(): string {
        return this._avatar;
    }

    constructor(_user: User) {
        if (_user == null) return;

        this.id = _user.id;
        this.steamID = _user.steamID;
        this.alias = _user.alias;
        this.aliasLocked = _user.aliasLocked;
        this.avatarURL = _user.avatar;
        this.roles = _user.roles;
        this.bans = _user.bans;
        this.country = _user.country;
        this.createdAt = _user.createdAt;
        this.updatedAt = _user.updatedAt;
    }
}

export class UserProfileDto extends UserDto {
    @ApiProperty({ type: ProfileDto })
    profile: ProfileDto;

    constructor(_user: User, _profile: Profile) {
        super(_user);
        this.profile = new ProfileDto(_profile);
    }
}

// export class CreateUserDto extends OmitType(UserDto, ['id', 'createdAt', 'updatedAt'] as const) {}
//
// export class UpdateUserAdminDto extends PartialType(UserProfileDto) {}

export class UserUpdateDto extends PartialType(UserProfileDto) {}

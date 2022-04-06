import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Map as MapDB, MapRank, Prisma, Profile, User, UserAuth } from '@prisma/client';
import { UserUpdateDto, UserDto, UserProfileDto, UsersDto } from '../../@common/dto/user/user.dto';
import { ProfileDto, ProfileUpdateDto } from '../../@common/dto/user/profile.dto';
import { PagedResponseDto } from '../../@common/dto/common/api-response.dto';
import { UsersRepo } from './users.repo';
import { appConfig } from '../../../config/config';
import { lastValueFrom, map } from 'rxjs';
import * as xml2js from 'xml2js';
import { HttpService } from '@nestjs/axios';
import { ActivityDto } from '../../@common/dto/user/activity.dto';
import { FollowerDto } from '../../@common/dto/user/followers.dto';
import { MapRankDto } from '../../@common/dto/map/mapRank.dto';
import { UserRunDto } from '../../@common/dto/run/runs.dto';
import { UserMapCreditDto } from '../../@common/dto/map/mapCredit.dto';
import { EBan } from '../../@common/enums/user.enum';
import { GetAllUsersQuery } from '../../@common/dto/user/get-all-query.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UsersRepo, private readonly http: HttpService) {}

    //#region GETs
    public async GetAll(query: GetAllUsersQuery): Promise<UsersDto> {
        const where: Prisma.UserWhereInput = {};

        // Default to 20
        let limit = query.limit ?? 20;

        if (query.playerID) {
            limit = 1;
            where.steamID = query.playerID;
        } else if (query.playerIDs) {
            where.steamID = { in: query.playerIDs.split(',') };
        }

        if (query.search) {
            where.alias = { startsWith: query.search };
        }

        // if how to do this, aren't we returning a whole different thing (a userprofiledto)
        // could maybe reroute in controller to getuserprofile (bad)
        // idk

        // TODO first thing: less stupid way of doing this
        let include: Prisma.UserInclude = {};
        if (query.expand) {
            const expansions = query.expand.split(',');
            include.profiles = expansions.includes('profile');
            include.userstats = expansions.includes('userStats');
        } else include = undefined;

        const dbResponse = await this.userRepo.GetAll(where, include, query.offset, limit);

        const totalCount = dbResponse[1];
        const users = dbResponse[0];

        const userDtos = users.map((user: User) => new UserDto(user));

        console.log(userDtos);

        return {
            // totalCount: totalCount,
            // returnCount: userDtos.length,
            // response: userDtos
            count: totalCount,
            users: userDtos
        };
    }

    public async Get(id: number): Promise<UserDto> {
        const response = await this.userRepo.Get(id);

        // TODO: letting this return null for now as JWT strategy uses it and it breaks tests.
        // if (!response) throw new NotFoundException();

        return new UserDto(response);
    }

    public async GetBySteamID(id: string): Promise<UserDto> {
        const response = await this.userRepo.GetBySteamID(id);

        // if (!response) throw new NotFoundException();

        return new UserDto(response);
    }

    public async GetProfile(id: number): Promise<ProfileDto> {
        return await this.userRepo.GetProfile(id);
    }

    public async GetActivities(id: number, skip?: number, take?: number): Promise<PagedResponseDto<ActivityDto[]>> {
        const activitesAndCount = await this.userRepo.GetActivities(id, skip, take);

        const activitesDto = [];

        activitesAndCount[0].forEach((c) => {
            const user: User = (c as any).users;
            const profile: Profile = (c as any).users.profiles;

            // Create DTO from db objects
            const userProfileDto = new UserProfileDto(user, new ProfileDto(profile));

            activitesDto.push(new ActivityDto(c, userProfileDto));
        });

        return {
            response: activitesDto,
            returnCount: activitesDto.length,
            totalCount: activitesAndCount[1]
        };
    }

    public async GetFollowers(id: number, skip?: number, take?: number): Promise<PagedResponseDto<FollowerDto[]>> {
        const followersAndCount = await this.userRepo.GetFollowers(id, skip, take);

        const followersDto = [];

        followersAndCount[0].forEach((c) => {
            const followeeUser: User = (c as any).users_follows_followeeIDTousers;
            const followeeProfile: Profile = (c as any).users_follows_followeeIDTousers.profiles;

            // Create DTO from db objects
            const followee = new UserProfileDto(followeeUser, new ProfileDto(followeeProfile));

            const followedUser: User = (c as any).users_follows_followedIDTousers;
            const followedProfile: Profile = (c as any).users_follows_followedIDTousers.profiles;

            // Create DTO from db objects
            const followed = new UserProfileDto(followedUser, new ProfileDto(followedProfile));

            followersDto.push(new FollowerDto(c, followed, followee));
        });

        return {
            response: followersDto,
            returnCount: followersDto.length,
            totalCount: followersAndCount[1]
        };
    }

    public async GetFollowing(id: number, skip?: number, take?: number): Promise<PagedResponseDto<FollowerDto[]>> {
        const followersAndCount = await this.userRepo.GetFollowing(id, skip, take);

        const followersDto = [];

        followersAndCount[0].forEach((c) => {
            const followeeUser: User = (c as any).users_follows_followeeIDTousers;
            const followeeProfile: Profile = (c as any).users_follows_followeeIDTousers.profiles;

            // Create DTO from db objects
            const followee = new UserProfileDto(followeeUser, new ProfileDto(followeeProfile));

            const followedUser: User = (c as any).users_follows_followedIDTousers;
            const followedProfile: Profile = (c as any).users_follows_followedIDTousers.profiles;

            // Create DTO from db objects
            const followed = new UserProfileDto(followedUser, new ProfileDto(followedProfile));

            followersDto.push(new FollowerDto(c, followed, followee));
        });

        return {
            response: followersDto,
            returnCount: followersDto.length,
            totalCount: followersAndCount[1]
        };
    }

    public async GetMapCredits(
        id: number,
        skip?: number,
        take?: number
    ): Promise<PagedResponseDto<UserMapCreditDto[]>> {
        const mapCreditsAndCount = await this.userRepo.GetMapCredits(id, skip, take);
        const mapCreditsDto: UserMapCreditDto[] = [];

        mapCreditsAndCount[0].forEach((c) => {
            const user: User = (c as any).users;
            const map: MapDB = (c as any).maps;

            const mapCreditDto = new UserMapCreditDto(c, user, map);

            mapCreditsDto.push(mapCreditDto);
        });

        return {
            response: mapCreditsDto,
            returnCount: mapCreditsDto.length,
            totalCount: mapCreditsAndCount[1]
        };
    }

    public async GetRuns(id: number, skip?: number, take?: number): Promise<PagedResponseDto<UserRunDto[]>> {
        const runsAndCount = await this.userRepo.GetRuns(id, skip, take);
        const runsDto: UserRunDto[] = [];

        runsAndCount[0].forEach((c) => {
            const runUser: User = (c as any).users;
            const runMapRank: MapRank = (c as any).mapRank;

            // Create DTO from db objects
            const runUserDto = new UserDto(runUser);
            const runMapRankDto = new MapRankDto(runMapRank);

            const runDto = new UserRunDto(c, runUserDto, runMapRankDto);

            runsDto.push(runDto);
        });

        return {
            response: runsDto,
            returnCount: runsDto.length,
            totalCount: runsAndCount[1]
        };
    }

    async GetAuth(userID: number): Promise<UserAuth> {
        const whereInput: Prisma.UserAuthWhereUniqueInput = {};
        whereInput.id = userID;
        return await this.userRepo.GetAuth(whereInput);
    }

    //#endregion

    //#region Find or create

    async FindOrCreateFromGame(steamID: string): Promise<User> {
        const profile = await this.ExtractUserProfileFromSteamID(steamID);
        return this.FindOrCreateUserFromProfile(profile);
    }

    // TODO: openIDProfile Type
    async FindOrCreateFromWeb(openID: any): Promise<User> {
        // Grab Steam ID from community url
        const identifierRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;
        const steamID = identifierRegex.exec(openID)[1];

        const profile = await this.ExtractPartialUserProfileFromSteamID(steamID);

        return this.FindOrCreateUserFromProfile(profile);
    }

    public async FindOrCreateUserFromProfile(profile: UserDto): Promise<User> {
        const user = await this.userRepo.GetBySteamID(profile.steamID);

        if (user) {
            const updateInput: Prisma.UserUpdateInput = {};
            updateInput.alias = profile.alias;
            updateInput.avatar = profile.avatar;
            updateInput.country = profile.country;

            return this.userRepo.Update(user.id, updateInput);
        } else {
            const createInput: Prisma.UserCreateInput = {
                createdAt: new Date(),
                updatedAt: new Date()
            };
            createInput.steamID = profile.steamID;
            createInput.alias = profile.alias;
            createInput.avatar = profile.avatarURL;
            createInput.country = profile.country;

            return this.userRepo.Insert(createInput);
        }
    }

    //#endregion

    //#region Update
    async Update(userID: number, userUpdate: UserUpdateDto) {
        const userProfile = await this.userRepo.GetUserProfile(userID);

        // Strict check - we want to handle if alias is empty string
        if (typeof userUpdate.alias !== 'undefined') {
            await this.UpdateUserAlias(new UserDto(userProfile), userUpdate.alias);
        }

        if (userUpdate.profile) {
            await this.UpdateProfile(userProfile, userUpdate.profile);
        }
    }

    async UpdateUserAlias(user: User, alias: string): Promise<User> {
        const updateInput: UserUpdateDto = {};

        if (user.bans & EBan.BANNED_ALIAS) {
            const steamUserData = await this.GetSteamUserSummaryData(user.steamID);

            if (steamUserData) {
                updateInput.alias = steamUserData.personaname;
            }
        } else {
            updateInput.alias = alias;
        }

        return await this.userRepo.Update(user.id, updateInput);
    }

    async UpdateProfile(userProfile: UserProfileDto, profileUpdate: ProfileUpdateDto): Promise<ProfileDto> {
        if (!profileUpdate.bio || userProfile.bans & EBan.BANNED_BIO) return;

        const updateInput = new ProfileUpdateDto({ bio: profileUpdate.bio });

        return await this.userRepo.UpdateProfile(userProfile.profile.id, updateInput);
    }

    async UpdateRefreshToken(userID: number, refreshToken: string): Promise<UserAuth> {
        const updateInput: Prisma.UserAuthUpdateInput = {};
        updateInput.refreshToken = refreshToken;
        const whereInput: Prisma.UserAuthWhereUniqueInput = {};
        whereInput.id = userID;
        return await this.userRepo.UpdateAuth(whereInput, updateInput);
    }

    //#endregion

    //#region Delete
    async Delete(userID: number) {
        await this.userRepo.Delete(userID);
        return;
        // TODO: Logout. best to do without including auth service, so we need a logout POST I guess?
    }
    //#endregion

    //#region Private
    private async ExtractUserProfileFromSteamID(steamID: string): Promise<UserDto> {
        const summaryData = await this.GetSteamUserSummaryData(steamID);

        if (steamID !== summaryData.steamid)
            return Promise.reject(new HttpException('User fetched is not the authenticated user!', 400));

        const profileData = await this.GetSteamUserProfileData(steamID);

        if (appConfig.steam.preventLimited && profileData.profile.isLimitedAccount[0] === '1') {
            return Promise.reject(
                new HttpException('We do not authenticate limited Steam accounts. Buy something on Steam first!', 403)
            );
        }
        const profile = new UserDto(null);

        console.log('creating new user', summaryData);

        profile.id = 0;
        profile.steamID = steamID;
        profile.alias = summaryData.personaname;
        profile.aliasLocked = false;
        profile.avatarURL = summaryData.avatarfull;
        profile.roles = 0;
        profile.bans = 0;
        profile.country = summaryData.locccountrycode;
        profile.createdAt = null;
        profile.updatedAt = null;
        console.log('wowee!!');
        console.log(profile);

        return profile;
    }

    private async ExtractPartialUserProfileFromSteamID(steamID: string): Promise<UserDto> {
        // TODO: ?????? what is this. why
        // await this.GetSteamProfileFromSteamID(steamID);

        const profile = new UserDto(null);
        profile.steamID = steamID;

        return profile;
    }

    private async GetSteamUserSummaryData(steamID: string): Promise<SteamUserSummaryData> {
        const getPlayerResponse = await lastValueFrom(
            this.http
                .get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`, {
                    params: {
                        key: appConfig.steam.webAPIKey,
                        steamids: steamID
                    }
                })
                .pipe(
                    map((res) => {
                        return res.data;
                    })
                )
        );

        if (getPlayerResponse.response.error) {
            return Promise.reject(new HttpException('Failed to get any player summaries.', 500));
        }

        if (!getPlayerResponse.response.players[0]) {
            return Promise.reject(new HttpException('Failed to get player summary.', 500));
        }

        return getPlayerResponse.response.players[0];
    }

    private async GetSteamUserProfileData(steamID: string): Promise<SteamUserProfileData> {
        return await lastValueFrom(
            this.http.get(`https://steamcommunity.com/profiles/${steamID}?xml=1`).pipe(
                map(async (res) => {
                    return await xml2js.parseStringPromise(res.data);
                })
            )
        );
    }

    //#endregion
}

// Private Classes
class SteamUserSummaryData {
    profilestate: any;
    steamid: string;
    personaname: string;
    avatarfull: string;
    locccountrycode: string;
}

class SteamUserProfileData {
    profile: {
        isLimitedAccount: string[];
    };
}

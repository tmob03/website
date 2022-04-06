import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsSteamCommunityID } from '../../validators/is-steam-id.validator';

export class GetAllUsersQuery {
    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    offset: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    limit: number;

    // TODO: make a transform for this. old api works with profile,userStats
    // as a value of expand, do a transform that does a split(','), rather than in service logic
    @ApiProperty()
    @IsOptional()
    expand: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    search: string;

    @ApiProperty()
    @IsSteamCommunityID()
    @IsOptional()
    playerID: string;

    @ApiProperty()
    @IsSteamCommunityID()
    @IsOptional()
    playerIDs: string;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    mapRank: number;
}

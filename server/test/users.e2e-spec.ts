import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from "../src/modules/auth/auth.service";
import { User } from "@prisma/client";
import { AppModule } from "../src/app.module";
import { UsersService } from "../src/modules/users/users.service";
import { UserDto } from "../src/@common/dto/user/user.dto";

describe('Users', () => {
    let app: INestApplication;

    let accessToken: string;
    let adminAccessToken: string;
    
    const testUser =  new UserDto({
        aliasLocked: false,
        country: "",
        id: 0,
        steamID: '123456789',
        alias: 'Ron',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e4/e4db45e6d6472d9e61b131a04ad2f18a299daafc_full.jpg',
        roles: 0,
        bans: 0,
        createdAt: undefined,
        updatedAt: undefined,
        // profile: {
        //     bio: 'Ronald Bilius "Ron" Weasley (b. 1 March, 1980) was an English pure-blood wizard, the sixth and youngest son of Arthur and Molly Weasley (née Prewett). He was also the younger brother of Bill, Charlie, Percy, Fred, George, and the elder brother of Ginny. Ron and his siblings lived at the The Burrow, on the outskirts of Ottery St Catchpole, Devon.',
        // }
    });

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        const usersService = app.get<UsersService>(UsersService);
        await usersService.FindOrCreateUserFromProfile(testUser);
        
        const authService = app.get<AuthService>(AuthService);
        const jwt1 = await authService.login(testUser);
        accessToken = jwt1.access_token;
    });

    describe(`GET /api/v1/users`, () => {
        it('should respond with array of users', async () => {
            const res = await request(app.getHttpServer())
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .expect('Content-Type', /json/)
                .expect(200);
            console.log(res.body);
            expect(res.body.response[0]).toHaveProperty('id');
            expect(res.body.response[0]).toHaveProperty('createdAt');
            // expect(res.body).toBeInstanceOf(Array);
        });

        it('should respond with 401 when no access token is provided', async () => {
            const res = await request(app.getHttpServer())
                .get('/api/v1/users')
                .expect(401);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});

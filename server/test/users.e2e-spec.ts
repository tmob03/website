// noinspection DuplicatedCode

import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/modules/users/users.service';
import { UserDto, UsersDto } from '../src/@common/dto/user/user.dto';

describe('Users', () => {
    let app: INestApplication;
    let server: any;

    let accessToken: string;
    let adminAccessToken: string;

    const testUser = new UserDto({
        aliasLocked: false,
        country: '',
        id: 1,
        steamID: '12345',
        alias: 'Ron',
        avatar: '',
        roles: 0,
        bans: 0,
        createdAt: undefined,
        updatedAt: undefined
        // profile: {
        //     bio: 'Ronald Bilius "Ron" Weasley (b. 1 March, 1980) was an English pure-blood wizard, the sixth and youngest son of Arthur and Molly Weasley (née Prewett). He was also the younger brother of Bill, Charlie, Percy, Fred, George, and the elder brother of Ginny. Ron and his siblings lived at the The Burrow, on the outskirts of Ottery St Catchpole, Devon.',
        // }
    });

    const testUser2 = new UserDto({
        aliasLocked: false,
        country: '',
        id: 2,
        steamID: '123456',
        alias: 'Ginny',
        avatar: '',
        roles: 0,
        bans: 0,
        createdAt: undefined,
        updatedAt: undefined
        // profile: {
        //     bio: 'Ronald Bilius "Ron" Weasley (b. 1 March, 1980) was an English pure-blood wizard, the sixth and youngest son of Arthur and Molly Weasley (née Prewett). He was also the younger brother of Bill, Charlie, Percy, Fred, George, and the elder brother of Ginny. Ron and his siblings lived at the The Burrow, on the outskirts of Ottery St Catchpole, Devon.',
        // }
    });

    beforeAll(async () => {
        jest.setTimeout(600000);

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();

        // TODO: I don't like having to put this in here...
        app.useGlobalPipes(new ValidationPipe({ transform: true }));

        await app.init();
        server = app.getHttpServer();

        const usersService = app.get<UsersService>(UsersService);
        const authService = app.get<AuthService>(AuthService);

        await usersService.FindOrCreateUserFromProfile(testUser);
        await usersService.FindOrCreateUserFromProfile(testUser2);

        const jwt1 = await authService.login(testUser);
        accessToken = jwt1.access_token;
    });

    describe(`GET /api/v1/users`, () => {
        it('should respond with array of users', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.count).toBe(2);
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users[0]).toHaveProperty('id');
            expect(res.body.users[0]).toHaveProperty('createdAt');
            expect(res.body.users[0].alias).toBe(testUser.alias);
        });

        it('should respond with array of users with limit parameter', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({
                    limit: 1
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.count).toBe(1);
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users[0]).toHaveProperty('id');
            expect(res.body.users[0]).toHaveProperty('createdAt');
            expect(res.body.users[0].alias).toBe(testUser.alias);
        });

        it('should respond with array of users with offset parameter', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({ offset: 0, limit: 1 })
                .expect('Content-Type', /json/)
                .expect(200);

            const res2 = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({ offset: 1, limit: 1 })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.count).toBe(1);
            expect(res.body.users[0]).toHaveProperty('id');
            expect(res.body.users[0]).toHaveProperty('createdAt');

            expect(res2.body.users).toBeInstanceOf(Array);
            expect(res2.body.count).toBe(1);
            expect(res2.body.users[0]).toHaveProperty('id');
            expect(res2.body.users[0]).toHaveProperty('createdAt');

            expect(res.body.users[0].id).not.toBe(res2.body.users[0].id);
        });

        it('should respond with array of users with search by alias parameter', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({
                    search: testUser.alias
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.count).toBe(1);
            expect(res.body.users[0]).toHaveProperty('id');
            expect(res.body.users[0]).toHaveProperty('createdAt');
            expect(res.body.users[0].alias).toBe(testUser.alias);
        });

        it('should respond with an empty array of users using a search by parameter containing a nonexistent alias', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({
                    search: 'BARRY'
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.count).toBe(0);
        });

        it('should respond with array of users with expanded profiles when using an expand parameter', async () => {
            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + accessToken)
                .query({
                    expand: 'profile'
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.count).toBe(2);
            expect(res.body.users[0]).toHaveProperty('bio');
        });

        it('should respond with 401 when no access token is provided', () => {
            return request(server).get('/api/v1/users').expect(401);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});

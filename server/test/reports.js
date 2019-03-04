'use strict';
process.env.NODE_ENV = 'test';

const { forceSyncDB, Map, MapInfo, MapCredit, User, Report } = require('../config/sqlize'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../server.js'),
    auth = require('../src/models/auth'),
    map = require('../src/models/map'),
    user = require('../src/models/user'),
    report = require('../src/models/report');

chai.use(chaiHttp);

describe('reports', () => {

    let accessToken = null;
    let adminAccessToken = null;
    let adminGameAccessToken = null;
    const testUser = {
        id: '00000000000000001',
        permissions: user.Permission.VERIFIED
    };
    const testAdmin = {
        id: '00000000000000002',
        permissions: user.Permission.ADMIN
    };
    const testAdminGame = {
        id: '00000000000000003',
        permissions: user.Permission.ADMIN
    };

    const testMap = {
        id: 1,
        name: 'test_map',
        type: map.MAP_TYPE.UNKNOWN,
        statusFlag: map.STATUS.APPROVED,
        submitterID: testUser.id,
        info: {
            description: 'newmap_5',
            numBonuses: 1,
            numZones: 1,
            difficulty: 2,
            isLinear: false,
            creationDate: new Date(),
        },
        credits: {
            id: 1,
            type: map.CreditType.AUTHOR,
            userID: testUser.id,
        },
    };

    before(() => {
        return forceSyncDB().then(() => {
            return auth.genAccessToken(testUser);
        }).then((token) => {
            accessToken = token;
            return User.create(testUser);
        }).then(() => {
            testAdmin.permissions = user.Permission.ADMIN;
            return auth.genAccessToken(testAdmin);
        }).then((token) => {
            adminAccessToken = token;
            return User.create(testAdmin);
        }).then(() => {
            testAdminGame.permissions = user.Permission.ADMIN;
            return auth.genAccessToken(testAdminGame, true);
        }).then((token) => {
            adminGameAccessToken = token;
            return User.create(testAdminGame);
        }).then(user => {
            return Map.create(testMap, {
                include: [
                    {  model: MapInfo, as: 'info',},
                    {  model: MapCredit, as: 'credits'}
                ],
            });
        });
    });


    after(() => {
        return forceSyncDB();
    });

    describe('modules', () => {

    });

    describe('endpoints', () => {

        describe('POST /api/reports', () => {
            it('should create a new report', () => {
                return chai.request(server)
                    .post('/api/reports')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send({
                        data: testMap.id.toString(),
                        type: report.ReportType.MAP_REPORT,
                        category: report.ReportCategory.PLAGIARSIM,
                        message: 'I created this map :(',
                    })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('id');
                });
            });
        });

    });

});

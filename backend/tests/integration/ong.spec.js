const request = require('supertest');
const app = require('../../src/app');
const con = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async ()=>{
        await con.migrate.rollback();
        await con.migrate.latest();
    });

    afterAll(async () => {
        con.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAD",
            email: "apad@hotmail.com",
            whatsapp: "55014988887777",
            city: "Rio do sul",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
//.set('Authorization', 'id ong')
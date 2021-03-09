import request from 'supertest';
import { app } from '../../../app';


describe("Food Endpoints", () => {
    test("It should response the POST method", async done => {
        await request(app)
            .post("/foods")
            .send({
                name: 'qorme'
            })
            .then(response => {
                expect(response.status).toBe(201);
                done();
            });
    });
});

// describe('Food Endpoints', () => {
//     it('returns a 201 on successful food creation', async () => {
//         await request(app)
//             .post('/foods')
//             .send({
//                 name: 'nimrooo'
//             })
//             .expect(201);
//     })
// })



// describe('Sample Test', () => {
//     it('should test that true === true', () => {
//         expect(true).toBe(true)
//     })
// })
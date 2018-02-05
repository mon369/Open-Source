const request = require('supertest');
const app = require('../app');

describe("Testing '/' route", () =>{

    test("GET '/' should respond with Status 200", () =>{
        return request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .then(response =>{
            expect(response.text).toMatch(
                /<title>OSD600 Project<\/title>/
            )
        })
    })
})


describe("Testing /parse/text/ endpoint", () =>{
    test("GET /api/phonenumbers/parse/text should expect 200", ()=>{
        return request(app)
        .get('/api/phonenumbers/parse/text/')
        expect('Content-Type', /html/)
        expect(200)
        .then(response =>{
            expect(response.text).toMatch(
                /How to use this API endpoint/
            )
        })
    })

    
})

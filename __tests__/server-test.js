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
    test("GET /api/phonenumbers/parse/text should expect 200 and a How To Page", ()=>{
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

describe("Testing /parse/text/:phone endpoint", ()=>{
    test("GET /api/phonenumbers/parse/text/Seneca College 416-491-5050 is valid", () =>{
        return request(app)
        .get('/api/phonenumbers/parse/text/Seneca College 416-491-5050')
        .then((response) =>{
            expect(response.status).toBe(200);
            expect(response.text).toBe("[\"(416) 491-5050\"]")
        })
    })

    test("GET /api/phonenumbers/parse/text/Seneca College +1 416-491-5050 (with +1 int'l code) is valid", () =>{
        return request(app)
        .get('/api/phonenumbers/parse/text/Seneca College +1 416-491-5050')
        .then((response) =>{
            expect(response.status).toBe(200);
            expect(response.text).toBe("[\"(416) 491-5050\"]")
        })
    })    

    test("GET /api/phonenumbers/parse/text/Hello should return an empty [{}] because no numbers were found", () =>{
        return request(app)
        .get('/api/phonenumbers/parse/text/Hello')
        .then((response) =>{
            expect(response.status).toBe(200);
            expect(response.text).toBe("[{}]")
        })
    })

    test("GET /api/phonenumbers/parse/text/1234567890 is invalid", () =>{
        return request(app)
        .get('/api/phonenumbers/parse/text/1234567890')
        .then((response) =>{
            expect(response.status).toBe(200);
            expect(response.text).toMatch(/Phone is invalid/);
        })
    })
})
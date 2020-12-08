const request = require("request");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect =chai.expect;
chai.use(chaiHttp);
const url = "http://localhost:3000/user/";

/**
 * test which investigates different scenarios in the process of  registrating a new user
 */

describe("Test registration process", () =>{
    let id;
    /**
    * We assumed the delete method to work perfectly
     */
    after(()=>{
        try {
            request({
                method: 'DELETE',
                uri: url + 'delete/' + id,
                json: true,
            });
        }catch(err){
            throw new Error('Process of cleaning up failed: ' + err);
        }
    });

    /**
     * we assumed that no user with that email and userName existed previously
     */
    it("registration", (done)=>{
        request({
                method: 'POST',
                uri: url + 'register',
                json: true,
                body: {
                    "userName":"HansMuster",
                    "password":"notSecure12",
                    "email": "hans@test.ch",
                    "firstName": "hans",
                    "lastName": "muster"
                }
            },
            (err, res, body)=>{
                id = body.userId;
                expect(res).to.have.status(200);

                done();
            });
    });

    it("registration with existing email and username", (done)=>{
        request({
                method: 'POST',
                uri: url + 'register',
                json: true,
                body: {
                    "userName":"HansMuster",
                    "password":"notSecure12",
                    "email": "hans@test.ch",
                    "firstName": "hans",
                    "lastName": "muster"
                }
            },
            (err, res, body)=>{
                expect(res).to.have.status(500);
                expect(body.message.message).to.be.equal('username and email are already taken');

                done();
            });
    });


    it("password is Null", (done)=>{
        request({
                method: 'POST',
                uri: url + 'register',
                json: true,
                body: {
                    "userName":"HansMuster",
                    "password":"notSecure12",
                    "email": "hans@test.ch",
                    "firstName": "hans",
                    "lastName": "muster"
                }
            },
            (err, res, body)=>{
                expect(res).to.have.status(500);
                done();
            });
    });

});




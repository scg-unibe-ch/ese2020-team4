const request = require("request");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect =chai.expect;
chai.use(chaiHttp);
const url = "http://localhost:3000/item/";

/**
 * test which investigates different scenarios in the process of  creating a new item
 */

describe("Item creation process", () =>{
    let id;



    it("new item", (done)=>{
        request({
                method: 'POST',
                uri: url + 'post',
                json: true,
                body: {
                    "userId":"1",
                    "productType":"Product",
                    "title":"test",
                    "transactionType":"Sell",
                    "description":"test",
                    "location":"test",
                    "delivery":"0",
                    "approvedFlag":"1",
                    "price":"1"
                }
            },
            (err, res, body)=>{
                id = body.itemId;
                expect(res).to.have.status(200);

                done();
            });
    });

    it("rating of product", (done)=>{
        request({
                method: 'POST',
                uri: url + 'rating/' + id,
                json: true,
                body: {
                    "stars":"4"
                }
            },
            (err, res, body)=>{
                expect(res).to.have.status(200);
                expect(body.userReviews).to.be.equal('4');

                done();
            });
    });


    it("delte item", (done)=>{
        request({
                method: 'DELETE',
                uri: url + 'delete/' + id,
                json: true,
            },
            (err, res, body)=>{
                expect(res).to.have.status(200);
                done();
            });
    });

    it("get null item", (done)=>{
        request({
                method: 'GET',
                uri: url + 'getItem/' + id,
                json: true,
            },
            (err, res, body)=>{
                expect(res).to.have.status(404);
                done();
            });
    });

});




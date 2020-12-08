import { OrderItemCount } from './../services/orderItemCount.service';
import { DataLabelCycle } from './../services/dataLabeler.service';
import { TransactionHandler } from './../services/transactionhandler.service';
import { Op } from 'sequelize';
import express, { Request, Response, Router } from 'express';
import { Item } from '../models/useritem/item.model';
import { regexp } from 'sequelize/types/lib/operators';
import fs from 'fs';

const itemController: Router = express.Router();
const transactionHandler = new TransactionHandler();
const dataLabelCycle = new DataLabelCycle();
const oCount = new OrderItemCount();

itemController.post('/post', (req: Request, res: Response) => {
    Item.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));

    dataLabelCycle.processToLabels();
});


itemController.put('/:id', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });

            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});

itemController.post('/rating/:id', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update({userReviews : req.body.stars }).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});


itemController.put('/completeTransaction/:id/:oid', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{orderId: req.params.oid}, , {approvedFlag: {[Op.gt]: 0}}]}
         })
         .then(found => {
            if (found != null) {
                found.map(value => {
                    value.update({soldToId : req.params.id, processed: '0'});
                    transactionHandler.processTransactions();

                });

            } else {
                res.sendStatus(404);
            }
            oCount.getOrderItemCount(req.params.oid);
         })
         .catch(err => res.status(500).send(err));

});

itemController.put('/buy/:id/:oid', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update({orderId : req.params.oid}).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.status(200).send();
            }
            oCount.getOrderItemCount(req.params.oid);
        })
        .catch(err => res.status(500).send(err));

});

itemController.delete('/delete/:id', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

itemController.get('/getPro/', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{productType: 'Product'}, {orderId: null}, {soldToId: 0} , {approvedFlag: {[Op.gt]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



itemController.get('/getSer/', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{productType: 'Service'}, {orderId: null}, {soldToId: 0} , {approvedFlag: {[Op.gt]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



itemController.get('/get/:id', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: 0}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getItem/:id', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {

                    res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

itemController.get('/getOrderItem/:id', (req: Request, res: Response) => {
    Item.findAll({where: {orderId: req.params.id} })
        .then(list => {
            if (list != null) {
                res.status(200).send(list);
            } else {
                res.sendStatus(404);

            }
        })
        .catch(err => res.status(500).send(err));
});

itemController.get('/getTranBou/:id', (req: Request, res: Response) => {
    Item.findAll({where: {soldToId: req.params.id} })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getReviews/:id', (req: Request, res: Response) => {
    Item.findAll({where: {
            [Op.and] : [{userId: req.params.id}, {userReviews: {[Op.ne]: 0}}]}
    }).then(found => {
        if (found.length !== 0) {
            let average = 0;
            for (let i = 0; i < found.length; i++) {
                average = average + found[i].userReviews;
            }

            average = average / (found.length);
            res.status(200).send([average, found.length]);

        } else {
            res.status(200).send([0]);
        }
    })
        .catch(err => res.status(500).send(err));
});

itemController.get('/getTranSol/:id', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: req.params.id}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getAllItems', (req: Request, res: Response) => {
    Item.findAll({where: {
        [Op.and] : [{soldToId: {[Op.eq]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.post('/changeFlag/:id', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update({approvedFlag : !(found.approvedFlag)}).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

itemController.post('/changeAllFlag/', (req: Request, res: Response) => {
    Item.findAll()
        .then(found => {
            if (found != null) {
                found.map(value => {
                    value.update({approvedFlag : 1});
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});



export const ItemController: Router = itemController;

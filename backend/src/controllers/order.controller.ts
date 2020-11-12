
import { Op } from 'sequelize';
import express, { Request, Response, Router } from 'express';

import {Order} from '../models/order.model';
import { regexp } from 'sequelize/types/lib/operators';

const orderController: Router = express.Router();

orderController.post('/post', (req: Request, res: Response) => {
    Order.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});


orderController.put('/change/:id', (req: Request, res: Response) => {
    Order.findByPk(req.params.id)
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

orderController.put('/buy/:id', (req: Request, res: Response) => {
    Order.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update({soldToId : req.params.uid}).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

orderController.delete('/delete/:id', (req: Request, res: Response) => {
    Order.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

orderController.get('/getPro/', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{productType: 'Product'}, {soldToId: 0}, , {approvedFlag: {[Op.gt]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/getSer/', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{productType: 'Service'}, {soldToId: 0}, , {approvedFlag: {[Op.gt]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/get/:id', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: 0}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/getUserOrder/:id', (req: Request, res: Response) => {
    Order.findOne({where: {
        [Op.and] : [{userId: req.params.id}, {status: 'active'}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/getTranBou/:id', (req: Request, res: Response) => {
    Order.findAll({where: {orderId: req.params.id} })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/getTranSol/:id', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: req.params.id}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

orderController.get('/getAllOrders', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{soldToId: {[Op.eq]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});




export const OrderController: Router = orderController;

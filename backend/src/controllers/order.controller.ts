import { OrderItemCount } from './../services/orderItemCount.service';

import { Op } from 'sequelize';
import express, { Request, Response, Router } from 'express';

import {Order} from '../models/order.model';
import { regexp } from 'sequelize/types/lib/operators';

const orderController: Router = express.Router();
const oCount = new OrderItemCount();

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
                oCount.getOrderItemCount(req.params.id);
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
                oCount.getOrderItemCount(req.params.id);
            } else {
                res.sendStatus(404);
            }

        })
        .catch(err => res.status(500).send(err));

});

orderController.get('/getCount/:id', (req: Request, res: Response) => {
    Order.findOne({where: {
        [Op.and] : [{userId: req.params.id}, {status: 'active'}]}
         })

        .then(found => res.status(200).send(found.count.toString()))
        .catch(err => err);
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

orderController.get('/getAllOrders', (req: Request, res: Response) => {
    Order.findAll({where: {
        [Op.and] : [{soldToId: {[Op.eq]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


export const OrderController: Router = orderController;

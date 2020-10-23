import { Op } from 'sequelize';
import express, { Request, Response, Router } from 'express';
import { Item } from '../models/useritem/item.model';
import { regexp } from 'sequelize/types/lib/operators';

const itemController: Router = express.Router();

itemController.post('/post', (req: Request, res: Response) => {
    Item.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
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

itemController.put('/buy/:id/:uid', (req: Request, res: Response) => {
    Item.findByPk(req.params.id)
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
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {
        [Op.and] : [{productType: 'Product'}, {soldToId: 0}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getSer/', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {
        [Op.and] : [{productType: 'Service'}, {soldToId: 0}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});





itemController.get('/get/:id', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: 0}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



itemController.get('/getTranBou/:id', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {soldToId: req.params.id} })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getTranSol/:id', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {
        [Op.and] : [{userId: req.params.id}, {soldToId: {[Op.gt]: 0}}]}
         })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

itemController.get('/getAllItems', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll()
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



export const ItemController: Router = itemController;

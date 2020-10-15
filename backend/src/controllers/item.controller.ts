import express, { Request, Response, Router } from 'express';
import { Item } from '../models/useritem/item.model';

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

itemController.delete('/:id', (req: Request, res: Response) => {
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

itemController.get('/get/:id', (req: Request, res: Response) => {
    // this automatically fills each todolist with the according todoitems
    Item.findAll({where: {userId: req.params.id} })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

export const ItemController: Router = itemController;

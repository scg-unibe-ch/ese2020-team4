import express from 'express';
import { Router, Request, Response } from 'express';
import { Item } from '../models/useritem/item.model';

const itemController: Router = express.Router();

itemController.post('/', (req: Request, res: Response) => {
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

export const ItemController: Router = itemController;

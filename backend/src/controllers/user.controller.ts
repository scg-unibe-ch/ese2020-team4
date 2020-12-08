import express, { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { UserService } from '../services/user.service';
import {Item} from '../models/useritem';
import {Op} from 'sequelize';
import {User} from '../models/user.model';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.status(200).send(registered)).catch(err => res.status(500).send(err));
        // res.status(200).send('works');
    }
);

userController.put('/edit/:id',
    (req: Request, res: Response) => {
        User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                console.log(req.body);
                found.update({
                    'userName': req.body.userName,
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'street': req.body.street,
                    'zipCode': req.body.zipCode,
                    'city': req.body.city,
                    'country': req.body.country,
                    'tNumber': req.body.tNumber,
                }).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(404).send('Wrong credentials'));
    }
);

userController.put('/charge/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                console.log(req.body);
                found.update({'wallet': +found.wallet + +req.body.wallet}).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});

userController.put('/minusWallet/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                console.log(req.body.price);
                found.update({'wallet': +found.wallet - +req.body.price}).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/getAllUsers',
    (req: Request, res: Response) => {
        User.findAll()
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
});

userController.delete('/delete/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

userController.get('/getSpecific/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                res.send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

userController.get('/getWallet/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                res.send(found);
            }
        })
        .catch(err => err);
});

userController.get('/getAllwithoutAdmin',
    (req: Request, res: Response) => {
        User.findAll({where: {
            [Op.and] : [{roleId: {[Op.ne]: 1}}]}
             })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
});



userController.post('/resetRequest',
    (req: Request, res: Response) => {
        userService.resetRequest(req.body.email).then(sent => res.send(sent)).catch(err => res.status(500).send(err));
    }
);

userController.post('/resetPassword',
    (req: Request, res: Response) => {
        userService.resetPassword(req.body.token, req.body.password)
            .then(changed => res.send(changed)).catch(err => res.status(500).send(err));
    }
);






export const UserController: Router = userController;

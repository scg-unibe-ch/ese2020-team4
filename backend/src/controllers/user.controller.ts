
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
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

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

userController.get('/getAllwithoutAdmin',
    (req: Request, res: Response) => {
        User.findAll({where: {
            [Op.and] : [{roleId: {[Op.ne]: 1}}]}
             })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
});



export const UserController: Router = userController;

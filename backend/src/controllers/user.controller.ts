
import express, { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { UserService } from '../services/user.service';
import {Item} from '../models/useritem';
import {User} from '../models/user.model';
import {Op} from 'sequelize';

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

userController.get('/isAdmin/:id',
    (req: Request, res: Response) => {
        // // this automatically fills each todolist with the according todoitems
        // User.findOne({where: {userId: req.params.id} })
        //     .then(list => res.send(true))
        //     .catch(err => res.status(500).send(false));

        User.findOne({where: {userId: req.params.id}})
             .then(user => {
                 if (user) {
                     if (user.roleId === 1) {
                         res.status(200).send(true);
                     } else {
                         res.status(200).send(false);
                     }
                 }

                 res.status(200).send(false);


             }).catch(err => res.status(500).send(err));
});





// itemController.get('/get/:id', (req: Request, res: Response) => {
//     // this automatically fills each todolist with the according todoitems
//     Item.findAll({where: {userId: req.params.id} })
//         .then(list => res.status(200).send(list))
//         .catch(err => res.status(500).send(err));
// });


export const UserController: Router = userController;

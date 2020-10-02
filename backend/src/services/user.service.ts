import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import {Op} from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validation } from '../middlewares/fieldsValid';

export class UserService {

    public register(user: UserAttributes): Promise<unknown> {
            const saltRounds = 12;
            user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
            // password2 should also get encrypted or just not stored in database!
            return validation(user).then(function() {User.create(user).then(inserted => Promise.resolve(inserted)
                .catch(err => Promise.reject(err))); }).catch(err => Promise.reject(err));
        }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                [Op.or]: {userName: loginRequestee.userName, email: loginRequestee.userName}
            }
        })
        .then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}

import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import {Op} from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.findOne({
            where: {
                [Op.or]:
                    { userName: user.userName, email: user.email }
            }
        })
            .then(newUser => {
                if (newUser) {
                    if (newUser.userName === user.userName && newUser.email === user.email) {
                        return Promise.reject({ message: 'username and email are already taken'});
                    } else if (newUser.userName === user.userName) {
                        return Promise.reject({ message: 'username is already taken'});
                    } else {
                        return Promise.reject({ message: 'email is already taken'});
                    }
                }
                return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
            })
            .catch(err =>  Promise.reject({ message: err}));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                [Op.or]: {userName: loginRequestee.userName, email: loginRequestee.userName}
            }
        })
            .then(user => {
                if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash
                    // with the password from the lognin request
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

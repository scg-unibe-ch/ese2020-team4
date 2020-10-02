import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function validation(user: UserAttributes) {
    return new Promise(function(resolve, reject) {
        reject('it seems to work');
    });
}




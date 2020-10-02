import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function validation(user: UserAttributes) {

    if (fieldsMissing(user)) {
        return Promise.reject('Please fill out all required fields.');
    }

    if (emailNotValid(user)) {
        return Promise.reject('Please enter a valid email address.');
    }

    if (passwordNotValid(user)) {
        return Promise.reject('Your password has to be at least 7 characters long ' +
            'and to contain at least 1 Capital letter, 1 small letter, 1 number.');

    }

    const saltRounds = 12;
    user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
    return Promise.resolve();
}

// tslint:disable-next-line:no-shadowed-variable
function fieldsMissing(user: UserAttributes) {
    if (user.email.length < 1 || user.userName.length < 1 ||
        user.password.length < 1 || user.firstName.length < 1 || user.lastName.length < 1 ) {
        return true;
        }
    }


// tslint:disable-next-line:no-shadowed-variable
function emailNotValid(user: UserAttributes) {
    if (user.email.indexOf('@') === -1) {
        return true;
    }
}

// tslint:disable-next-line:no-shadowed-variable
function passwordNotValid(user: UserAttributes) {

    // tslint:disable-next-line:no-shadowed-variable
    const passwordValidator = require('password-validator');

// Create a schema
    const schema = new passwordValidator();

// Add properties to it
    schema
        .is().min(7)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces();                           // Should not have spaces

    return !(schema.validate(user.password));

}








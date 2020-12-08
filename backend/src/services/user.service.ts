import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import {Op} from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';



export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.findOne({
            where: {
                [Op.or]:
                    {userName: user.userName, email: user.email}
            }
        })
            .then(newUser => {
                if (newUser) {
                    if (newUser.userName === user.userName && newUser.email === user.email) {
                        return Promise.reject({message: 'username and email are already taken'});
                    } else if (newUser.userName === user.userName) {
                        return Promise.reject({message: 'username is already taken'});
                    } else {
                        return Promise.reject({message: 'email is already taken'});
                    }
                }

                return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
            })
            .catch(err => Promise.reject({message: err}));
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
                    const token: string = jwt.sign({
                        userName: user.userName,
                        userId: user.userId
                    }, secret, {expiresIn: '2h'});
                    return Promise.resolve({user, token});
                } else {
                    return Promise.reject({message: 'not authorized'});
                }
            })
            .catch(err => Promise.reject({message: err}));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }



    resetRequest(userEmail: string): Promise<{message: string}> {
        return User.findOne({where: {email: userEmail}
        })
            .then(user => {
                    if (!user) {
                        return Promise.reject({message: 'No account with that email address exists'});
                    }

                    const token = crypto.randomBytes(10).toString('hex');

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    return user.save();


            }).then(user => {

                const receiver = user.email;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                            user: 'ese2020team4@gmail.com', // generated ethereal user
                             pass: 'gohtDiNixAh4', // generated ethereal password
                    },
                 });

                // send mail with defined transport object
                const mailOptions = {
                        from: 'ese2020team4@gmail.com', // sender address
                        to: receiver, // receiver (for testing reason the same account)
                        subject: 'Reset Password', // subject
                        text:   'You are receiving this because you have requested the reset ' +
                                'of the password for your account.\n\n' +
                                'Please click on the following link, or paste this into ' +
                                'your browser to complete the process:\n\n' +
                                'http://localhost:4200/reset/' + user.resetPasswordToken + '\n\n' +
                                'If you did not request this, please ignore this email and' +
                                'your password will remain unchanged.\n',

                };

                return transporter.sendMail(mailOptions);


            }).then(sent => {
                return Promise.resolve({message: 'An e-mail has been sent to ' + userEmail + ' with further instructions.'});
            })
            .catch(err => Promise.reject(err));

    }

    resetPassword(token: string, pw: string): Promise<{message: string}> {
       // return User.findOne(token)
        return User.findOne({
            where: {
                [Op.or]:
                    {resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }}
            }
        })
            .then(user => {
                if (!user) {
                    return Promise.reject({message: 'Password reset token is invalid or has expired'});
                }



                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;

                const saltRounds = 12;

                user.password = bcrypt.hashSync(pw, saltRounds);

                return user.save();

                // return Promise.resolve({message: 'well done'});
            }).then(user => {

                const receiver = user.email;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ese2020team4@gmail.com', // generated ethereal user
                        pass: 'gohtDiNixAh4', // generated ethereal password
                    },
                });

                // send mail with defined transport object
                const mailOptions = {
                    from: 'ese2020team4@gmail.com', // sender address
                    to: receiver, // receiver (for testing reason the same account)
                    subject: 'password changed successfully! :)', // subject
                    text:   'This is a confirmation that the password for your account '
                        + user.email + ' has just been changed.\n'

                };

                return transporter.sendMail(mailOptions);


            }).then(sent => {
                return Promise.resolve({message: 'A confirmation email has ben sent.'});
            })
            .catch(err => Promise.reject(err));

    }
}









 import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import {UserController, SecuredController, ItemController, OrderController} from './controllers/cindex';
import { BelongsTo, Sequelize } from 'sequelize';
import { User } from './models/user.model';
import * as uitems from './models/useritem/index';
import {Order} from './models/order.model';

import cors from 'cors';
import { Role } from './models/role.model';
import {Rating} from './models/rating.model';

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();

        Role.initialize(this.sequelize);
        User.initialize(this.sequelize);
        Order.initialize(this.sequelize);
        uitems.Item.initialize(this.sequelize);
        Role.uBuild();
        User.uBuild();
        Rating.initialize(this.sequelize);

        Role.createAssociations();
        User.createAssociations();
        Order.createAssociations();
        uitems.Item.createAssociations();
        Rating.createAssociations();

        this.sequelize.sync({logging: console.log}).then(() => {
            this.server.listen(this.port, () => {                                   // start server on specified port
            console.log(`server listening at http://localhost:${this.port}`);
            });
        }).catch(err => console.log(err));


    }

    private configureServer(): Application {
        // options for cors middleware
        const myParser  = require('body-parser');
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            // .use(express.json())
            .use(myParser.json({limit: '5mb'}))
            .use(myParser.urlencoded({limit: '5mb', extended: true}))                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/item', ItemController)
            .use('/order', OrderController)
            .use('/user', UserController)
            .use('/secured', SecuredController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'dbN.sqlite',
            logging: false // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server

import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import {TodoItemController, TodoListController, UserController, SecuredController, ItemController} from './controllers/cindex';
import { BelongsTo, Sequelize } from 'sequelize';
import { TodoList } from './models/todolist.model';
import { TodoItem } from './models/todoitem.model';
import { User } from './models/user.model';
import * as uitems from './models/useritem/index';

import cors from 'cors';
import { Role } from './models/role.model';


export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();

        TodoItem.initialize(this.sequelize); // creates the tables if they dont exist
        TodoList.initialize(this.sequelize);
        TodoItem.createAssociations();
        TodoList.createAssociations();
        Role.initialize(this.sequelize);
        User.initialize(this.sequelize);
        uitems.Item.initialize(this.sequelize);

        Role.uBuild();
        Role.createAssociations();
        User.createAssociations();
        uitems.Item.createAssociations();


        // Really ugly right now could be made better with a common Interface
        // uitems.LentItem.initialize(this.sequelize);
        // uitems.PostedItem.initialize(this.sequelize);
        // uitems.PurchasedItem.initialize(this.sequelize);
        // uitems.SoldItem.initialize(this.sequelize);

        // uitems.LentItem.createAssociations();
        // uitems.PostedItem.createAssociations();
        // uitems.PurchasedItem.createAssociations();
        // uitems.SoldItem.createAssociations();

        this.sequelize.sync({logging: console.log}).then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        }).catch(err => console.log(err));


    }

    private configureServer(): Application {
        // options for cors middleware
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
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/todoitem', TodoItemController)   // any request on this path is forwarded to the TodoItemController
            .use('/todolist', TodoListController)
            .use('/item', ItemController)
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

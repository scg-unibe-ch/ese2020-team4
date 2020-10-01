import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { UserList } from './userlist.model';

export interface UserAttributes {
    userListId: number;
    userId: number;
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    tNumber: string;
    Address: string;


}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userListId!: number;
    userId!: number;
    email!: string;
    userName!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    tNumber!: string;
    Address!: string;


    public static initialize(sequelize: Sequelize) {
        User.init({
            userListId: {
                type: DataTypes.INTEGER,
                defaultValue: 2,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tNumber: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Address: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
            {sequelize, tableName: 'users'}

        );
        }
        public static createAssociations() {
            TodoItem.belongsTo(UserList, {
                targetKey: 'userListId',
                as: 'userList',
                onDelete: 'cascade',
                foreignKey: 'userListId'
            });
        }
}


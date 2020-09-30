import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { UserList } from './userlist.model';

export interface UserAttributes {
    userId: number;
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    tNumber: string;
    Address: string;
    userListId: number;

}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    tNumber!: string;
    Address!: string;
    userListId!: number;

    public static initialize(sequelize: Sequelize) {
        User.init({
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
            },
            userListId: {
                type: DataTypes.INTEGER,
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


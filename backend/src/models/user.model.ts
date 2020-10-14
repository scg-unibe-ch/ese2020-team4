import { Optional, Model, Sequelize, DataTypes, Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { Role } from './role.model';
import { Item } from './useritem/item.model';

export interface UserAttributes {
    userId: number;
    roleId: number;
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    tNumber: string;
    street: string;
    zipCode: number;
    city: string;
    country: String;
    wallet: number;


}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

    public static associations: {
        item: Association<User, Item>
    };

    userId!: number;
    roleId!: number;
    email!: string;
    userName!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    tNumber!: string;
    street!: string;
    zipCode!: number;
    city!: string;
    country!: String;
    wallet!: number;

    public getUserItems!: HasManyGetAssociationsMixin<Item>;
    public addItem!: HasManyAddAssociationMixin<Item, number>;

    public readonly userItems?: Item[];

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            roleId: {
                type: DataTypes.INTEGER,
                defaultValue: 2,
                allowNull: false
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
            street: {
                type: DataTypes.STRING,
                allowNull: true
            },
            zipCode: {
                type: DataTypes.NUMBER,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true
            },
            wallet: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true
            }

        },
            { sequelize, tableName: 'user' }

        );
    }
    public static createAssociations() {
        User.belongsTo(Role, {
            targetKey: 'roleId',
            as: 'role',
            onDelete: 'cascade',
            foreignKey: 'roleId'
        });
        User.hasMany(Item, {
            as: 'userItem',
            foreignKey: 'userId'
        });
    }

}


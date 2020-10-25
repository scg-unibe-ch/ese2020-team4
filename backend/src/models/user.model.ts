import { UserService } from './../services/user.service';
import { Optional, Model, Sequelize, DataTypes, Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { Role } from './role.model';
import { Item } from './useritem/item.model';
import bcrypt from 'bcrypt';

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
    resetPasswordToken: String;
    resetPasswordExpires: number;



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
    resetPasswordToken: String;
    resetPasswordExpires: number;


    public getUserItem!: HasManyGetAssociationsMixin<Item>;
    public addItem!: HasManyAddAssociationMixin<Item, number>;

    public readonly userItem?: Item[];

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            roleId: {
                type: DataTypes.INTEGER,
                defaultValue: 2
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
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
                allowNull: true
                },
            resetPasswordExpires: {
                type: DataTypes.NUMBER,
                allowNull: true
                }

        },
            { sequelize, tableName: 'user' }

        );
    }

    public static uBuild() {
        User.findAll().then(x => {
            if (x.length === 0) {
                User.create({userName: 'Administrator', roleId: 1,
                email: 'Administrator@hotmail.ch', firstName: 'Ad',
                lastName: 'min', password: bcrypt.hashSync('Admin!123', 12), gender: 'male',
                tNumber: '0323223232', street: 'AdminStreet', zipCode: 2222,
                city: 'Administratium', country: 'BossCountry', wallet: 999999,
                resetPasswordToken: null, resetPasswordExpires: null}).catch(error => console.log(error)),
                User.create({userName: 'User', roleId: 2,
                email: 'User@hotmail.ch', firstName: 'Us',
                lastName: 'er', password: bcrypt.hashSync('User!123', 12), gender: 'male',
                tNumber: '0323223233', street: 'UserStreet', zipCode: 2222,
                city: 'Userium', country: 'PlebianCountry', wallet: 0,
                resetPasswordToken: null, resetPasswordExpires: null}).catch(error => console.log(error));
            }
        }).catch(error => console.error('Error when building a predefined role Table'));

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


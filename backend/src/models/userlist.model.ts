import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

export interface UserListAttributes {
    userListId: number;
    name: string;
}

export interface UserListCreationAttributes extends Optional<UserListAttributes, 'userListId'> { }

export class UserList extends Model<UserListAttributes, UserListCreationAttributes> implements UserListAttributes {

    public static associations: {
        users: Association<UserList, User>;
    };
    userListId!: number;
    name!: string;

    public getUserList!: HasManyGetAssociationsMixin<User>;

    public readonly userItems?: User[];

    public static initialize(sequelize: Sequelize) {
        UserList.init(
            {
                userListId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'userlists', createdAt: false, updatedAt: true, sequelize }
        );
    }
    public static uBuild() {
        try {
        UserList.create({userListId: 1, name: 'Administrator'});
        UserList.create({userListId: 2, name: 'User'});
        UserList.create({userListId: 3, name: 'Guest'});
        } catch (error) {
            alert('UserList already built');
        }

    }
    public static createAssociations() {
        UserList.hasMany(User, {
            as: 'users',
            foreignKey: 'userListId'
        });
    }
}

import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

export interface UserListAttributes {
    userListId: number;
    name: string;
}

export interface UserListCreationAttributes extends Optional<UserListAttributes, 'userListId'> { }

export class UserList extends Model<UserListAttributes, UserListCreationAttributes> implements UserListAttributes {

    public static associations: {
        todoItems: Association<UserList, User>;
    };
    userListId!: number;
    name!: string;

    public getUserList!: HasManyGetAssociationsMixin<User>;
    public addUserList!: HasManyAddAssociationMixin<User, number>;

    public readonly userItems?: User[];

    public static initialize(sequelize: Sequelize) {
        UserList.init(
            {
                userListId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'userlists', sequelize }
        );
    }
    public static createAssociations() {
        UserList.hasMany(User, {
            as: 'users',
            foreignKey: 'userListId'
        });
    }
}

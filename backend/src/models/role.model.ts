import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { User } from './user.model';
import {Op} from 'sequelize';

export interface RoleAttributes {
    roleId: number;
    name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'roleId'> { }

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {

    public static associations: {
        users: Association<Role, User>;
    };
    roleId!: number;
    name!: string;

    public getRole!: HasManyGetAssociationsMixin<User>;

    public readonly userRole?: User[];

    public static initialize(sequelize: Sequelize) {
        Role.init(
            {
                roleId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'role', createdAt: false, updatedAt: false, sequelize }
        );
    }

    public static uBuild() {
        Role.findAll().then(x => {
            if (x.length === 0) {
                Role.create({roleId: 1, name: 'Administrator'}).catch(error => console.log(error));
                Role.create({roleId: 2, name: 'User'}).catch(error => console.log(error));
                Role.create({roleId: 3, name: 'Guest'}).catch(error => console.log(error));
            }
        });
    }
    public static createAssociations() {
        Role.hasMany(User, {
            as: 'users',
            foreignKey: 'roleId'
        });
    }
}

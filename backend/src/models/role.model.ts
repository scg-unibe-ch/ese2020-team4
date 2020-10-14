import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

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
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'role', sequelize }
        );
    }
    public static uBuild() {
        Role.findAll().then(x => {
            if (x.length === 0) {
                Role.create({ name: 'Administrator' }).catch(error => console.log(error));
                Role.create({ name: 'User' }).catch(error => console.log(error));
                Role.create({ name: 'Guest' }).catch(error => console.log(error));
            }
        }).catch(error => console.error('Error when building a predefined role Table'));

    }
    public static createAssociations() {
        Role.hasMany(User, {
            as: 'user',
            foreignKey: 'roleId'
        });
    }
}

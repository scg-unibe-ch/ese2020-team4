import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from '../../user.model';

export interface UserItem {
    userId: number;
    postedItemId: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

export interface SoldItemCreationAttributes extends Optional<UserItem, 'userId'> { }

export class SoldItem extends Model<UserItem, SoldItemCreationAttributes> implements UserItem {
    userId!: number;
    postedItemId!: number;
    name!: string;
    category!: string;
    description!: string;
    price!: number;

    public static initialize(sequelize: Sequelize) {
        SoldItem.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            postedItemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
            {sequelize, tableName: 'soldItem'}

        );
        }
        public static createAssociations() {
            SoldItem.belongsTo(User, {
                targetKey: 'userId',
                as: 'usersolditems',
                onDelete: 'cascade',
                foreignKey: 'userId'
            });
        }
}


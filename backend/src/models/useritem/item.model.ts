import { Optional, Model, Sequelize, DataTypes, Association, HasManyAddAssociationMixin } from 'sequelize';
import { User } from '../user.model';

export interface ItemAttributes {
    userId: number;
    itemId: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

export interface ItemCreationAttributes extends Optional<Item, 'itemId'> { }

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
    userId!: number;
    itemId!: number;
    name!: string;
    category!: string;
    description!: string;
    price!: number;


    public static initialize(sequelize: Sequelize) {
        Item.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            itemId: {
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
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
            {sequelize, tableName: 'item'}

        );
        }
        public static createAssociations() {
            Item.belongsTo(User, {
                targetKey: 'userId',
                as: 'userItem',
                onDelete: 'cascade',
                foreignKey: 'userId'
            });
        }
}

import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from '../user.model';

export interface PurchasedItemsAttributes {
    userId: number;
    postedItemId: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

export interface PurchasedItemCreationAttributes extends Optional<PurchasedItemsAttributes, 'userId'> { }

export class PurchasedItem extends Model<PurchasedItemsAttributes, PurchasedItemCreationAttributes> implements PurchasedItemsAttributes {
    userId!: number;
    postedItemId!: number;
    name!: string;
    category!: string;
    description!: string;
    price!: number;

    public static initialize(sequelize: Sequelize) {
        PurchasedItem.init({
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
            {sequelize, tableName: 'purchasedItem'}

        );
        }
        public static createAssociations() {
            PurchasedItem.belongsTo(User, {
                targetKey: 'userId',
                as: 'userpurchaseditems',
                onDelete: 'cascade',
                foreignKey: 'userId'
            });
        }
}


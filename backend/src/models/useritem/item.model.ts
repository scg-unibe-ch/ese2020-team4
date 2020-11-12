import { Order } from './../order.model';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from '../user.model';

export interface ItemAttributes {
    userId: number;
    itemId: number;
    orderId: number;
    soldToId: number;
    productType: string;
    title: string;
    transactionType: string;
    description: string;
    pictureId: number;
    location: string;
    status: string;
    delivery: boolean;
    userReviews: string;
    price: number;
    priceModel: string;
    approvedFlag: boolean;
    count: number;
}

export interface ItemCreationAttributes extends Optional<Item, 'itemId'> { }

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
    userId!: number;
    itemId!: number;
    orderId!: number;
    soldToId!: number;
    productType: string;
    title!: string;
    transactionType!: string;
    description!: string;
    pictureId!: number;
    location!: string;
    status!: string;
    delivery!: boolean;
    userReviews!: string;
    price!: number;
    priceModel!: string;
    approvedFlag!: boolean;
    count!: number;

    public static initialize(sequelize: Sequelize) {
        Item.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            itemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            orderId: {
                type: DataTypes.INTEGER,
                defaultValue: null,
                allowNull: true
            },
            soldToId: {
                type: DataTypes.STRING,
                defaultValue: 0,
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            transactionType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pictureId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'Available',
                allowNull: false
            },
            delivery: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            priceModel: {
                type: DataTypes.STRING,
                defaultValue: 'Fixed',
                allowNull: false
            },
            approvedFlag: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: true
            },
            userReviews: {
                type: DataTypes.STRING,
                defaultValue: false,
                allowNull: true
            },
            count: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false
            }

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
            }),
            Item.belongsTo(Order, {
                targetKey: 'orderId',
                as: 'orderItem',
                onDelete: 'NO ACTION',
                foreignKey: {name: 'orderId', allowNull: true},
                constraints: false
            });
        }

    public getUserId() {
        return this.userId;
    }
}

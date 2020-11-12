import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Item } from './useritem/item.model';
import { User } from './user.model';

export interface OrderAttributes {
    orderId: number;
    userId: number;
    status: string;
    street: string;
    zipCode: number;
    city: string;
    country: string;
    price: number;
}

export interface OrderCreationAttributes extends Optional<Order, 'orderId'> { }

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    orderId!: number;
    userId!: number;
    status!: string;
    street!: string;
    zipCode!: number;
    city!: string;
    country!: string;
    price!: number;

    public static initialize(sequelize: Sequelize) {
        Order.init({
            orderId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'inactive',
                allowNull: false
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
            price: {
                type: DataTypes.FLOAT,
                allowNull: true
            }
        },
            {sequelize, tableName: 'order'}

        );
        }
        public static createAssociations() {
            Order.hasMany(Item, {
                as: 'orderItem',
                foreignKey: {name: 'orderId', allowNull: true},
                constraints: false
            }),
            Order.belongsTo(User, {
                targetKey: 'userId',
                as: 'userOrder',
                onDelete: 'NO ACTION',
                foreignKey: 'userId'
            });
        }
}

import { Order } from './order.model';
import { UserService } from './../services/user.service';
import { Optional, Model, Sequelize, DataTypes, Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { Role } from './role.model';
import { Item } from './useritem/item.model';
import bcrypt from 'bcrypt';
import {User} from './user.model';

export interface RatingAttributes {
    ratingId: number;
    senderId: number;
    recipientId: number;
    itemId: number;
    description: string;
    stars: number;

}

export interface RatingCreationAttributes extends Optional<RatingAttributes, 'ratingId'> { }

export class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {

    ratingId!: number;
    senderId: number;
    recipientId: number;
    itemId!: number;
    description!: string;
    stars!: number;


    public static initialize(sequelize: Sequelize) {
        Rating.init({
                ratingId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                senderId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                recipientId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                itemId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                stars: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false
                }

            },
            { sequelize, tableName: 'rating' }

        );
    }

    public static createAssociations() {

            // Rating.belongsTo(Order, {
            //     targetKey: 'orderId',
            //     as: 'userOrder',
            //     onDelete: 'NO ACTION',
            //     foreignKey: 'send'
            // }),
                Rating.belongsTo(User, {
                    targetKey: 'userId',
                    as: 'ratedOthersByMe',
                    onDelete: 'NO ACTION',
                    foreignKey: 'senderId'
                }),
                Rating.belongsTo(User, {
                    targetKey: 'userId',
                    as: 'ratingsByOthers',
                    onDelete: 'NO ACTION',
                    foreignKey: 'recipientId'
                })
            ;
    }



}


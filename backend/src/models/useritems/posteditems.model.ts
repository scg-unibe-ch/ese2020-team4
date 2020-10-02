import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from '../user.model';

export interface PostedItemAttributes {
    userId: number;
    postedItemId: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

export interface PostedItemCreationAttributes extends Optional<PostedItemAttributes, 'userId'> { }

export class PostedItem extends Model<PostedItemAttributes, PostedItemCreationAttributes> implements PostedItemAttributes {
    userId!: number;
    postedItemId!: number;
    name!: string;
    category!: string;
    description!: string;
    price!: number;

    public static initialize(sequelize: Sequelize) {
        PostedItem.init({
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
            {sequelize, tableName: 'postedItem'}

        );
        }
        public static createAssociations() {
            PostedItem.belongsTo(User, {
                targetKey: 'userId',
                as: 'userposteditems',
                onDelete: 'cascade',
                foreignKey: 'userId'
            });
        }
}


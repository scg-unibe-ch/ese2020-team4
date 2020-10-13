import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from '../../user.model';

export interface LentItemAttributes {
    userId: number;
    postedItemId: number;
    name: string;
    category: string;
    description: string;
    duration: number;
    price: number;
}

export interface LentItemCreationAttributes extends Optional<LentItemAttributes, 'userId'> { }

export class LentItem extends Model<LentItemAttributes, LentItemCreationAttributes> implements LentItemAttributes {
    userId!: number;
    postedItemId!: number;
    name!: string;
    category!: string;
    description!: string;
    duration!: number;
    price!: number;

    public static initialize(sequelize: Sequelize) {
        LentItem.init({
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
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
            {sequelize, tableName: 'lentItem'}

        );
        }
        public static createAssociations() {
            LentItem.belongsTo(User, {
                targetKey: 'userId',
                as: 'userlentitems',
                onDelete: 'cascade',
                foreignKey: 'userId'
            });
        }
}


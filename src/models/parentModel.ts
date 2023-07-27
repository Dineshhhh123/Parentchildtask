import { DataTypes, Model } from 'sequelize';
import sequelize from '../helpers/helper';

interface ParentAttributes {
  id: number;
  name: string;
}

class Parent extends Model<ParentAttributes> implements ParentAttributes {
  public id!: number;
  public name!: string;
}

Parent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Parent',
    timestamps:true,
  }
);

export default Parent;

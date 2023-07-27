import { DataTypes, Model } from 'sequelize';
import sequelize from '../helpers/helper';

interface ChildAttributes {
  id: number;
  name: string;
  parentId: number | null;
}

class Child extends Model<ChildAttributes> implements ChildAttributes {
  public id!: number;
  public name!: string;
  public parentId!: number | null;
}

Child.init(
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
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Child',
    timestamps:true,
  }
);

export default Child;

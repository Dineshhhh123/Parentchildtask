import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../helpers/helper';

interface NodeAttributes {
  id: number;
  name: string;
  parent_id: number | null;
}

interface NodeCreationAttributes extends Optional<NodeAttributes, 'id'> {}

class Node extends Model<NodeAttributes, NodeCreationAttributes> implements NodeAttributes {
  public id!: number;
  public name!: string;
  public parent_id!: number | null;
}

Node.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nodes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'nodes',
    timestamps:true,
  }
);

export default Node;

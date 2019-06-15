import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class TargetingTags extends Model {}

TargetingTags.init({
  id: { type: Sequelize.UUID, allowNull: false },
  label: { type: Sequelize.STRING, allowNull: false },
  criteria: { type: Sequelize.JSON, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'targeting_tags'
});

export default TargetingTags;

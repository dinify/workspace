import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class TargetingTags extends Model {}

TargetingTags.init({
  id: { type: Sequelize.UUID, allowNull: false },
  item_id: { type: Sequelize.UUID, allowNull: false },
  item_type: { type: Sequelize.STRING, allowNull: true },
  targeting_tag_id: { type: Sequelize.UUID, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'targeting_taggables'
});

export default TargetingTags;

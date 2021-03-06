import Sequelize from 'sequelize';
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class TargetingTags extends Model {}

TargetingTags.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  
  item_id: { type: Sequelize.UUID, allowNull: false },
  item_type: { type: Sequelize.STRING, allowNull: false },
  targeting_tag_id: { type: Sequelize.UUID, allowNull: false },

  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  tableName: 'targeting_taggables'
});

export default TargetingTags;

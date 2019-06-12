import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class TargetingTags extends Model {}

TargetingTags.init({
  restaurant_id: { type: Sequelize.UUID, allowNull: true },
  tag: { type: Sequelize.STRING, allowNull: true }
}, {
  sequelize,
  modelName: 'targeting_tags'
});

export default TargetingTags;

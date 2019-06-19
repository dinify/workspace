import Sequelize from 'sequelize';
import TargetingTaggables from './TargetingTaggables';
import TargetingTags from './TargetingTags';
import uuidBase62 from 'uuid-base62';

const sequelize = require('../mysql.config');
const Model = Sequelize.Model;

class RestaurantsTa extends Model {}

RestaurantsTa.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  location_id: { type: Sequelize.STRING, unique: true, allowNull: false },
  restaurant_id: { type: Sequelize.STRING, unique: true, allowNull: true },
  name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: true },
  city: { type: Sequelize.STRING, allowNull: true },
  address: { type: Sequelize.STRING, allowNull: true },
  location: { type: Sequelize.GEOGRAPHY, allowNull: true },
  location_string: { type: Sequelize.STRING, allowNull: true },
  num_reviews: { type: Sequelize.INTEGER, allowNull: true },
  raw_ranking: { type: Sequelize.FLOAT, allowNull: true },
  photo_url: { type: Sequelize.STRING, allowNull: true },
  ranking_denominator: { type: Sequelize.INTEGER, allowNull: true },
  ranking_position: { type: Sequelize.INTEGER, allowNull: true },
  web_url: { type: Sequelize.STRING, allowNull: true },
  website: { type: Sequelize.STRING, allowNull: true },
  language_distribution: { type: Sequelize.JSON, allowNull: true },
  language_groups: { type: Sequelize.JSON, allowNull: true },
  target_languages: { type: Sequelize.NUMBER, allowNull: true },
  target_languages_rel: { type: Sequelize.FLOAT, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'restaurants_ta'
});

export default RestaurantsTa;

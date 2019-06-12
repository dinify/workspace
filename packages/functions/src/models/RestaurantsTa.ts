import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class RestaurantsTa extends Model {}

RestaurantsTa.init({
  id: { type: Sequelize.STRING, allowNull: true },
  location_id: { type: Sequelize.INTEGER, allowNull: true },
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
  language_distribution: { type: Sequelize.JSON, allowNull: true }
}, {
  sequelize,
  modelName: 'restaurants_ta'
});

export default RestaurantsTa;
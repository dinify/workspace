import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class Restaurants extends Model {}

Restaurants.init({
  id: { type: Sequelize.STRING, allowNull: true }
}, {
  sequelize,
  modelName: 'restaurants'
});

export default Restaurants;

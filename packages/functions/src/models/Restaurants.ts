import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
import uuidBase62 from 'uuid-base62';
const Model = Sequelize.Model;

class Restaurants extends Model {}

Restaurants.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  subdomain: { type: Sequelize.STRING, allowNull: false },
  price_category: { type: Sequelize.TINYINT, allowNull: true },
  rating: { type: Sequelize.DECIMAL, allowNull: true },
  rating_count: { type: Sequelize.INTEGER, allowNull: true },
  name: { type: Sequelize.STRING, allowNull: true },
  type: {
    type: Sequelize.ENUM,
    values: ['CLASSIC', 'QLESS'],
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    validate: { min: -180, max: 180 }
  },
  published: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
    allowNull: false
  },
  payout: { type: Sequelize.JSON, allowNull: true },
  address: { type: Sequelize.JSON, allowNull: true },
  social: { type: Sequelize.JSON, allowNull: true },
  contact: { type: Sequelize.JSON, allowNull: true },
  settings: { type: Sequelize.JSON, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  tableName: 'restaurants'
});

export default Restaurants;

import Sequelize from 'sequelize';
const sequelize = require('../mysql.config');
const Model = Sequelize.Model;

class ReviewsTa extends Model {}

ReviewsTa.init({
  id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  review_id: { type: Sequelize.STRING, unique: true, allowNull: false },
  location_id: { type: Sequelize.STRING, allowNull: false },
  language: { type: Sequelize.STRING, allowNull: true },
  helpful_votes: { type: Sequelize.NUMBER, allowNull: true },
  published_date: { type: Sequelize.DATE, allowNull: true },
  rating: { type: Sequelize.NUMBER, allowNull: true },
  travel_date: { type: Sequelize.DATE, allowNull: true },
  url: { type: Sequelize.STRING, allowNull: true },
  user: { type: Sequelize.JSON, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'reviews_ta'
});

export default ReviewsTa;

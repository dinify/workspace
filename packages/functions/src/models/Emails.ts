import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class Emails extends Model {}

Emails.init({
  restaurant_id: { type: Sequelize.UUID, allowNull: true },
  email_status: { type: Sequelize.ENUM, allowNull: true },
  criteria: { type: Sequelize.JSON, allowNull: true },
  message: { type: Sequelize.JSON, allowNull: true },
  token: { type: Sequelize.UUID, allowNull: true },
}, {
  sequelize,
  modelName: 'emails'
});

export default Emails;

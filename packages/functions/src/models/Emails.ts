import Sequelize from 'sequelize'
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class Emails extends Model {}

Emails.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },

  target_id: { type: Sequelize.STRING, allowNull: false },
  message_id: { type: Sequelize.STRING, allowNull: true },
  message_key: { type: Sequelize.STRING, allowNull: true },

  type: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default'
  },

  message: { type: Sequelize.JSON, allowNull: false },

  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  tableName: 'emails'
});

export default Emails;

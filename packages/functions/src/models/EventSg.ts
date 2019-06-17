import Sequelize from 'sequelize'
import uuidBase62 from 'uuid-base62';;
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
  email_id: { type: Sequelize.UUID, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  timestamp: { type: Sequelize.DATE, allowNull: false },
  smtp_id: { type: Sequelize.STRING, allowNull: false },
  event: { type: Sequelize.STRING, allowNull: false },
  category: { type: Sequelize.STRING, allowNull: false },
  sg_event_id: { type: Sequelize.STRING, allowNull: false },
  sg_message_id: { type: Sequelize.STRING, allowNull: false },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'events_sg'
});

export default Emails;

import Sequelize from 'sequelize'
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class EventsSg extends Model {}

EventsSg.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  email_id: { type: Sequelize.UUID, allowNull: false },
  message_id: { type: Sequelize.STRING, allowNull: false },

  email: { type: Sequelize.STRING, allowNull: false },
  timestamp: { type: Sequelize.DATE, allowNull: true },
  smtp_id: { type: Sequelize.STRING, allowNull: true },
  event: { type: Sequelize.STRING, allowNull: true },
  category: { type: Sequelize.STRING, allowNull: true },
  sg_event_id: { type: Sequelize.STRING, allowNull: true },
  sg_message_id: { type: Sequelize.STRING, allowNull: true },
  content: { type: Sequelize.JSON, allowNull: true },

  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  tableName: 'events_sg'
});

export default EventsSg;

import Sequelize from 'sequelize';
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class CampaignStatuses extends Model {}

CampaignStatuses.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  target_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default'
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  campaign: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default'
  },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'campaign_statuses'
});

export default CampaignStatuses;

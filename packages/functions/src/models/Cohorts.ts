import Sequelize from 'sequelize';
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class Cohorts extends Model {}

Cohorts.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  filter: { type: Sequelize.JSON, allowNull: false },
  label: { type: Sequelize.STRING, allowNull: false },
  campaign: { type: Sequelize.STRING, allowNull: false },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'cohorts'
});

export default Cohorts;

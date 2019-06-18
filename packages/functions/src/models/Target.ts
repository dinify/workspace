import Sequelize from 'sequelize';
import uuidBase62 from 'uuid-base62';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class Target extends Model {}

Target.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  target_id: { type: Sequelize.UUID, allowNull: false },
  target_type: { type: Sequelize.STRING, allowNull: false },
  cohort_id: { type: Sequelize.UUID, allowNull: false },
  data: { type: Sequelize.JSON, allowNull: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  timestamps: true,
  sequelize,
  modelName: 'targets'
});

export default Target;

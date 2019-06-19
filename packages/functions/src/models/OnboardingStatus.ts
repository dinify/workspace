import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;
import uuidBase62 from 'uuid-base62';

class OnboardingStatus extends Model {}

OnboardingStatus.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidBase62.v4()
  },
  restaurant_id: { type: Sequelize.UUID, allowNull: true },
  status: { type: Sequelize.STRING, allowNull: true }
}, {
  sequelize,
  modelName: 'onboarding_status'
});

export default OnboardingStatus;

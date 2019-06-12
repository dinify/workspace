import Sequelize from 'sequelize';
import sequelize from '../mysql.config';
const Model = Sequelize.Model;

class OnboardingStatus extends Model {}

OnboardingStatus.init({
  restaurant_id: { type: Sequelize.UUID, allowNull: true },
  status: { type: Sequelize.STRING, allowNull: true }
}, {
  sequelize,
  modelName: 'onboarding_status'
});

export default OnboardingStatus;

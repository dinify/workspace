const mongoose = require('mongoose');

const TargetingFlagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
TargetingFlagsSchema.index({ name: 1 }, { unique: true });

const TargetingFlags = mongoose.model('targetingflags', TargetingFlagsSchema);

export default TargetingFlags;

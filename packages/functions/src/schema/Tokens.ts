const mongoose = require('mongoose');

const TokensSchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  token: String
});
TokensSchema.index({ restaurantId: 1 });
TokensSchema.index({ token: 1 }, { unique: true });

const Tokens = mongoose.model('emailtokens', TokensSchema);

export default Tokens;

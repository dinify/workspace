const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
  id: Number,
  lang: String,
  location_id: Number,
  published_date: Date,
  rating: Number,
  helpful_votes: Number,
  url: String,
  travel_date: String,
  text: String,
  user: Object,
  title: String,
  subratings: Array,
  machine_translated: Boolean,
  machine_translatable: Boolean
});
ReviewsSchema.index({ id: 1 }, { unique: true });
ReviewsSchema.index({ location_id: 1 });
ReviewsSchema.index({ text: 'text' });
ReviewsSchema.index({ title: 'text' });
ReviewsSchema.index({ lang: 1 });

const Reviews = mongoose.model('reviews', ReviewsSchema);

module.exports = Reviews;

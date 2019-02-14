import mongoose from 'mongoose';

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
const Reviews = mongoose.model('reviews', ReviewsSchema);

export default Reviews;

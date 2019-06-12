const mongoose = require('mongoose');

const RestaurantsSchema = new mongoose.Schema({
  location_id: Number,
  name: String,
  latitude: Number,
  longitude: Number,
  num_reviews: Number,
  timezone: String,
  location_string: String,
  photo: Object,
  api_detail_url: String,
  awards: Array,
  raw_ranking: Number,
  ranking_geo: String,
  ranking_geo_id: String,
  ranking_position: Number,
  ranking_denominator: Number,
  ranking: String,
  rating: Number,
  price_level: String,
  price: String,
  ride_providers: Array,
  description: String,
  web_url: String,
  ancestors: Array,
  category: Object,
  subcategory: Array,
  parent_display_name: String,
  nearest_metro_station: Array,
  phone: String,
  website: String,
  email: String,
  address_obj: Object,
  address: String,
  hours: Object,
  is_candidate_for_contact_info_suppression: Boolean,
  cuisine: Array,
  dietary_restrictions: Array,
  establishment_types: Array,
  langDist: Object,
  langGroups: Object,
  targetLang: Number,
  targetLangRel: Number,

  targetingFlags: {
    type: Array,
    default: []
  },
  emailStatuses: {
    type: Array,
    default: [] // array of objects {event, timestamp}
  },
  emailStatus: {
    type: String,
    enum : [
      'null',
      'processed',
      'dropped',
      'delivered',
      'deferred',
      'bounce',
      'open',
      'click',
      'spamreport',
      'unsubscribe',
      'group_unsubscribe',
      'group_resubscribe'
    ],
    default: 'null'
  },
  onboardingStatus: {
    type: String,
    enum : [
      'null',
      'landed',
      'signedup',
      'registered'
    ],
    default: 'null'
  }
});
RestaurantsSchema.index({ location_id: 1 }, { unique: true });
RestaurantsSchema.index({ name: 'text' });
RestaurantsSchema.index({ num_reviews: -1 });
RestaurantsSchema.index({ num_reviews: -1, _id: 1 });
RestaurantsSchema.index({ targetLang: -1 });
RestaurantsSchema.index({ targetLangRel: -1 });
RestaurantsSchema.index({ ranking_geo: 1 });
RestaurantsSchema.index({ 'langDist.ja.count': -1 });
RestaurantsSchema.index({ 'langDist.ko.count': -1 });
RestaurantsSchema.index({ 'langDist.zhCN.count': -1 });
RestaurantsSchema.index({ 'langDist.zhTW.count': -1 });
RestaurantsSchema.index({ 'langDist.ru.count': -1 });
RestaurantsSchema.index({ 'langDist.it.count': -1 });
RestaurantsSchema.index({ 'langDist.es.count': -1 });
RestaurantsSchema.index({ 'langDist.fr.count': -1 });
RestaurantsSchema.index({ 'langDist.tr.count': -1 });

RestaurantsSchema.index({ 'langGroups.eastAsia.countRel': -1 });

const Restaurants = mongoose.model('restaurants', RestaurantsSchema);


export default Restaurants;

import mongoconnect from '../mongo.config';
import Restaurants from '../schema/Restaurants';

Restaurants.create({email: "example@test.com"}, (e) => {
    console.log(e, 'ok')
})
import { Get, Post, PostMultipart } from './Network';

export function RegisterUser({ name, phone, email, password }) {
  return Post(
    {
      path: 'user/register',
      noToken: true,
      v3: true,
    },
    {
      email,
      password,
      name,
      phone,
      gender: 'OTHER',
      birth_date: '1990-01-01',
      registration_type: 'LOCAL',
    },
  );
}
export function LoginUser({ email, password }) {
  return Post(
    {
      path: 'user/login',
      noToken: true,
      v3: true,
    },
    {
      email,
      password,
    },
  );
}
export function CreateRestaurant({ restaurantName, subdomain }) {
  return Post(
    {
      path: 'restaurant/create',
      v3: true,
    },
    {
      name: restaurantName,
      subdomain,
    },
  );
}

export function GetLoggedRestaurant({id}) {
  return Get({ path: `restaurant/${id}/all?with=images,services.image,waiterboards.tables,categories.items.images,categories.items.addons,categories.items.ingredients,categories.items.options,addons.price,ingredients,options.choices.difference`, v3: true });
}

export function ChangeCategory({ category }) {
  return Post(
    { path: `restaurant/my`, v3: true },
    {
      type: category,
    },
  );
}

export function ChangeName({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}`, v3: true }, { name });
}

export function ChangeContact({ phone, email, website }) {
  return Post(
    { path: `restaurant/my`, v3: true },
    {
      contact: {
        phone,
        email,
        website,
      },
    },
  );
}

export function ChangeBank({ bank_name, beneficiary_name, iban, bic }) {
  return Post(
    { path: `restaurant/my/payout`, v3: true },
    {
      bank_name,
      beneficiary_name,
      iban,
      bic,
    },
  );
}

export function ChangeAddress(payload) {
  delete payload.restaurantId;
  return Post(
    { path: `restaurant/my`, v3: true },
    {
      address: {
        business: { ...payload },
      },
    },
  );
}

export function ChangeSocial({ facebook, instagram }) {
  return Post(
    { path: `restaurant/my`, v3: true },
    {
      social: {
        facebook,
        instagram,
      },
    },
  );
}

export function ChangeLocation({ longitude, latitude }) {
  return Post(
    { path: `restaurant/my`, v3: true },
    {
      longitude: longitude,
      latitude: latitude,
    },
  );
}

export function ChangeHours(payload) {
  delete payload['restaurantId'];
  const openHours = payload;
  return Post({ path: `restaurant/my`, v3: true }, { open_hours: openHours });
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateWaiterboard({ name }) {
  return Post({ path: `waiterboard/create`, v3: true }, { name });
}

export function DeleteWaiterboard({ id }) {
  return Post({ path: `waiterboard/${id}/delete`, v3: true }, { id });
}

export function CreateTable({ number, capacity, waiterboardId, x, y }) {
  return Post(
    { path: `waiterboard/${waiterboardId}/table/add`, v3: true },
    { number, capacity, x, y },
  );
}
export function ChangeTable({ id, x, y }) {
  return Post({ path: `table/${id}`, v3: true }, { x, y });
}

export function DeleteTable({ id }) {
  return Post({ path: `table/${id}/delete`, v3: true });
}

export function GetBills({ from, to }) {
  return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to });
}

export function GetCategories() {
  return Get({ path: `restaurant/my/categories`, v3: true });
}
export function CreateMenucategory({ name, precedence }) {
  return Post({ path: `menu/category/create`, v3: true }, { name, precedence });
}
export function ChangeMenucategory(payload) {
  const { id } = payload;
  delete payload.restaurantId;
  delete payload.id;
  return Post({ path: `menu/category/${id}`, v3: true }, payload);
}
export function DeleteMenucategory({ id }) {
  return Post({ path: `menu/category/${id}/delete`, v3: true });
}

export function CreateMenuitem({ name, precedence, categoryId }) {
  return Post(
    { path: `menu/category/${categoryId}/item/add`, v3: true },
    {
      name,
      precedence,
      price: {
        amount: 2,
        currency: 'KWD',
      },
    },
  );
}
export function ChangeMenuitem(payload) {
  const id = payload.id;
  let updObj = payload;
  delete updObj.id;
  //updObj = R.filter(R.identity)(updObj);
  return Post({ path: `menu/item/${id}`, v3: true }, updObj);
}
export function DeleteMenuitem({ id }) {
  return Post({ path: `menu/item/${id}/delete`, v3: true });
}

export function GetServiceimages() {
  return Get({ path: `service/images?limit=200`, v3: true });
}

export function CreateService({ name, imageId, type }) {
  return Post(
    { path: `service/create`, v3: true },
    { name, image_id: imageId, type },
  );
}

export function DeleteService({ id }) {
  return Post({ path: `service/${id}/delete`, v3: true });
}

export function ChangeNutrition({ foodId, total, proteins, fats, carbs }) {
  return Post(
    { path: `menu/item/${foodId}`, v3: true },
    {
      calories: {
        total,
        proteins,
        fats,
        carbs,
      },
    },
  );
}

export function ToggleCategory({ categoryId, enabled }) {
  return Post(
    { path: `menu/category/${categoryId}`, v3: true },
    { published: enabled },
  );
}
export function ToggleFood({ foodId, enabled }) {
  return Post(
    { path: `menu/item/${foodId}`, v3: true },
    { published: enabled },
  );
}

export function GetAddons() {
  return Get({ path: `restaurant/my/addons`, v3: true });
}

export function CreateAddon({ name, price }) {
  return Post({ path: `menu/addon/create`, v3: true }, {
    name,
    price: {
      amount: price,
      currency: 'KWD'
    }
  });
}

export function DeleteAddon({ id }) {
  return Post({ path: `menu/addon/${id}/delete`, v3: true });
}

export function CreateIngredient({ name }) {
  return Post({ path: `menu/ingredient/create`, v3: true }, { name });
}

export function ChangeIngredient(payload) {
  const id = payload.id;
  delete payload.id;
  return Post({ path: `menu/ingredient/${id}`, v3: true }, payload);
}

export function DeleteIngredient({ id }) {
  return Post({ path: `menu/ingredient/${id}/delete`, v3: true });
}

export function CreateOption({ name }) {
  return Post({ path: `menu/option/create`, v3: true }, { name });
}

export function DeleteOption({ id }) {
  return Post({ path: `menu/option/${id}/delete`, v3: true });
}

export function CreateChoice({ name, price, optionId }) {
  return Post(
    { path: `menu/option/${optionId}/choice/add`, v3: true },
    {
      name,
      difference: {
        amount: price,
        currency: "KWD"
      }
    },
  );
}

export function DeleteChoice({ id }) {
  return Post({ path: `menu/choice/${id}/delete`, v3: true });
}

export function ChangeItemimage({ file, id }) {
  return PostMultipart(
    { path: `menu/item/${id}/image/upload`, v3: true },
    { image: file },
  );
}

export function ChangeImage({ file }) {
  return PostMultipart(
    { path: `restaurant/my/image/upload`, v3: true },
    { image: file },
  );
}

export function EditImage({ id, precedence, published }) {
  return Post({ path: `image/${id}`, v3: true }, { precedence, published });
}

export function ChangeFoodingredient({ foodId, ingredients }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, { ingredients });
}

export function GetTranslations({ locale } = {}) {
  if (locale) return Get({ path: `translation/list/${locale}`, v3: true });
  return Get({ path: 'translation/list', v3: true });
}

export function AddTranslation({ type, id, locale, name, description }) {
  return Post({ path: 'translation/add', v3: true }, { type, id, locale, name, description });
}

export function RmTranslation({ type, id, locale }) {
  return Post({ path: 'translation/remove', v3: true }, { type, id, locale });
}

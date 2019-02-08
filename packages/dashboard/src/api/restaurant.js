import { Get, Post, PostMultipart } from '@dinify/common/dist/api/Network';

export function RegisterUser({ name, phone, email, password }) {
  return Post(
    {
      path: 'user/register',
      noToken: true,
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
      path: 'restaurant/create'
    },
    {
      name: restaurantName,
      subdomain,
    },
  );
}

export function GetLoggedRestaurant({id}) {
  return Get({ path: `restaurant/${id}/all?with=images,services.image,waiterboards.tables,categories.items.images,categories.items.addons,categories.items.ingredients,categories.items.options,addons.price,ingredients,options.choices.difference` });
}

export function ChangeCategory({ category }) {
  return Post(
    { path: `restaurant/my`},
    {
      type: category,
    },
  );
}

export function ChangeName({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}`}, { name });
}

export function ChangeContact({ phone, email, website }) {
  return Post(
    { path: `restaurant/my`},
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
    { path: `restaurant/my/payout` },
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
    { path: `restaurant/my` },
    {
      address: {
        business: { ...payload },
      },
    },
  );
}

export function ChangeSocial({ facebook, instagram }) {
  return Post(
    { path: `restaurant/my` },
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
    { path: `restaurant/my` },
    {
      longitude: longitude,
      latitude: latitude,
    },
  );
}

export function ChangeHours(payload) {
  delete payload['restaurantId'];
  const openHours = payload;
  return Post({ path: `restaurant/my` }, { open_hours: openHours });
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateWaiterboard({ name }) {
  return Post({ path: `waiterboard/create` }, { name });
}

export function DeleteWaiterboard({ id }) {
  return Post({ path: `waiterboard/${id}/delete` }, { id });
}

export function CreateTable({ number, capacity, waiterboardId, x, y }) {
  return Post(
    { path: `waiterboard/${waiterboardId}/table/add` },
    { number, capacity, x, y },
  );
}
export function ChangeTable({ id, x, y }) {
  return Post({ path: `table/${id}` }, { x, y });
}

export function DeleteTable({ id }) {
  return Post({ path: `table/${id}/delete` });
}

// export function GetBills({ from, to }) {
//   return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to });
// }

export function GetCategories() {
  return Get({ path: `restaurant/my/categories` });
}
export function CreateMenucategory({ name, precedence }) {
  return Post({ path: `menu/category/create` }, { name, precedence });
}
export function ChangeMenucategory(payload) {
  const { id } = payload;
  delete payload.restaurantId;
  delete payload.id;
  return Post({ path: `menu/category/${id}` }, payload);
}
export function DeleteMenucategory({ id }) {
  return Post({ path: `menu/category/${id}/delete` });
}

export function CreateMenuitem({ name, precedence, categoryId }) {
  return Post(
    { path: `menu/category/${categoryId}/item/add` },
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
  return Post({ path: `menu/item/${id}` }, updObj);
}
export function DeleteMenuitem({ id }) {
  return Post({ path: `menu/item/${id}/delete` });
}

export function GetServiceimages() {
  return Get({ path: `service/images?limit=200` });
}

export function CreateService({ name, imageId, type }) {
  return Post(
    { path: `service/create` },
    { name, image_id: imageId, type },
  );
}

export function DeleteService({ id }) {
  return Post({ path: `service/${id}/delete` });
}

export function ChangeNutrition({ foodId, total, proteins, fats, carbs }) {
  return Post(
    { path: `menu/item/${foodId}` },
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
    { path: `menu/category/${categoryId}` },
    { published: enabled },
  );
}
export function ToggleFood({ foodId, enabled }) {
  return Post(
    { path: `menu/item/${foodId}` },
    { published: enabled },
  );
}

export function GetAddons() {
  return Get({ path: `restaurant/my/addons` });
}

export function CreateAddon({ name, price }) {
  return Post({ path: `menu/addon/create` }, {
    name,
    price: {
      amount: price,
      currency: 'KWD'
    }
  });
}

export function DeleteAddon({ id }) {
  return Post({ path: `menu/addon/${id}/delete` });
}

export function CreateIngredient({ name }) {
  return Post({ path: `menu/ingredient/create` }, { name });
}

export function ChangeIngredient(payload) {
  const id = payload.id;
  delete payload.id;
  return Post({ path: `menu/ingredient/${id}` }, payload);
}

export function DeleteIngredient({ id }) {
  return Post({ path: `menu/ingredient/${id}/delete` });
}

export function CreateOption({ name }) {
  return Post({ path: `menu/option/create` }, { name });
}

export function DeleteOption({ id }) {
  return Post({ path: `menu/option/${id}/delete` });
}

export function CreateChoice({ name, price, optionId }) {
  return Post(
    { path: `menu/option/${optionId}/choice/add` },
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
  return Post({ path: `menu/choice/${id}/delete` });
}

export function ChangeItemimage({ file, id }) {
  return PostMultipart(
    { path: `menu/item/${id}/image/upload` },
    { image: file },
  );
}

export function ChangeImage({ file }) {
  return PostMultipart(
    { path: `restaurant/my/image/upload` },
    { image: file },
  );
}

export function EditImage({ id, precedence, published }) {
  return Post({ path: `image/${id}` }, { precedence, published });
}

export function ChangeFoodingredient({ foodId, ingredients }) {
  return Post({ path: `menu/item/${foodId}` }, { ingredients });
}

export function GetTranslations({ locale } = {}) {
  if (locale) return Get({ path: `translation/list/${locale}` });
  return Get({ path: 'translation/list' });
}

export function AddTranslation({ type, id, locale, name, description }) {
  return Post({ path: 'translation/add' }, { type, id, locale, name, description });
}

export function RmTranslation({ type, id, locale }) {
  return Post({ path: 'translation/remove' }, { type, id, locale });
}

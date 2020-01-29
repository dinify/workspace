export const getActionsFromModel = (modelPrefix: string, model: any) => {
  const actions: any = {};
  Object.keys(model.reducers).map(reducerName => {
    actions[reducerName] = (payload: any) => ({
      type: `${modelPrefix}/${reducerName}`,
      payload
    });
  });
  return actions;
}
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useDispatch } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddCircle from '@material-ui/icons/AddCircleRounded';
import RemoveCircle from '@material-ui/icons/RemoveCircleRounded';
import { excludeIngredient } from '../../../ducks/menuItem/actions';
import { useIngredientView } from '../../../ducks/ingredient/selectors';

export default ({ menuItemId }: { menuItemId: string }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ingredients = useIngredientView(menuItemId);

  return (
    <div>
      <Typography style={{ marginTop: 32 }} color="primary" variant="overline">
        {t('ingredients')}
      </Typography>
      {ingredients.map(ingredient => {
        return (
          <div key={ingredient.id} style={{ width: '100%' }}>
            <ButtonBase
              style={{ borderRadius: 4, width: '100%' }}
              disabled={!ingredient.excludable}
              onClick={() => {
                dispatch(
                  excludeIngredient({
                    menuItemId,
                    ingredientId: ingredient.id,
                    excluded: !ingredient.excluded,
                  }),
                );
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  width: '100%',
                }}
              >
                <Typography
                  color={ingredient.excluded ? 'textSecondary' : 'default'}
                  style={{
                    flex: 1,
                    textAlign: 'start',
                    paddingLeft: 16,
                    textDecoration: ingredient.excluded
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {ingredient.name}
                </Typography>
                {ingredient.excludable ? (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 8,
                      padding: 8,
                    }}
                  >
                    {ingredient.excluded ? (
                      <AddCircle color="action" />
                    ) : (
                      <RemoveCircle color="action" />
                    )}
                  </div>
                ) : (
                  <div style={{ height: 40 }} />
                )}
              </div>
            </ButtonBase>
          </div>
        );
      })}
    </div>
  );
};

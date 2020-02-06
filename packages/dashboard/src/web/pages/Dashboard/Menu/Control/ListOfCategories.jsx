import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Translation from 'web/components/Translation';
import { getDefaultLanguage } from 'features/restaurant/selectors';

import {
  selectCategoryAction,
} from 'features/restaurant/actions';

import {
  fetchMenuCategoriesAsync,
  createMenuCategoryAsync,
  updateMenuCategoryAsync,
  removeMenuCategoryAsync,
  reorderCategoriesAsync
} from 'features/menuCategory/actions.ts';
import { relevantCategoriesList } from 'features/menuCategory/selectors';

const ToggleContainer = styled.div`
  position: absolute;
  right: 0;
  top: -7px;
  * {
    color: white !important;
  }
`;
const BinContainer = styled.div`
  position: absolute;
  right: 30px;
  top: -7px;
  * {
    color: white !important;
  }
`;

const CategoryItem = styled.div`
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: 300;
  background-color: ${p => {
    if (p.disabled) return p.selected ? 'rgb(30, 30, 50)' : '#7899b2';
    return p.selected ? 'rgb(0, 20, 50)' : 'rgb(53, 75, 92)';
  }};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    i {
      color: white;
    }
  }
`;

let CreateCategoryForm = ({ handleSubmit, progress, errorMessage }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl
        error={progress === 'ERROR'}
        aria-describedby="name-error-text"
        fullWidth
      >
        <Grid container spacing={0} alignItems="flex-end" justify="center">
          <Grid item xs={10}>
            <Field
              name="name"
              component={Text}
              componentProps={{
                style: {whiteSpace: 'nowrap'},
                label: t('menu.newCategoryName'),
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: t('menu.newCategoryPlaceholder')
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip placement="top" title={t('menu.addCategory')}>
              <IconButton type="submit" aria-label={t('menu.addCategory')}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {progress === 'ERROR' ? (
          <FormHelperText>{errorMessage}</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>
    </form>
  );
};

CreateCategoryForm = reduxForm({
  form: 'menu/createCategory',
})(CreateCategoryForm);

const SortableItem = SortableElement(
  ({
    category,
    selectedCategoryId,
    selectCategory,
    updateCategory,
    deleteCategory,
    t,
  }) => (
    <CategoryItem
      selected={category.id === selectedCategoryId}
      disabled={!category.published}
      onClick={() => selectCategory({ categoryId: category.id })}
    >
      <Translation object={category} />
      <BinContainer>
        {!category.published ? (
          <Tooltip placement="left" title={t('delete')}>
            <IconButton
              aria-label={t('delete')}
              onClick={() => deleteCategory({ id: category.id })}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </BinContainer>
      <ToggleContainer category>
        <Tooltip
          placement="left"
          title={category.published ? t('published') : t('unpublished')}
        >
          <Checkbox
            checkedIcon={<Visibility />}
            icon={<VisibilityOff />}
            color="primary"
            defaultChecked={category.published}
            onChange={(o, checked) =>
              updateCategory({ id: category.id, published: checked })
            }
          />
        </Tooltip>
      </ToggleContainer>
    </CategoryItem>
  ),
);

const SortableList = SortableContainer(({ categories, deps }) => {
  const { t } = useTranslation();
  return (
    <div>
      {categories.map((category, index) => (
        <SortableItem
          key={`menucategory-${index}-${category.id}`}
          t={t}
          index={index}
          category={category}
          {...deps}
        />
      ))}
    </div>
  );
});

const ListOfCategories = ({
  fetchCategories,
  categoriesList,
  selectedCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
  selectCategory,
  reorderCategories,
  progressMap,
  errorsMap,
  lang
}) => {

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <CreateCategoryForm
            progress={progressMap.CREATE_MENUCATEGORY}
            errorMessage={errorsMap.CREATE_MENUCATEGORY}
            onSubmit={({ name }) => {
              createCategory({
                name,
                precedence: categoriesList.length,
                form: 'menu/createCategory'
              });
            }}
          />
        </CardContent>
      </Card>
      <SortableList
        distance={1}
        axis="y"
        lockAxis="y"
        categories={categoriesList}
        onSortEnd={({ oldIndex, newIndex }) => {
          reorderCategories(arrayMove(categoriesList, oldIndex, newIndex));
        }}
        deps={{
          selectedCategoryId,
          selectCategory,
          updateCategory,
          deleteCategory,
          lang
        }}
      />
    </div>
  );
};

export default connect(
  state => ({
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
    lang: getDefaultLanguage(state),
    categoriesList: relevantCategoriesList(state)
  }),
  {
    fetchCategories: fetchMenuCategoriesAsync.request,
    createCategory: createMenuCategoryAsync.request,
    updateCategory: updateMenuCategoryAsync.request,
    deleteCategory: removeMenuCategoryAsync.request,
    reorderCategories: reorderCategoriesAsync.request,
    selectCategory: selectCategoryAction,
  },
)(ListOfCategories);

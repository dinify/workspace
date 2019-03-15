// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateNameInitAction } from 'ducks/restaurant/actions';
import { createServiceInit, removeServiceInit } from 'ducks/service/actions';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import * as FN from 'lib/FN';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

let TagForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Text}
        componentProps={{
          label: 'Service name',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Button type="submit" fullWidth={true}>
        ADD
      </Button>
    </form>
  );
};
TagForm = reduxForm({
  form: 'settings/tag',
  //  enableReinitialize: true
})(TagForm);

const Tags = ({
  createService,
  removeService,
  tags,
}) => {
  const tagsList = FN.MapToList(tags).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <FormBox>
      <FormBoxHead>
        <span>Tags</span>
        <Progress type={'UPDATE_TAGS'} />
      </FormBoxHead>
      <FormBoxBody material>
        {tagsList.map(tag => (
          <Chip
            avatar={
              <Avatar
                src={
                  tag.image
                    ? tag.image.url.replace('https', 'http')
                    : ''
                }
              />
            }
            key={tag.id}
            label={tag.name}
            style={{ margin: '5px' }}
            onDelete={() => removeService({ id: tag.id })}
          />
        ))}
        <TagForm
          onSubmit={({ name }) =>
            createService({
              name,
              imageId: '6aa20d72-b3be-449d-8391-4e5c268b1b83',
            })
          }
        />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(
  state => ({
  }),
  {
    updateName: updateNameInitAction,
    createService: createServiceInit,
    removeService: removeServiceInit,
  },
)(Tags);

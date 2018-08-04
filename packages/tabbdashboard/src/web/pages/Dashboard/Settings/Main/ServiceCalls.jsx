// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateNameInitAction } from 'ducks/restaurantLegacy';
import { createServiceInit, removeServiceInit } from 'ducks/service/actions';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import * as FN from 'lib/FN';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

let ServiceForm = ({ handleSubmit }) => {
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
ServiceForm = reduxForm({
  form: 'settings/service',
  //  enableReinitialize: true
})(ServiceForm);

const ServiceCalls = ({
  createService,
  removeService,
  services,
}) => {
  const servicesList = FN.MapToList(services).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <FormBox>
      <FormBoxHead>
        <span>Service calls</span>
        <Progress type={'UPDATE_TAGS'} />
      </FormBoxHead>
      <FormBoxBody material>
        {servicesList.map(service => (
          <Chip
            avatar={
              <Avatar
                src={
                  service.image
                    ? service.image.url.replace('https', 'http')
                    : ''
                }
              />
            }
            key={service.id}
            label={service.name}
            style={{ margin: '5px' }}
            onDelete={() => removeService({ id: service.id })}
          />
        ))}
        <ServiceForm
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
    services: state.service.all,
  }),
  {
    updateName: updateNameInitAction,
    createService: createServiceInit,
    removeService: removeServiceInit,
  },
)(ServiceCalls);

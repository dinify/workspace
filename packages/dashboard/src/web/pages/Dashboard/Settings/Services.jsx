// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Label
} from 'web/components/styled/FormBox';
import { updateNameInitAction } from 'ducks/restaurantLegacy';
import { createServiceInit, removeServiceInit } from 'ducks/service/actions';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import * as FN from 'lib/FN';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import R from 'ramda';

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

class ServiceCalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedType: 'TABLEWARE' // CONDIMENT
    };
  }
  render() {
    const {
      createService,
      removeService,
      services,
      images
    } = this.props;
    const servicesList = FN.MapToList(services).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const getImageUrl = (service) => {
      const img = R.find(R.propEq('id', service.image_id))(images);
      if (img) return img.url;
      return service.image.url;
    }
    const filteredImages = R.filter((img) => {
      if (this.state.selectedType === 'TABLEWARE') return img.item_type === `Internal\\Service\\Tableware`;
      return img.item_type === 'Internal\\Service\\Condiments';
    }, images);
    return (
      <div>
          <Label className="center" style={{margin: '20px 0 15px'}}>TABLEWARE</Label>
          {R.filter((s) => s.type === 'TABLEWARE', servicesList).map(service => (
            <Chip
              avatar={
                <Avatar
                  src={getImageUrl(service)}
                />
              }
              key={service.id}
              label={service.name}
              style={{ margin: '5px' }}
              onDelete={() => removeService({ id: service.id })}
            />
          ))}
          <Divider style={{ margin: 6 }}/>
          <Label className="center" style={{margin: '20px 0 15px'}}>CONDIMENTS</Label>
          {R.filter((s) => s.type === 'CONDIMENT', servicesList).map(service => (
            <Chip
              avatar={
                <Avatar
                  src={getImageUrl(service)}
                />
              }
              key={service.id}
              label={service.name}
              style={{ margin: '5px' }}
              onDelete={() => removeService({ id: service.id })}
            />
          ))}
          <Divider style={{ margin: 8 }}/>
          <div>
            <center>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedType === 'TABLEWARE'}
                  onChange={() => this.setState({ selectedType: 'TABLEWARE' })}
                  value="a"
                  name="radio-button-demo"
                  aria-label="A"
                />
              }
              label="Tableware"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedType === 'CONDIMENT'}
                  onChange={() => this.setState({ selectedType: 'CONDIMENT' })}
                  value="b"
                  name="radio-button-demo"
                  aria-label="B"
                />
              }
              label="Condiment"
              labelPlacement="end"
            />
          </center>
          </div>
          <Label className="center">SELECT SERVICE ICON</Label>
          <div style={{marginTop: 8}}>
            {filteredImages.map((image) =>
              <Avatar
                style={{
                  display: 'inline-block',
                  margin: '5px',
                  height: 80,
                  width: 80,
                  cursor: 'pointer',
                  border: this.state.selectedImage === image.id ? '3px solid red' : 'none'
                }}
                onClick={() => this.setState({ selectedImage: image.id })}
                src={image.url}
              />
            )}
          </div>
          <ServiceForm
            onSubmit={({ name }) =>
              createService({
                name,
                imageId: this.state.selectedImage || '587334ad-91f4-4179-8bd8-39b0abb1390c',
                type: this.state.selectedType
              })
            }
          />
        </div>
    );
  }
}


export default connect(
  state => ({
    services: state.service.all,
    images: state.service.images
  }),
  {
    updateName: updateNameInitAction,
    createService: createServiceInit,
    removeService: removeServiceInit,
  },
)(ServiceCalls);

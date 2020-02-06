import React from 'react';
import filter from 'ramda/es/filter';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import Avatar from '@material-ui/core/Avatar';
import { createServiceInit } from 'features/service/actions';
import ServiceForm from 'web/components/ServiceForm';
import { getDefaultLanguage } from 'features/restaurant/selectors';

class AddServiceComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  render() {
    const { images, createService, serviceType, t, defaultLanguage, selectedRestaurant } = this.props;
    const { selectedImage } = this.state;

    const filteredImages = filter((img) => {
      if (serviceType === 'TABLEWARE') return img.itemType === `Internal\\Service\\Tableware`;
      return img.itemType === 'Internal\\Service\\Condiments';
    }, images);

    return (<>
      <Label className="center">{t('selectServiceIcon')}</Label>
      <div style={{marginTop: 8}}>
        {filteredImages.map((image) =>
          <div key={image.id} style={{
            display: 'inline-block',
            border: '1px solid white',
            borderColor: selectedImage === image.id ? 'rgba(0,0,0,0.1)' : 'transparent',
            background: selectedImage === image.id ? 'rgb(60,60,60)': 'white',
            borderRadius: 10,
            transition: 'all 200ms ease-in-out'
          }}>
            <Avatar
              style={{
                display: 'inline-block',
                margin: '5px',
                height: 60,
                width: 60,
                cursor: 'pointer',
              }}
              onClick={() => this.setState({ selectedImage: image.id })}
              src={image.url}
            />
          </div>
        )}
      </div>
      <ServiceForm
        t={t}
        onSubmit={({ name }) => {
          createService({
            name,
            restaurantId: selectedRestaurant,
            imageId: selectedImage,
            type: serviceType,
            locale: defaultLanguage
          });
          this.setState({ selectedImage: null });
        }}
      />
    </>);
  }
}

export default connect(
  (state) => ({
    images: state.service.images,
    defaultLanguage: getDefaultLanguage(state),
    selectedRestaurant: state.restaurant.selectedRestaurant
  }), {
    createService: createServiceInit,
  }
)(AddServiceComponent);
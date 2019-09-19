import React from 'react';
import filter from 'ramda/es/filter';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import Avatar from '@material-ui/core/Avatar';
import { createServiceInit } from 'ducks/service/actions';
import ServiceForm from 'web/components/ServiceForm';

class AddServiceComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  render() {
    const { images, createService, serviceType, t } = this.props;
    const { selectedImage } = this.state;

    const filteredImages = filter((img) => {
      if (serviceType === 'TABLEWARE') return img.item_type === `Internal\\Service\\Tableware`;
      return img.item_type === 'Internal\\Service\\Condiments';
    }, images);

    return (<div>
      <Label className="center">{t('selectServiceIcon')}</Label>
      <div style={{marginTop: 8}}>
        {filteredImages.map((image) =>
          <Avatar
            key={image.id}
            style={{
              display: 'inline-block',
              margin: '5px',
              height: 60,
              width: 60,
              cursor: 'pointer',
              border: selectedImage === image.id ? '3px solid red' : 'none'
            }}
            onClick={() => this.setState({ selectedImage: image.id })}
            src={image.url}
          />
        )}
      </div>
      <ServiceForm
        t={t}
        onSubmit={({ name }) =>
          createService({
            name,
            imageId: selectedImage || '587334ad-91f4-4179-8bd8-39b0abb1390c',
            type: serviceType
          })
        }
      />
    </div>
    );
  }
}

export default connect(
  (state) => ({
    images: state.service.images
  }), {
    createService: createServiceInit,
  }
)(AddServiceComponent);
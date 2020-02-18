import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { Aspect, Image } from 'web/components/image';
import comparator from 'ramda/es/comparator';
import { CLDR, UnitFormatOptions } from '@phensley/cldr';
import { UnitType } from '@phensley/cldr-types';
import { RestaurantView } from 'features/restaurant/selectors';

const distanceFormatter = (cldr: CLDR) => (m: number, options?: UnitFormatOptions) => {
  let value = m;
  let unit: UnitType = 'meter';
  if (!m) return '';
  if (m >= 1000) {
    value = m / 1000;
    unit = 'kilometer';
  }
  return cldr.Units.formatQuantity(
    { value, unit, ...options },
    {
      length: 'short',
      maximumFractionDigits: 1,
    },
  );
};

export interface RestaurantListItemProps {
  restaurant: RestaurantView
}

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({ restaurant }) => {
  const cldr = useIntl(ctx => ctx.state.cldr);
  const firstImage = restaurant.images.sort(comparator((a, b) => a.precedence < b.precedence))[0].url;
  const allTags: any[] = [] // FN.MapToList(restaurant.tags);
  const tags: any[] = [];
  allTags.forEach(tag => {
    if (tags.join().length + tag.name.length <= 25) {
      tags.push(tag.name.split('_').join(' '));
    }
  });

  const format = distanceFormatter(cldr);
  return (
    <Link
      to={`/restaurant/${restaurant.subdomain}`}
      style={{
        textDecoration: 'none',
        width: '100%',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div style={{ width: '100%' }}>
        <Aspect style={{
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Image alt={restaurant.name} style={{ width: '100%', height: '100%' }} url={firstImage} />
        </Aspect>
        {tags && (
          <Typography
            gutterBottom
            variant="overline"
            color="primary"
          >
            {tags.join(' • ')}
          </Typography>
        )}
        <Typography variant="h6">{restaurant.name}</Typography>
        <Typography
          style={{ marginTop: 8 }}
          variant="caption"
          color="textSecondary"
        >
          {format(restaurant.distance)}
        </Typography>
        {/* <Typography >{restaurant.description}</Typography> */}
      </div>
    </Link>
  );
};

export default RestaurantListItem;

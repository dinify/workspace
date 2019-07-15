
// TODO: ccode split into separate bundles
// come up with a more dynamic solution (?)


import csApp from './cs/app.json';
import csCommon from './cs/common.json';
import csDashboard from './cs/dashboard.json';
import csLanding from './cs/landing.json';

import enApp from './en/app.json';
import enCommon from './en/common.json';
import enDashboard from './en/dashboard.json';
import enLanding from './en/landing.json';

export default {
  'cs': {
    app: csApp,
    common: csCommon,
    dashboard: csDashboard,
    landing: csLanding
  },
  'en': {
    app: enApp,
    common: enCommon,
    dashboard: enDashboard,
    landing: enLanding
  }
}

import { select } from '@dinify/common/src/lib/platform';

export type TransitionType = 'lateral'|'forward';
export interface TransitionSpec {
  lateral: any
};

export const spec: TransitionSpec = {
  lateral: select({
    standard: {
      from:  { transform: 'translate(0, 8px)', opacity: 0 },
      enter: { transform: 'translate(0,   0px)', opacity: 1 },
      leave: { transform: 'translate(0, 8px)', opacity: 0 },
      config: {
        tension: 300,
        friction: 26
      }
    },
    ios: {}
  })
};
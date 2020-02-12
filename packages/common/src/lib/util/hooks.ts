import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import toPairs from 'ramda/es/toPairs';
import comparator from 'ramda/es/comparator';

export function useAction<T>(actionCreator: (payload: T) => void) {
  const dispatch = useDispatch();
  return (payload: T) => dispatch(actionCreator(payload));
}

export interface BreakpointCategories<T> {
  xs: T,
  sm: T,
  md: T,
  lg: T,
  xl: T
};

export function useStandardBreakpoints<T>(config: Partial<BreakpointCategories<T>>): { match: string, value: T } {
  const lut: any = {
    0: 'xs',
    600: 'sm',
    1024: 'md',
    1440: 'lg',
    1920: 'xl'
  };
  const match = useBreakpoints({
    0: config.xs,
    600: config.sm,
    1024: config.md,
    1440: config.lg,
    1920: config.xl
  });
  return { match: lut[match[0]], value: match[1] as T };
}

export function useBreakpoints<T>(config: { 0: T, [key: number]: T }): [number, T] {
  const [match, setMatch] = useState<[number, T]>([0, config[0]]);
  const listener = () => {
    const w = window.innerWidth;
    const breakpoints = toPairs(config)
      .map(([k, v]) => [Number.parseInt(k), v])
      .sort(comparator((a, b) => a[0] < b[0]));
    const currentMatch = breakpoints.find(([br, _], i) => {
      if (i < breakpoints.length - 1) {
        return w >= br && w < breakpoints[i + 1][0];
      }
      return w >= br;
    });
    if (currentMatch && currentMatch[0] !== match[0]) {
      setMatch(currentMatch as [number, T]);
    }
  };
  useEffect(() => {
    listener();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  return match;
}
declare module '@goodhood/map' {
  import { ReactNode } from 'react';

  export interface MapProps {
    attribution: 'default' | 'hidden' | 'compact';
    children?: ReactNode;
    className?: string;
    credentials: {
      key: string;
      map_id: string;
    };
    locked?: boolean;
    lockedMobile?: boolean;
  }

  export const EyecatcherMarker: React.ComponentType<{
    children?: ReactNode;
    className?: string;
    options?: {
      zIndexOffset: number;
    };
    position: number[];
  }>;

  export const InfoMarker: React.ComponentType<{
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    position: number[];
    small?: boolean;
  }>;

  export const Map: React.ComponentType<MapProps>;

  export const POLYGON_ACTIVE: string;
  export const POLYGON_SOLID: string;

  export const Polygon: React.ComponentType<{
    area: [number, number][];
    type: string;
  }>;
}

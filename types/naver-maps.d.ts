export {};

declare global {
  interface Window {
    naver?: {
      maps: {
        Event: {
          addListener: (target: unknown, eventName: string, listener: () => void) => void;
        };
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          element: HTMLElement,
          options: {
            center: unknown;
            zoom: number;
            minZoom?: number;
            mapTypeControl?: boolean;
            scaleControl?: boolean;
            logoControl?: boolean;
            mapDataControl?: boolean;
            zoomControl?: boolean;
            zoomControlOptions?: unknown;
          }
        ) => {
          setCenter: (latlng: unknown) => void;
          setZoom: (zoom: number) => void;
        };
        Marker: new (options: {
          position: unknown;
          map: unknown;
          title?: string;
          icon?: {
            content: string;
            anchor?: unknown;
          };
        }) => {
          setMap: (map: unknown | null) => void;
        };
        Point: new (x: number, y: number) => unknown;
        Position?: {
          TOP_RIGHT?: unknown;
        };
      };
    };
  }
}

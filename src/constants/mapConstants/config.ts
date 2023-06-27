import { ICircleOptions, TMapOptions } from "./interfaces";

const DEFAULT_ZOOM = 15;
const CIRCLE_RADIUS_SMALL = 200;
const SMALL_CIRCLE_OPTIONS: ICircleOptions = {
  strokeWeight: 0,
  fillColor: "#5E7BC733",
};

const LARGE_CIRCLE_OPTIONS: ICircleOptions = {
  strokeWeight: 2,
  strokeColor: "#5E7BC733",
  fillColor: "#5E7BC71A",
};

const MAP_OPTIONS: TMapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export {
  DEFAULT_ZOOM,
  CIRCLE_RADIUS_SMALL,
  SMALL_CIRCLE_OPTIONS,
  LARGE_CIRCLE_OPTIONS,
  MAP_OPTIONS,
};

/**
 * Тип, описывающий местоположение с координатами
 */
export type Location = {
  latitude: number;
  longitude: number;
};

/**
 * Тип, описывающий город с именем и местоположением
 */
export type City = {
  name: string;
  location: Location & {
    zoom: number;
  };
};

/**
 * Тип, описывающий точку на карте с идентификатором и местоположением
 */
export type MapPoint = {
  id: number;
  location: Location;
};

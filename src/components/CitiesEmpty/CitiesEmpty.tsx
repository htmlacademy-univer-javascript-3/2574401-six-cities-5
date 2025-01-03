import { memo } from 'react';
import type { CitiesEmptyProps } from './types';

/**
 * Компонент отображения пустого состояния при отсутствии предложений по аренде
 */
const CitiesEmpty = memo(({ cityName }: CitiesEmptyProps) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">
        We could not find any property available at the moment in {cityName}
      </p>
    </div>
  </section>
));

CitiesEmpty.displayName = 'CitiesEmpty';

export default CitiesEmpty;

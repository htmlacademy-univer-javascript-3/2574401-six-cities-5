import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';
import { loadOffers } from './store/slices/app';
import { CITIES } from './mocks/cities';
import { changeCity } from './store/slices/app';

// Устанавливаем начальный город
store.dispatch(changeCity(CITIES[0]));

// Загружаем начальные данные в store
store.dispatch(loadOffers(offers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

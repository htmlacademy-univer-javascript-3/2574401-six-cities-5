import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const offers = [
  { id: 1, image: 'img/apartment-01.jpg', price: 120, name: 'Beautiful & luxurious apartment at great location', type: 'Apartment', isPremium: true },
  { id: 2, image: 'img/room.jpg', price: 80, name: 'Wood and stone place', type: 'Room', isPremium: false },
  { id: 3, image: 'img/apartment-02.jpg', price: 132, name: 'Canal View Prinsengracht', type: 'Apartment', isPremium: false },
  { id: 4, image: 'img/apartment-03.jpg', price: 180, name: 'Nice, cozy, warm big bed apartment', type: 'Apartment', isPremium: true },
  { id: 5, image: 'img/room.jpg', price: 80, name: 'Wood and stone place', type: 'Room', isPremium: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers}/>
  </React.StrictMode>,
  document.getElementById('root')
);

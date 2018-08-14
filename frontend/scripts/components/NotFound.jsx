import React from 'react';
import notFoundImg from '../../images/404.png';

const MainLinksNotFound = () => (
  <div className="main-not-found">
    <h2>Страница не существует</h2>
    <img src={notFoundImg} alt="404" height={404} />
  </div>
);

export default MainLinksNotFound;

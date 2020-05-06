import React from 'react';
import { render } from 'react-dom';
import { unregister } from 'libs/serviceWorker';
import { ProductsTemplate } from 'features/products/templates';

import 'styles/index.scss';

render(
  <React.StrictMode>
    <ProductsTemplate />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

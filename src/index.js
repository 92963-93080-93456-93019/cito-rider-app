import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import { HelmetProvider } from 'react-helmet-async';
import OrderDetailsContext from './contexts/OrderDetailsContext';

ReactDOM.render(
    <HelmetProvider>
        <OrderDetailsContext>
          <Routes />
        </OrderDetailsContext>
    </HelmetProvider>,
  document.getElementById('root')
);

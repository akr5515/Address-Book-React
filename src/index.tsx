import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling

import App from 'app';

// Initialize languages
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { colours } from 'constants/colours';
import { createGlobalStyle } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'slices';
// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});
//global styling
const GlobalStyle = createGlobalStyle`
  html, #root{
    background-color: ${colours.offWhite};
    height: 100%;
  }

  body{
    height: 100%;
    margin: 0;
  }
`;
// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const store = configureStore({ reducer: rootReducer });
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Router>
        <Route path="/" component={App}></Route>
      </Router>
      <GlobalStyle />
    </React.Fragment>
  </Provider>,
  MOUNT_NODE,
);

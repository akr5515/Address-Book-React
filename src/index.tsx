/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import App from 'app';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
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
    <>
      <Router>
        <Route path="/" component={App}></Route>
      </Router>
      <GlobalStyle />
    </>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

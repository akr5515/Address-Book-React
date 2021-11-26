/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import ContactsPage from './pages/contacts/ContactsPage';

function App(): JSX.Element {
  return (
    <div>
      <h1>WOrks</h1>
      <ContactsPage />
    </div>
  );
}

export default App;

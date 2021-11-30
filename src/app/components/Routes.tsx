import ContactsPage from 'app/pages/contacts/ContactsPage';
import SettingsPage from 'app/pages/settings/SettingsPage';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.main`
  grid-area: content;
  display: flex;
  flex: 1;
  margin: 10px;
  overflow: hidden;
`;

const Routes: React.FunctionComponent = () => {
  return (
    <Container>
      <Switch>
        <Route path="/contacts">
          <ContactsPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>

        <Route>
          <ContactsPage />
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;

import Page from 'app/components/Page';
import { colours } from 'constants/colours';
import { screenSize } from 'constants/screenSizes';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { contactsSelector, fetchContacts } from 'slices/contactsSlice';
import styled from 'styled-components';
import ContactDetails from './contact-details/ContactDetails';
import ContactsList from './contacts-list/ContactsList';

interface Props {
  isContactDetailsOpen: boolean;
}

const PageHeading = styled.h1`
  margin: 20px;
  color: ${colours.navy};
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.div<Props>`
  display: flex;

  @media (max-width: ${screenSize.medium}) {
    transition: all 0.6s;
    transform: translateX(
      ${props => (props.isContactDetailsOpen ? '-100%' : '0')}
    );
    min-width: 100%;
  }
`;

const ContactsListContainer = styled(ContentContainer)`
  min-width: 400px;
  max-width: 500px;
  flex: 1;
`;
const ContactsDetailsContainer = styled(ContentContainer)`
  flex: 2;
`;

const ContactsPage: React.FunctionComponent = () => {
  const { contacts, isContactDetailsOpen, isLoading, hasErrors } =
    useSelector(contactsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length]);

  const renderPageContent = () => {
    if (isLoading && contacts.length === 0) {
      return <h1>Loading...</h1>;
    }

    if (hasErrors) {
      return <h1>Something went wrong...</h1>;
    }

    if (!isLoading && contacts.length === 0) {
      return <h1>No contacts found</h1>;
    }

    return (
      <RowContainer>
        <ContactsListContainer isContactDetailsOpen={isContactDetailsOpen}>
          <ContactsList />
        </ContactsListContainer>

        <ContactsDetailsContainer isContactDetailsOpen={isContactDetailsOpen}>
          <Switch>
            <Route path="/contacts/:id" component={ContactDetails} />

            {contacts.length > 0 && (
              <Redirect to={`/contacts/${contacts[0].id}`} />
            )}
          </Switch>
        </ContactsDetailsContainer>
      </RowContainer>
    );
  };

  return (
    <Page noPadding>
      <PageHeading>Contacts</PageHeading>
      {renderPageContent()}
    </Page>
  );
};

export default ContactsPage;

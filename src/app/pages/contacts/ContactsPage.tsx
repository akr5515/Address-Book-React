import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { contactsSelector, fetchContacts } from 'slices/contactsSlice';
import ContactsList from './contacts-list/ContactsList';

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
      <div>
        <div>
          <ContactsList />
        </div>
        <Switch>
          <Route path="/contacts/:id" component={ContactsList} />
        </Switch>
      </div>
    );
  };

  return (
    <div>
      <h1>Contacts</h1>
      {renderPageContent}
    </div>
  );
};

export default ContactsPage;

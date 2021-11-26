import { MAX_FETCH_BATCH_SIZE, MAX_TOTAL_CONTACTS } from 'constants/index';
import { Contact } from 'models/Contact';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  contactDetailsOpened,
  contactsSelector,
  fetchContacts,
  searchedContactsSelector,
} from 'slices/contactsSlice';
import styled from 'styled-components';
import ContactListItem from './ContactListItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  list-style: none;
  padding: 0;
  overflow-y: auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const ListItem = styled.li`
  margin: 10px 20px;
`;

const ContactsList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [numContactsToDisplay, setNumContactsToDisplay] =
    useState<number>(MAX_FETCH_BATCH_SIZE);

  const { contacts, isLoading, hasErrors, searchText } =
    useSelector(contactsSelector);
  const searchedContacts = useSelector(searchedContactsSelector);

  const contactsListRef = useRef<HTMLUListElement>(null);
  const { current } = contactsListRef;

  //handle fetching
  useEffect(() => {
    if (numContactsToDisplay >= MAX_TOTAL_CONTACTS) {
      return;
    }

    if (contacts.length === numContactsToDisplay) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length, numContactsToDisplay]);
  const renderContacts = () => {
    if ((isLoading && contacts.length === 0) || hasErrors) {
      return null;
    }
    if (searchedContacts.length === 0) {
      return <h3>No contacts found</h3>;
    }

    const onContactClicked = () => {
      dispatch(contactDetailsOpened());
    };

    return searchedContacts.map((contact: Contact, index: number) => {
      if (index >= numContactsToDisplay) {
        return null;
      }

      return (
        <Link key={contact.id} to={`/contacts/${contact.id}`}>
          <ListItem>
            <ContactListItem contact={contact} onClick={onContactClicked} />
          </ListItem>
        </Link>
      );
    });
  };
  return (
    <Container>
      <List ref={contactsListRef}>{renderContacts}</List>
    </Container>
  );
};
export default ContactsList;

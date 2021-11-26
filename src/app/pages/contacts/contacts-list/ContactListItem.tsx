import { colours } from 'constants/colours';
import { Contact } from 'models/Contact';
import React from 'react';
import styled from 'styled-components';

interface Props {
  contact: Contact;
  onClick?: () => void;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  background-color: ${colours.grey};
  min-height: 4rem;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 11px 13px -6px rgba(135, 142, 192, 0.15);
  transition: 0.2s;

  &:hover {
    background-color: ${colours.grey2};
    box-shadow: 0 7px 18px 4px rgba(135, 142, 192, 0.15);
  }
`;

const ContactsDetailsContainer = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
`;

const ContactName = styled.span``;

const ContactUsername = styled.span``;

const ContactEmail = styled.span``;

const ContactListItem = ({ contact, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <ContactsDetailsContainer>
        <ContactName>
          {contact.name.first} {contact.name.last}
        </ContactName>
        <ContactUsername>{contact.username}</ContactUsername>
        <ContactEmail>{contact.email}</ContactEmail>
      </ContactsDetailsContainer>
    </Container>
  );
};

export default ContactListItem;

import { colours } from 'constants/colours';
import { screenSize } from 'constants/screenSizes';
import { Contact } from 'models/Contact';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactDetailsClosed, contactsSelector } from 'slices/contactsSlice';
import styled from 'styled-components';

import { ArrowIosBackOutline as BackIcon } from '@styled-icons/evaicons-outline/ArrowIosBackOutline';
import { Mobile as MobileIcon } from '@styled-icons/entypo/Mobile';
import { Home as HomeIcon } from '@styled-icons/entypo/Home';
import { Envelope as EmailIcon } from '@styled-icons/boxicons-solid/Envelope';
import ContactDetailsHeader from './ContactDetailsHeader';
import RecentConversations from './RecentConversations';

interface RouterProps {
  match: {
    params: { id: string };
  };
}

const MainContainer = styled.div`
  overflow-y: auto;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  padding: 20px 40px;
`;

const BackButton = styled.button`
  text-align: start;
  background: none;
  border: none;
  cursor: pointer;
  min-height: 50px;
  margin-left: 10px;

  @media (min-width: ${screenSize.medium}) {
    display: none;
  }
`;

const Divider = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  height: 1px;
  width: 100%;
  background: #eaedf3;
  background: ${colours.grey};
`;

const Section = styled.section`
  flex-direction: column;
  & p {
    color: ${colours.grey4};
    font-size: 1rem;
  }
`;

const SectionHeader = styled.h3`
  color: ${colours.navy};
  margin-bottom: 20px;
`;

const ContactDetailsContainer = styled.div`
  flex-direction: column;
  color: ${colours.grey4};

  & svg {
    min-width: 1.5rem;
  }
`;

const ContactDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

const ContactDetailLabel = styled.span`
  margin-left: 10px;
  min-width: 100px;
`;

const ContactDetailValue = styled.span`
  word-break: break-word;
`;

const ContactDetails = ({ match }: RouterProps) => {
  const { contacts } = useSelector(contactsSelector);
  const selectedContact: Contact =
    contacts.find((contact: Contact) => contact.id === match.params.id) ||
    contacts[0];

  const dispatch = useDispatch();

  if (contacts.length === 0) {
    return (
      <DetailsContainer>
        <span>Loading...</span>
      </DetailsContainer>
    );
  }

  return (
    <MainContainer>
      <BackButton onClick={() => dispatch(contactDetailsClosed())}>
        <BackIcon size={30} />{' '}
      </BackButton>

      <DetailsContainer>
        <ContactDetailsHeader contact={selectedContact} />

        <Divider />

        <Section>
          <SectionHeader>Bio</SectionHeader>
          <p>
            {
              "I like music and long walks on the beach 🌴 I'm a Software Engineer. Feel free to contact me anytime."
            }
          </p>
        </Section>

        <Divider />

        <Section>
          <SectionHeader>Contact</SectionHeader>
          <ContactDetailsContainer>
            <ContactDetailRow>
              <HomeIcon size={20} />
              <ContactDetailLabel>Mobile:</ContactDetailLabel>
              <ContactDetailValue>{selectedContact.cell}</ContactDetailValue>
            </ContactDetailRow>

            <ContactDetailRow>
              <MobileIcon size={20} />
              <ContactDetailLabel>Work:</ContactDetailLabel>
              <ContactDetailValue>{selectedContact.phone}</ContactDetailValue>
            </ContactDetailRow>

            <ContactDetailRow>
              <EmailIcon size={20} />
              <ContactDetailLabel>Email:</ContactDetailLabel>
              <ContactDetailValue>{selectedContact.email}</ContactDetailValue>
            </ContactDetailRow>
          </ContactDetailsContainer>
        </Section>

        <Divider />

        <Section>
          <SectionHeader>Recent Conversations</SectionHeader>
          <RecentConversations contact={selectedContact} />
        </Section>
      </DetailsContainer>
    </MainContainer>
  );
};

export default ContactDetails;

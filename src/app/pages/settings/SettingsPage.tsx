import React, { useState } from 'react';
import styled from 'styled-components/macro';
import NationalitiesSelector from './NationalitiesSelector';
import { useSelector, useDispatch } from 'react-redux';
import {
  nationalitiesSelector,
  selectedNationalitiesUpdated,
} from 'slices/settingsSlice';
import { Nationality } from 'models/Nationality';
import { contactsListCleared, fetchContacts } from 'slices/contactsSlice';
import { screenSize } from 'constants/screenSizes';
import Page from 'app/components/Page';
import Button from '../contacts/contact-details/components/Button';

const SelectNationalitiesText = styled.h4`
  display: flex;
  margin-top: 40px;
`;

const SettingsSavedMessage = styled.span`
  display: flex;
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 40px;

  @media (max-width: ${screenSize.medium}) {
    justify-content: center;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 50px;

  @media (max-width: ${screenSize.medium}) {
    & button {
      flex: 1;
    }
  }
`;

const SettingsPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const defaultNationalities = useSelector(nationalitiesSelector);
  const [nationalities, setNationalities] =
    useState<Nationality[]>(defaultNationalities);
  const [showSettingsSavedMessage, setShowSettingsSavedMessage] =
    useState<boolean>(false);

  const saveSettings = () => {
    dispatch(selectedNationalitiesUpdated(nationalities));

    dispatch(contactsListCleared());
    dispatch(fetchContacts());

    setShowSettingsSavedMessage(true);
  };

  const onNationalitiesChanged = (updatedNationalities: Nationality[]) => {
    setNationalities([...updatedNationalities]);
    setShowSettingsSavedMessage(false);
  };

  return (
    <Page heading="Settings">
      <SelectNationalitiesText>
        Select nationalities to be included in your address book:
      </SelectNationalitiesText>
      <NationalitiesSelector
        nationalities={nationalities}
        onNationalitiesChanged={onNationalitiesChanged}
      />
      <Footer>
        <Button onClick={saveSettings}>Save</Button>
      </Footer>
      {showSettingsSavedMessage && (
        <SettingsSavedMessage>{'Settings saved! 👌'}</SettingsSavedMessage>
      )}
    </Page>
  );
};

export default SettingsPage;

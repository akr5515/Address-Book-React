import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { Contact } from 'models/Contact';
import ContactsAPI from 'services/ContactsAPI';
import { RootState } from './';
import { selectedNationalityCodes } from './settingsSlice';

export interface ContactsState {
  isLoading: boolean;
  hasErrors: boolean;
  contacts: Contact[];
  searchText: string;
  isContactDetailsOpen: boolean;
}

export const initialState: ContactsState = {
  isLoading: false,
  hasErrors: false,
  contacts: [],
  searchText: '',
  isContactDetailsOpen: false,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContactsStarted: state => {
      state.isLoading = true;
    },
    getContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = [...state.contacts, ...action.payload];
      state.isLoading = false;
      state.hasErrors = false;
    },
    getContactsFailed: state => {
      state.isLoading = false;
      state.hasErrors = true;
    },
    contactsListCleared: state => {
      state.contacts = [];
    },
    searchTextUpdated: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    contactDetailsOpened: state => {
      state.isContactDetailsOpen = true;
    },
    contactDetailsClosed: state => {
      state.isContactDetailsOpen = false;
    },
  },
});
//actions
export const {
  getContactsStarted,
  getContactsSuccess,
  getContactsFailed,
  contactsListCleared,
  searchTextUpdated,
  contactDetailsOpened,
  contactDetailsClosed,
} = contactSlice.actions;

//selectors
export const contactsSelector = (state: RootState) => state.contacts;
export const searchedContactsSelector = (state: RootState) => {
  return state.contacts.contacts.filter((contact: Contact) => {
    const contactFullName =
      `${contact.name.first} ${contact.name.last}`.toLowerCase();
    return contactFullName.includes(state.contacts.searchText.toLowerCase());
  });
};

//fetch contacts
export function fetchContacts() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(getContactsStarted());

      const selectedNationalities: string[] = selectedNationalityCodes(
        getState(),
      );

      const extraParams = {
        nat: selectedNationalities.join(),
      };
      const contacts: Contact[] = await ContactsAPI.getContacts(extraParams);
      dispatch(getContactsSuccess(contacts));
    } catch (error) {
      dispatch(getContactsFailed());
    }
  };
}

export default contactSlice.reducer;

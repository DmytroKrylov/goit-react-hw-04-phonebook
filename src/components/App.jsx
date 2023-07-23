import React, { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);
    return parsedContacts || INITIAL_STATE;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    newContact.id = uuidv4();
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleCheckContact = name => {
    return !contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleRemoveContact = id =>
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContacts();

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm
        onAdd={handleAddContact}
        onCheckUnique={handleCheckContact}
      />
      <h2>Contacts List</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onRemove={handleRemoveContact} />
    </>
  );
};

export default App;

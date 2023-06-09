import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Container, HeadTitle, Title } from './App.styled';

const LS_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contactAttached = contacts.find(contact => contact.name === name);

    if (contactAttached) {
      alert(`${name} is already in contacts`);
    } else {
      const person = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(contacts => [...contacts, person]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contactId !== contact.id)
    );
  };

  const filteredContscts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <HeadTitle>Phonebook</HeadTitle>
      <ContactForm onSubmit={addContact} />

      <Title>Contacts</Title>
      <Filter
        value={filter}
        onChange={event => setFilter(event.currentTarget.value)}
      />
      <ContactList
        contacts={filteredContscts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

import { useState, useEffect } from 'react';
import { Contact, ContactFormData } from '../types/Contact';
import { saveContacts, loadContacts, generateId } from '../utils/storage';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedContacts = loadContacts();
    setContacts(loadedContacts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveContacts(contacts);
    }
  }, [contacts, loading]);

  const addContact = (contactData: ContactFormData) => {
    const newContact: Contact = {
      id: generateId(),
      ...contactData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: string, contactData: ContactFormData) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id 
        ? { ...contact, ...contactData, updatedAt: new Date() }
        : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact
  };
};
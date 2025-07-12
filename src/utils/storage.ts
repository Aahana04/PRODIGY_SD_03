import { Contact } from '../types/Contact';

const STORAGE_KEY = 'contacts';

export const saveContacts = (contacts: Contact[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contacts:', error);
  }
};

export const loadContacts = (): Contact[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Failed to load contacts:', error);
  }
  return [];
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
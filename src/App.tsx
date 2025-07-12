import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { SearchBar } from './components/SearchBar';
import { Contact } from './types/Contact';
import { useContacts } from './hooks/useContacts';

function App() {
  const { contacts, loading, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddContact = (contactData: any) => {
    addContact(contactData);
    setShowForm(false);
  };

  const handleUpdateContact = (contactData: any) => {
    if (editingContact) {
      updateContact(editingContact.id, contactData);
      setEditingContact(null);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Contact Manager</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize and manage your contacts with ease
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2 font-medium whitespace-nowrap"
            >
              <Plus size={20} />
              Add Contact
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {(showForm || editingContact) && (
            <div className="mb-8">
              <ContactForm
                contact={editingContact || undefined}
                onSave={editingContact ? handleUpdateContact : handleAddContact}
                onCancel={handleCancelForm}
                isEditing={!!editingContact}
              />
            </div>
          )}

          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={deleteContact}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
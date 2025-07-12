import React from 'react';
import { User, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import { Contact } from '../types/Contact';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
            <p className="text-sm text-gray-500">
              Added {contact.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit contact"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
            title="Delete contact"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-700">
          <Phone className="w-4 h-4 text-blue-600" />
          <a 
            href={`tel:${contact.phone}`}
            className="hover:text-blue-600 transition-colors"
          >
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Mail className="w-4 h-4 text-blue-600" />
          <a 
            href={`mailto:${contact.email}`}
            className="hover:text-blue-600 transition-colors break-all"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
};
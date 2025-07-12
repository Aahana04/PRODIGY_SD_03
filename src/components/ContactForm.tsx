import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Save, X } from 'lucide-react';
import { Contact, ContactFormData } from '../types/Contact';
import { validateEmail, validatePhone, validateName, formatPhone } from '../utils/validation';

interface ContactFormProps {
  contact?: Contact;
  onSave: (contactData: ContactFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: contact?.name || '',
    phone: contact?.phone || '',
    email: contact?.email || ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [touched, setTouched] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email
      });
    }
  }, [contact]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof ContactFormData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!validateName(value)) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameValid = validateField('name', formData.name);
    const phoneValid = validateField('phone', formData.phone);
    const emailValid = validateField('email', formData.email);
    
    setTouched({ name: true, phone: true, email: true });
    
    if (nameValid && phoneValid && emailValid) {
      onSave({
        ...formData,
        phone: formatPhone(formData.phone)
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter full name"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-2" />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter email address"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Save size={18} />
            {isEditing ? 'Update Contact' : 'Save Contact'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}
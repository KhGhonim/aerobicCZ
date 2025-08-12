import { useState } from 'react';

interface ContactFormData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  description: string;
}

interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });

  const [state, setState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      description: ''
    });
    setState({
      isLoading: false,
      isSuccess: false,
      error: null
    });
  };

  const submitForm = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    // Basic validation
    if (!formData.firstName.trim() || !formData.description.trim()) {
      setState(prev => ({
        ...prev,
        error: 'Jméno a popis jsou povinné položky.'
      }));
      return false;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se odeslat zprávu.');
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true
      }));

      // Don't reset form automatically - let user see success message
      // resetForm();
      return true;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Nepodařilo se odeslat zprávu.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return false;
    }
  };

  return {
    formData,
    state,
    handleChange,
    submitForm,
    resetForm
  };
};

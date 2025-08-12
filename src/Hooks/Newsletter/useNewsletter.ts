import { useState } from 'react';

interface NewsletterState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<NewsletterState>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear any previous error when user starts typing
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  };

  const resetForm = () => {
    setEmail('');
    setState({
      isLoading: false,
      isSuccess: false,
      error: null
    });
  };

  const subscribeToNewsletter = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      setState(prev => ({
        ...prev,
        error: 'Prosím zadejte emailovou adresu.'
      }));
      return false;
    }

    if (!email.includes('@')) {
      setState(prev => ({
        ...prev,
        error: 'Prosím zadejte platnou emailovou adresu.'
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se přihlásit k newsletteru.');
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
      const errorMessage = error instanceof Error ? error.message : 'Nepodařilo se přihlásit k newsletteru.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return false;
    }
  };

  return {
    email,
    state,
    handleEmailChange,
    subscribeToNewsletter,
    resetForm
  };
};

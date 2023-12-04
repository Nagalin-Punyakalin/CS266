import { FormEvent, ChangeEvent, useRef, useState } from 'react';
import axios from '../../../lib/axios';
import Swal from 'sweetalert2';

interface UseUploadProps {
  orderID: string;
}

export default function useUpload({ orderID }: UseUploadProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (file: File, orderID: string): Promise<void> => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderID', orderID);

      const response = await axios.post('/api/upload-slip', formData);

      if (response.status === 201) {
        Swal.fire(response.data.message, '', 'success');
      }
    } catch (error) {
      console.error(error.response?.data.message);
      setError(error.response?.data.message || 'An error occurred during the file upload.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    setError('');
    if (file) {
      fileInput.current?.setAttribute('value', file.name);
      fileInput.current?.blur();
    }
  };

  return {
    fileInput,
    error,
    loading,
    handleFileChange,
    handleSubmit,
  };
}

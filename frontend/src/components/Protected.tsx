import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/checkauth')
      .then(response => {
        if (response.status === 200) {
          setPermission(true);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    // You can return a loading spinner or some other loading UI
    return null;
  }

  if (permission) {
    return <Outlet />;
  } else {
    navigate('/');
    return null; // or a fallback UI for unauthorized access
  }
}

export default Protected;

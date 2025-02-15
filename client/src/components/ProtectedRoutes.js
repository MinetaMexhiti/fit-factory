import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; //A library to decode JWT tokens



//Represents the content (such as components or elements) wrapped inside the ProtectedRoute component.
function ProtectedRoute({ children, roleRequired }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); //Stores the decoded user role from the JWT token //Updates the role state after decoding the JWT toke
  const [isLoading, setIsLoading] = useState(true); //Tracks the loading state to determine if the component is still processing the token or ready to render the children

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found. Redirecting to login.');
      return navigate('/login');
    }

    try {
      const decoded = jwtDecode(token);

      if (!decoded || !decoded.role_id) {
        console.error('Invalid token structure. Redirecting to login.');
        localStorage.removeItem('token'); 
        return navigate('/login');
      }

      //if correct set role 
      setRole(decoded.role_id);
    } catch (error) {
      console.error('Failed to decode token:', error.message);
      localStorage.removeItem('token'); 
      return navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (roleRequired === 'admin' && role !== 1) {
    console.warn(`Access Denied: Required admin role, but found role ${role}`);
    return <Navigate to="/not-authorized" />;
  }
  if (roleRequired === 'user' && role !== 2) {
    console.warn(`Access Denied: Required user role, but found role ${role}`);
    return <Navigate to="/not-authorized" />;
  }

  return children;
}

export default ProtectedRoute;

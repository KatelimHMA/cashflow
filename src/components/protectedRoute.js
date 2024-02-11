import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
 const token = localStorage.getItem('token');

 if (!token) {
  // Redirects to the home page if the user is not authenticated
  return <Navigate to="/" />;
 }

 // If the user is authenticated, render the children
 return children;
}
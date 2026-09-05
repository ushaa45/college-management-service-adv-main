// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;


// Updated ProtectedRoute.jsx with better structure and comments
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importing jwt-decode to handle token decoding

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage      
  // If no token is found, redirect to login page
  if (!token) return <Navigate to="/login" replace />;
  try {
    const decoded = jwtDecode(token); // Decode the token to get its payload
    const currentTime = Date.now() / 1000; // Get current time in seconds   
    // Check if the token has an expiration time and if it has expired
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token"); // Remove expired token from localStorage
      return <Navigate to="/login" replace />; // Redirect to login page
    }
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (err) {
    console.error("JWT decode failed:", err); // Log any errors during token decoding
    return <Navigate to="/login" replace />; // Redirect to login page if token is invalid
  }
  return children; // If token is valid, render the protected component
}

export default ProtectedRoute;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Clear inputs whenever login page loads
  useEffect(() => {
    setCredentials({ email: "", password: "" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken); // save token
      props.showAlert("Logged in Successfully", "success");
      navigate("/"); // redirect to home
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off"> {/* ✅ disable autofill for whole form */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            autoComplete="new-email"   // ✅ force blank input
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            autoComplete="new-password" // ✅ force blank input
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';

export const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // check if token exists
    if (!localStorage.getItem("token")) {
      navigate("/login");   // redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;





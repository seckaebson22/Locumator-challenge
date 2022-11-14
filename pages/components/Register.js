import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAlert } from "react-alert";

const Register = () => {
  const alert = useAlert();
  
  const [database, setDatabase] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const database = localStorage.getItem("database");
    if (database) {
      setDatabase(JSON.parse(database));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  const registerUser = (e) => {
    e.preventDefault();
    const users = database.users || [];

    if (user.name === '' || user.email === '' || user.telephone === '' || user.password === '' || user.confirmPassword === '') {
      alert.error('All fields are required');
      return;
    }

    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = /^[A-Za-z ]+$/;
    const telephoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if(!nameRegex.test(user.name)){
      alert.error('This is not a valid name format');
      return;
    }

    if(!emailRegex.test(user.email)){
      alert.error('This is not a valid email format');
      return;
    }

    if(!telephoneRegex.test(user.telephone)){
      alert.error('This is not a valid telephone number format');
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert.error('Your passowords do not match');
      return;
    }

    setDatabase(prevState => ({ ...prevState, users: [...users, user], }));
    alert.show("Your account is created");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setUser({ ...user, [id]: value });
  };

  return (
    <form onSubmit={registerUser}>
      <div className="form-group">
        <label htmlFor="name">name*</label>
        <input
          type="text"
          name="name"
          placeholder="your name"
          id="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">work email*</label>
        <input
          // type="email"
          type="text"
          name="email"
          placeholder="your email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telephone">telephone*</label>
        <input
          type="text"
          name="telephone"
          placeholder="+44 01845 501417"
          id="telephone"
          value={user.telephone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name="password"
          placeholder="your password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">confirm password*</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="confirm your password"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="form-button">
        <input
          className="button"
          type="submit"
          name="sign-up"
          value="Agree &#38; Sign up"
        ></input>
        {/* <button type="submit" className="button">Agree 	&#38; Sign up</button> */}
      </div>

      <div className="form-footer">
        <p>
          Already have an account? <Link href="/">Sign up</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;

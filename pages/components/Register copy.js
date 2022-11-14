import React, { useEffect, useState } from "react";
import Link from "next/link";

const Register = () => {
  const [database, setDatabase] = useState({});
  const [state, setState] = useState({
    name: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = database.users;
    setDatabase(prevState => ({ ...prevState, users: [...users, state], }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({ ...state, [id]: value });
  };

  useEffect(() => {
    const database = JSON.parse(localStorage.getItem("database"));
    if (database) {
      setDatabase(database);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">name*</label>
        <input
          type="text"
          name="name"
          placeholder="your name"
          id="name"
          value={state.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">work email*</label>
        <input
          type="email"
          name="email"
          placeholder="your email"
          id="email"
          value={state.email}
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
          value={state.telephone}
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
          value={state.password}
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
          value={state.confirmPassword}
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

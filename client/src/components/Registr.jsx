import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Registr = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      return "Пожалуйста, введите email.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Некорректный формат email.";
    }
    if (password.length < 6) {
      return "Пароль должен содержать минимум 6 символов.";
    }
    return null;
  };

  const hendlValue = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(email, password)
      if (response.ok) {
        const data = await response.json();
        console.log("Регистрация прошла успешно:", data);
        navigate("/users");
      } else {
        console.error("Ошибка регистрации:", response.status);
        setError("Не удалось зарегистрироваться. Попробуйте ещё раз.");
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setError("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Регистрация</h2>
      <form className="register-form" method="POST" onSubmit={hendlValue}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
          />
        </div>
        <button type="submit" className="register-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registr;

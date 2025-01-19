import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hendlValue = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Проверка успешности ответа
      if (!res.ok) {
        const errorData = await res.json(); // Получение ошибки с сервера
        setError(errorData.message || "Не удалось Войти. Попробуйте ещё раз.");
        return;
      }

      const data = await res.json();
      console.log(data);
      navigate("/users");
    } catch (error) {
      console.error("Ошибка при Войти:", error);
      setError("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  };


  return (
    <div className="register-container">
      <h2 className="register-title">Войти</h2>
      <form className="register-form" method="POST" onSubmit={hendlValue}>
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
          Войти
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

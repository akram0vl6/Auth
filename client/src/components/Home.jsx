import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="home">
      <a href="/register" className="home-link">
        Регистрация
      </a>
      <a href="/login" className="home-link">
        Войти
      </a>
    </div>
  );
};

export default Home;

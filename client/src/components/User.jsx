import React, { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  // Функция для получения списка пользователей
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/user");
      const data = await res.json();
      setUsers(data.Users || []);
    } catch (e) {
      console.log(e);
    }
  };

  // Функция для удаления пользователя
  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Успешное удаление: обновляем список пользователей
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error("Не удалось удалить пользователя");
      }
    } catch (e) {
      console.error("Ошибка при удалении пользователя:", e);
    }
  };

  useEffect(() => {
    getUsers(); // Получаем пользователей при загрузке компонента
  }, []);

  return (
    <div className="users">
      <h1>Пользователи</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.email}
              <button className="btn" onClick={() => deleteUser(user._id)}>
                Удалить
              </button>
            </li>
          ))
        ) : (
          <p>Нет пользователей</p>
        )}
      </ul>
    </div>
  );
};

export default User;

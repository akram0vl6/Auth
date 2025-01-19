const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-models");
const { secret } = require("../config");

class AuthController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;

      // Проверяем, существует ли пользователь
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      // Хэшируем пароль
      const hashPassword = bcrypt.hashSync(password, 7);

      // Создаём нового пользователя
      const user = new User({
        email,
        password: hashPassword,
      });

      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log("Error", e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Ищем пользователя по имени
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      // Проверяем пароль
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      // Генерируем токен
      const token = jwt.sign({ email }, secret, { expiresIn: "15m" });
      return res.json({ token });
    } catch (e) {
      console.log("Error", e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async user(req, res) {
    try {
      const users = await User.find();
      res.json({ Users: users });
    } catch (e) {
      console.log("Error:", e);
      res.status(500).json({ message: "Не удалось получить пользователей" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      res.status(200).json({ message: "Пользователь успешно удален" });
    } catch (e) {
      console.error("Ошибка при удалении пользователя:", e);
      res.status(500).json({ message: "Ошибка на сервере" });
    }
  }
}

module.exports = new AuthController();

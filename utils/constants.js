const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=[\]]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=[\]]*)$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const messageAppStart = 'Приложение запущено';
const messageConnectDB = 'Подключено к БД';
const messageInvalidLogOrPassword = 'Неверный логин или пароль';
const messageAuth = 'Необходима авторизация';
const messageErrorServer = 'На сервере произошла ошибка';
const messagePageNotFound = 'Запрашиваемая страница не найдена';
const messageIncorrectDataMovie = 'Переданы некорректные данные фильмов';
const messageImpossibleDeleteMovie = 'Вы не можете удалять фильмы другого пользователя';
const messageNotFoundMovie = 'Фильм с указанным id не найден';
const messageIncorrectDeleteMovie = 'Переданы некорректные данные для удаления фильма';
const messageIncorrectDataUser = 'Переданы некорректные данные пользователя';
const messageUserNotFound = 'Пользователь с указанным id не найден';
const messageAlreadyEmail = 'Пользователь с таким email уже существует';
const messageServerWillFall = 'Сервер сейчас упадёт';

module.exports = {
  urlRegex,
  emailRegex,
  messageAppStart,
  messageConnectDB,
  messageInvalidLogOrPassword,
  messageAuth,
  messageErrorServer,
  messagePageNotFound,
  messageIncorrectDataMovie,
  messageImpossibleDeleteMovie,
  messageNotFoundMovie,
  messageIncorrectDeleteMovie,
  messageIncorrectDataUser,
  messageUserNotFound,
  messageAlreadyEmail,
  messageServerWillFall,
};

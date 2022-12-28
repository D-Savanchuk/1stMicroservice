const Gateway = require('micromq/gateway');

// создаем гейтвей
const gateway = new Gateway({
  microservices: ['market'],
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

// создаем эндпоинт и делегируем его в микросервис market
gateway.post('/market/buy/:id', (req, res) => res.delegate('market'));

// слушаем порт и принимаем запросы
gateway.listen(process.env.PORT);

const MicroMQ = require('micromq');
const WebSocket = require('ws');

// создаем микросервис
const app = new MicroMQ({
  name: 'notifications',
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

// поднимаем сервер для принятия запросов по сокетам
const ws = new WebSocket.Server({
  port: process.env.PORT,
});

// здесь будем хранить клиентов
const clients = new Map();

// ловим событие коннекта
ws.on('connection', (connection) => {
  // ловим все входящие сообщения
  connection.on('message', (message) => {
    // парсим сообщение, чтобы извлечь оттуда тип события и параметры.
    // не забудьте в продакшене добавить try/catch, когда будете парсить json!
    const { event, data } = JSON.parse(message);

    // на событие 'authorize' сохраняем коннект пользователя и связываем его с айди
    if (event === 'authorize' && data.userId) {
      // сохраняем коннект и связываем его с айди пользователя
      clients.set(data.userId, connection);
    }
  });
});

// не забудьте реализовать удаление клиента после дисконнекта,
// иначе получите утечку памяти!
ws.on('close', ...);

// создаем действие notify, которое могут вызывать другие микросервисы
app.action('notify', (meta) => {
  // если нет айди пользователя или текста, тогда возвращаем статус 400
  if (!meta.userId || !meta.text) {
    return [400, { error: 'Bad data' }];
  }

  // получаем коннект конкретного пользователя
  const connection = clients.get(meta.userId);

  // если не удалось найти коннект, тогда возвращаем статус 404
  if (!connection) {
    return [404, { error: 'User not found' }];
  }

  // отправляем сообщение клиенту
  connection.send(meta.text);

  // возвращаем 200 и ответ
  return { ok: true };
});

// запускаем микросервис
app.start();
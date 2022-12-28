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
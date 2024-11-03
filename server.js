require('dotenv').config(); // Загружаем переменные среды
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 4000;

// Настройка OpenAI
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ваш API ключ, загруженный через переменные среды
}));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Сервер будет раздавать статические файлы из папки 'public'

// Обработка запросов на чат
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Вы можете изменить модель на нужную, например, 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: userMessage }],
        });

        const aiResponse = response.data.choices[0].message.content;
        res.json({ response: aiResponse }); // Отправляем ответ обратно клиенту
    } catch (error) {
        console.error('Ошибка при получении ответа от OpenAI:', error);
        res.status(500).json({ error: 'Ошибка при получении ответа от ассистента.' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});


const express = require("express");
const Telegram = require("node-telegram-bot-api");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }))

const botToken = process.env.BOT_TOKEN;
const chatToken = process.env.OPEN_AI_API;

const Config = new Configuration({
  organization: "org-vVITXG7asoltaAqR0IwuET7d",
  apiKey: chatToken,
});

const openai = new OpenAIApi(Config);
const bot = new Telegram(botToken, {polling: true});



bot.on("message", async ctx => {
 const chatId = ctx.chat.id;
 const text = ctx.text;
  console.log(chatId, text);
 const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.7,
   max_tokens:100
 })
  
bot.sendMessage(chatId, res.data.choices[0].text);
});

app.listen(port, () => {
	console.log(`bot runing on port ${port}..!`);
});



import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

const botToken = process.env.TG_BOT_TOKEN!;
//new bot instance
const bot = new Bot(botToken);

bot.command("start", (ctx) => ctx.reply("Up and running!"));

bot.on("message", (ctx) => ctx.reply("Hello, Welcome!")); //this will reply to every message

bot.start();

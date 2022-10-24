import { Bot, Context } from "grammy";
import { Menu } from "@grammyjs/menu";
import * as dotenv from "dotenv";
dotenv.config();

const botToken = process.env.TG_BOT_TOKEN!;
//new bot instance
const bot = new Bot(botToken);

//menu
const Enter = "Enter";
const Get = "Get";
const Here = "Here";
const backButtons = "🔙 Back";

const menu = new Menu("root-menu")
  .submenu(Enter, "enter-menu")
  .row()
  .text(Get, (ctx: any) => ctx.reply("Getting..."));

const enterMenu = new Menu("enter-menu")
  .submenu(Here, "here-menu")
  .text("Enter your name", (ctx: any) => ctx.reply("Enter your name"))
  .back(backButtons);

const HereMenu = new Menu("here-menu")
  .text("Enter your other name", (ctx: any) =>
    ctx.reply("Enter your other name")
  )
  .back(backButtons);

//register submenus
menu.register(enterMenu);
enterMenu.register(HereMenu);

//initialize menus
bot.use(menu);
bot.use(enterMenu);
bot.use(HereMenu);

bot.command("start", (ctx: any) => {
  ctx.reply(`Hello, Welcome ${ctx.from.first_name}!`, { reply_markup: menu });
});

bot.on("message", (ctx) => ctx.reply(`Hello, Welcome ${ctx.from.first_name}!`)); //this will reply to every message

bot.catch((err) => {
  console.log(`Bot Error: ${err}`);
});

bot.start();

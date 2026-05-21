import { Telegraf } from "telegraf";
import dotenv from "dotenv";

import { t } from "./utils/i18n.js";
import { getSession } from "./utils/session.js";
import { mainMenu } from "./utils/keyboards.js";

import { startHandler } from "./handlers/start.handler.js";
import { langHandler } from "./handlers/lang.handler.js";
import { leadStartHandler, leadStepHandler } from "./handlers/lead.handler.js";
import {
  faqMenuHandler,
  faqAnswerHandler,
  faqBackHandler,
} from "./handlers/faq.handler.js";
import {
  directStartHandler,
  directMessageHandler,
} from "./handlers/direct.handler.js";

dotenv.config();

const { BOT_TOKEN, TEAM_CHAT_ID } = process.env;
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is required");
if (!TEAM_CHAT_ID) throw new Error("TEAM_CHAT_ID is required");

const bot = new Telegraf(BOT_TOKEN);

bot.start(startHandler);
bot.command("menu", startHandler);

bot.hears(["🇬🇧 English", "🇺🇦 Українська"], langHandler);

const LANGS = ["uk", "en"];
const menuButtons = LANGS.flatMap((lang) => [
  [t(lang).menu.lead, leadStartHandler],
  [t(lang).menu.faq, faqMenuHandler],
  [t(lang).menu.direct, directStartHandler],
  [t(lang).menu.site, (ctx) => ctx.reply("🌐 https://www.vexor.team")],
]);

for (const [label, handler] of menuButtons) {
  bot.hears(label, handler);
}

bot.hears(["🔙 Назад", "🔙 Back"], faqBackHandler);

for (const lang of LANGS) {
  for (const item of t(lang).faq_items) {
    bot.hears(item.label, (ctx) => faqAnswerHandler(ctx, item.label));
  }
}

bot.on("message", async (ctx) => {
  if (!ctx.from || !ctx.message || !("text" in ctx.message)) return;

  const session = getSession(ctx.from.id);

  if (session.flow === "lead") {
    await leadStepHandler(ctx, bot, TEAM_CHAT_ID);
    return;
  }

  if (session.flow === "direct") {
    await directMessageHandler(ctx, bot, TEAM_CHAT_ID);
    return;
  }

  await ctx.reply(t(session.lang).unknown, mainMenu(session.lang));
});

bot.launch({ dropPendingUpdates: true });
console.log("🤖 Vexor bot started");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

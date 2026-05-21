import { mainMenu } from "../utils/keyboards.js";
import { getSession, resetFlow } from "../utils/session.js";
import { formatDirect } from "../utils/format.js";
import { t } from "../utils/i18n.js";

export const directStartHandler = async (ctx) => {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  
  session.flow = "direct";
  await ctx.reply(t(session.lang).direct.ask, {
    reply_markup: { remove_keyboard: true },
  });
};

export const directMessageHandler = async (ctx, bot, teamChatId) => {
  if (!ctx.from || !ctx.message || !("text" in ctx.message)) return false;

  const session = getSession(ctx.from.id);
  if (session.flow !== "direct") return false;

  const text = ctx.message.text.trim();
  const texts = t(session.lang);

  await bot.telegram.sendMessage(
    teamChatId,
    formatDirect(text, ctx.from, texts),
    { parse_mode: "MarkdownV2" },
  );

  resetFlow(ctx.from.id);
  await ctx.reply(texts.direct.sent, mainMenu(session.lang));

  return true;
};

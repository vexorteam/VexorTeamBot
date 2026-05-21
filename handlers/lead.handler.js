import {
  mainMenu,
  projectTypeKeyboard,
  budgetKeyboard,
} from "../utils/keyboards.js";
import { getSession, resetFlow } from "../utils/session.js";
import { formatLead } from "../utils/format.js";
import { t } from "../utils/i18n.js";

export const leadStartHandler = async (ctx) => {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  
  session.flow = "lead";
  session.leadStep = "name";
  
  session.lead = {};
  await ctx.reply(t(session.lang).lead.start, {
    parse_mode: "Markdown",
    reply_markup: { remove_keyboard: true },
  });
};

export const leadStepHandler = async (ctx, bot, teamChatId) => {
  if (!ctx.from || !ctx.message || !("text" in ctx.message)) return false;

  const session = getSession(ctx.from.id);
  if (session.flow !== "lead") return false;

  const text = ctx.message.text.trim();
  const texts = t(session.lang);

  switch (session.leadStep) {
    case "name":
      session.lead.name = text;
      session.leadStep = "contact";
      
      await ctx.reply(texts.lead.ask_contact, {
        reply_markup: { remove_keyboard: true },
      });
      
      break;

    case "contact":
      session.lead.contact = text;
      session.leadStep = "type";
      
      await ctx.reply(texts.lead.ask_type, projectTypeKeyboard(session.lang));
      break;

    case "type":
      session.lead.projectType = text;
      session.leadStep = "budget";
      
      await ctx.reply(texts.lead.ask_budget, budgetKeyboard(session.lang));
      break;

    case "budget":
      session.lead.budget = text;
      session.leadStep = "desc";
      
      await ctx.reply(texts.lead.ask_desc, {
        reply_markup: { remove_keyboard: true },
      });
      break;

    case "desc":
      session.lead.desc = text === "/skip" ? undefined : text;
      session.leadStep = "idle";
      session.flow = "idle";

      await bot.telegram.sendMessage(
        teamChatId,
        formatLead(session.lead, ctx.from, texts),
        { parse_mode: "MarkdownV2" },
      );

      await ctx.reply(texts.lead.done, {
        parse_mode: "Markdown",
        ...mainMenu(session.lang),
      });
      
      resetFlow(ctx.from.id);
      break;

    default:
      return false;
  }

  return true;
};

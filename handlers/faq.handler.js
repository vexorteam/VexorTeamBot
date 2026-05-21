import { faqKeyboard, mainMenu } from "../utils/keyboards.js";
import { getSession, resetFlow } from "../utils/session.js";
import { t } from "../utils/i18n.js";

export const faqMenuHandler = async (ctx) => {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  
  session.flow = "faq";
  await ctx.reply(t(session.lang).faq.header, faqKeyboard(session.lang));
};

export const faqAnswerHandler = async (ctx, label) => {
  if (!ctx.from) return false;
  const { lang } = getSession(ctx.from.id);
  
  const item = t(lang).faq_items.find((f) => f.label === label);
  if (!item) return false;
  
  await ctx.reply(item.answer);
  return true;
};

export const faqBackHandler = async (ctx) => {
  if (!ctx.from) return;
  const { lang } = getSession(ctx.from.id);
  
  resetFlow(ctx.from.id);
  await ctx.reply(t(lang).faq.back_msg, mainMenu(lang));
};

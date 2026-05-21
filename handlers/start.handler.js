import { mainMenu } from "../utils/keyboards.js";
import { getSession, resetFlow } from "../utils/session.js";
import { t } from "../utils/i18n.js";

export const startHandler = async (ctx) => {
  if (!ctx.from) return;
  resetFlow(ctx.from.id);

  const { lang } = getSession(ctx.from.id);
  await ctx.reply(t(lang).start, { parse_mode: "Markdown", ...mainMenu(lang) });
};

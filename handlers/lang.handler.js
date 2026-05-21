import { mainMenu } from "../utils/keyboards.js";
import { getSession, resetFlow } from "../utils/session.js";
import { t } from "../utils/i18n.js";

export const langHandler = async (ctx) => {
  if (!ctx.from) return;

  const session = getSession(ctx.from.id);
  session.lang = session.lang === "uk" ? "en" : "uk";

  resetFlow(ctx.from.id);
  await ctx.reply(t(session.lang).lang_changed, mainMenu(session.lang));
};

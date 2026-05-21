import { Markup } from "telegraf";
import { t } from "./i18n.js";

export const mainMenu = (lang) => {
  const m = t(lang).menu;
  return Markup.keyboard([
    [m.lead, m.faq],
    [m.direct, m.site],
    [m.lang],
  ]).resize();
};

export const projectTypeKeyboard = (lang) =>
  Markup.keyboard(t(lang).project_types).resize();

export const budgetKeyboard = (lang) =>
  Markup.keyboard(t(lang).budgets).resize();

export const faqKeyboard = (lang) => {
  const items = t(lang).faq_items.map((item) => [item.label]);
  return Markup.keyboard([...items, [t(lang).faq.back]]).resize();
};

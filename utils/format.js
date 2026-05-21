const esc = (text) => String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");

export const formatLead = (lead, from, texts) => {
  const f = texts.lead;
  const handle = from.username ? `@${from.username}` : from.first_name;
  
  return [
    f.team_label,
    "",
    `👤 *${esc(f.field_name)}:* ${esc(lead.name ?? "—")}`,
    `📬 *${esc(f.field_contact)}:* ${esc(lead.contact ?? "—")}`,
    `🔧 *${esc(f.field_type)}:* ${esc(lead.projectType ?? "—")}`,
    `💰 *${esc(f.field_budget)}:* ${esc(lead.budget ?? "—")}`,
    `📝 *${esc(f.field_desc)}:* ${esc(lead.desc ?? "—")}`,
    "",
    `🔗 *${esc(f.field_from)}:* ${esc(handle)} \\(${from.id}\\)`,
  ].join("\n");
};

export const formatDirect = (text, from, texts) => {
  const f = texts.direct;
  const handle = from.username ? `@${from.username}` : from.first_name;
  
  return [
    f.team_label,
    "",
    esc(text),
    "",
    `🔗 *${esc(f.field_from)}:* ${esc(handle)} \\(${from.id}\\)`,
  ].join("\n");
};

const store = new Map();

export const getSession = (userId) => {
  if (!store.has(userId)) {
    store.set(userId, { flow: "idle", leadStep: "idle", lead: {}, lang: "uk" });
  }
  
  return store.get(userId);
};

export const resetFlow = (userId) => {
  const s = getSession(userId);
  s.flow = "idle";
  
  s.leadStep = "idle";
  s.lead = {};
};

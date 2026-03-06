export default {
  async scheduled(event, env, ctx) {
    const res = await env.NARA_WEB.fetch("https://nara-web/api/agent_sync", {
      method: "POST",
    });
    const data = await res.json();
    console.log(`Sync: ${data.synced} new, ${data.total} total`);
  },
};

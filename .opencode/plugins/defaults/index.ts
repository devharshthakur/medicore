import { Plugin, Skill } from '@opencode/plugin';

const SKILL_ID = 'defaults';
const MARKER = 'medcore.defaults';

export default Plugin.define({
  id: 'medcore.defaults',
  async setup(ctx) {
    const isChild = async (sessionID: string) => Boolean((await ctx.session.get({ sessionID })).parentID);

    // Root sessions: attach the skill to the first prompt.
    await ctx.session.hook('prompt', async (event) => {
      if (await isChild(event.sessionID)) return;
      if (event.prompt.skills?.some((skill) => skill.id === SKILL_ID)) return;

      const messages = await ctx.session.context({ sessionID: event.sessionID });
      const alreadyAttached = messages.some((message) => message.type === 'user' && message.skills?.some((skill) => skill.id === SKILL_ID));
      if (alreadyAttached) return;

      event.prompt.skills ??= [];
      event.prompt.skills.push({ id: Skill.ID.make(SKILL_ID) });
    });

    // Subagent sessions: inject the skill content into the system prompt on every request.
    await ctx.session.hook('context', async (event) => {
      if (event.system.some((part) => part.metadata?.[MARKER])) return;
      if (!(await isChild(event.sessionID))) return;

      const { data } = await ctx.skill.list();
      const skill = data.find((item) => item.id === SKILL_ID);
      if (!skill) return;

      event.system.push({
        type: 'text',
        text: `<skill_content name="${skill.name}">\n${skill.content}\n</skill_content>`,
        metadata: { [MARKER]: true },
      });
    });
  },
});

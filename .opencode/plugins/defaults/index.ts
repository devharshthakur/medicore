import { Plugin, Skill } from '@opencode/plugin';

export default Plugin.define({
  id: 'medcore.defaults',
  async setup(ctx) {
    await ctx.session.hook('prompt', async (event) => {
      if (event.prompt.skills?.some((skill) => skill.id === 'defaults')) return;

      const messages = await ctx.session.context({ sessionID: event.sessionID });
      const alreadyAttached = messages.some((message) => message.type === 'user' && message.skills?.some((skill) => skill.id === 'defaults'));
      if (alreadyAttached) return;

      event.prompt.skills ??= [];
      event.prompt.skills.push({ id: Skill.ID.make('defaults') });
    });
  },
});

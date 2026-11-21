import { Plugin, Skill } from '@opencode/plugin';

export default Plugin.define({
  id: 'medcore.defaults',
  async setup(ctx) {
    await ctx.session.hook('prompt', (event) => {
      event.prompt.skills ??= [];
      if (!event.prompt.skills.some((skill) => skill.id === 'defaults')) {
        event.prompt.skills.push({ id: Skill.ID.make('defaults') });
      }
    });
  },
});

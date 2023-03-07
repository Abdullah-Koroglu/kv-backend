'use strict';

/**
 * question controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question', ({ strapi }) => ({

  async randomQuestion(ctx) {
    try {
      const {game, level} = ctx.request.body
      console.log ({game, level})

      const uid = "api::question.question";

      const ids = (
          await strapi.db.connection
              .select("questions.*")
              .from(strapi.getModel(uid).collectionName)
              .join ('questions_game_links', {'questions_game_links.question_id': 'questions.id'})
              .join ('questions_level_links', 'questions_level_links.question_id', 'questions.id')
              .join ('games', {'games.id': 'questions_game_links.game_id'})
              .join ('levels', 'levels.id', 'questions_level_links.level_id')
              .where ({game_value: game, level_value: level})
              .orderByRaw("RANDOM()")
              .limit(1)
      )
      .map(it => it.id)

      const samples = await strapi.entityService.findOne(uid, ids[0], {populate: { photo: true, video: true }})

      ctx.body = samples
      return 'response';
    } catch (err) {
      console.log (err)
      ctx.body = err;
    }
  },

  async checkAnswer(ctx) {
    try {
      const {id, answer} = ctx.request.body
      console.log ({id, answer})

      const uid = "api::question.question";

      const samples = await strapi.entityService.findOne(uid, id)
      if (answer === samples.answer) {
        ctx.body = true
      } else {
        ctx.body = false
      }

      return 'response';
    } catch (err) {
      console.log (err)
      ctx.body = err;
    }
  }
}));
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

      // const occupation = await strapi.db.query('api::question.question').select('id');

      const uid = "api::question.question";

      const ids = (
          await strapi.db.connection
              .select("id")
              .from(strapi.getModel(uid).collectionName)
              // The random function of your DB. This one is Postgres'.
              .orderByRaw("RANDOM()")
              // Your desired number of samples.
              .limit(1)
      ).map(it => it.id)

      const samples = await strapi.entityService.findMany(uid, {
        filters: {
          id: {
            $in: ids
          }
          }
        })

      console.log ({ids})
      ctx.body = samples
      return 'response';
    } catch (err) {
      ctx.body = err;
    }
  }
}));
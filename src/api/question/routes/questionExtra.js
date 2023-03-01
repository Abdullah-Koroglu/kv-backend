module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/question',
      handler: 'question.randomQuestion',
    },
  ],
};
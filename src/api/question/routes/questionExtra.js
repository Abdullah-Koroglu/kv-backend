module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/question',
      handler: 'question.randomQuestion',
    },
    {
      method: 'POST',
      path: '/check',
      handler: 'question.checkAnswer',
    },
  ],
};
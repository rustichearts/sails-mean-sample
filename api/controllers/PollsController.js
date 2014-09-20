/**
 * PollsController
 *
 * @description :: Server-side logic for managing polls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `PollsController.list()`
   */
  list: function (req, res) {
    Poll.find().populate('choices').exec(function(err, polls){
      if(err) return res.serverError(err);
      return res.json(polls);
    });
  },

  /**
   * `PollsController.poll()`
   */
  poll: function (req, res) {
    var pollId = req.params.id;
    Poll.findOne({id: pollId}).populate('choices').exec(function(err, poll) {

      if(err) return res.serverError(err);
      if(!poll) return res.notFound(err);

      var userVoted = false,
        userChoice,
        totalVotes = 0;

      for(c in (poll.choices)){
        var choice = poll.choices[c];
        for(v in choice.votes) {
          var vote = choice.votes[v];
          totalVotes++;
          if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
            userVoted = true;
            userChoice = {id: choice.id, text: choice.text };
          }
        }
      }
      poll.userVoted = userVoted;
      poll.userChoice = userChoice;
      poll.totalVotes = totalVotes;
      res.json(poll);

    });
  },


  /**
   * `PollsController.create()`
   */
  create: function (req, res) {
    var reqBody = req.body,
      choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
      pollObj = {question: reqBody.question, choices: choices};

    Poll.create(pollObj).exec(function(err, doc) {
      if(err || !doc) {
        res.serverError(err);
      } else {
        res.json(doc);
      }
    });
  }
};


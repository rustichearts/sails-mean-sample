/**
 * RootController
 *
 * @description :: Server-side logic for managing roots
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
   * `RootController.index()`
   */
  index: function (req, res) {
    return res.view("root/index",{
      title: 'Polls'
    });
  }
};


const { Model } = require("objection");
class Addresses extends Model {
  static get tableName() {
    return "addresses";
  }
}
module.exports = Addresses;

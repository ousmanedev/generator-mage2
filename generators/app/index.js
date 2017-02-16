'use strict';

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  listCommands() {
    this.log("List of each available commands");
  }
};

'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  getModuleName: function() {
    var contents = this.fs.read(this.destinationPath('registration.php'));
    return contents.match(/[a-zA-Z0-9]*_[a-zA-Z0-9]*/)[0];
  },

  getModulePath: function() {
    return this.getModuleName().replace('_', '/');
  }
});

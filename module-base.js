'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  getModuleName: function() {
    var contents = this.fs.read(this.destinationPath('registration.php'));
    return contents.match(/[a-zA-Z0-9]*_[a-zA-Z0-9]*/)[0];
  },

  getModuleNamespace: function(subClass) {
    var namespace = this.getModuleName().replace('_', '\\');
    return subClass === undefined ? namespace : namespace + '\\' + subClass;
  },

  getModulePath: function() {
    return this.getModuleName().replace('_', '/');
  },

  getAreas: function() {
    return [
      {name: 'Frontend', value: 'frontend'},
      {name: 'Adminhtml', value: 'adminhtml'}
    ];
  },

  copyObjects: function(sourceObject, destinationObject) {
    Object.keys(sourceObject).forEach(function(key){
      destinationObject[key] = sourceObject[key];
    })
  }
});

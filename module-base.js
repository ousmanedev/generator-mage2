'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function(args, opts) {
    Generator.apply(this, arguments);

    var createModuleMessage = 'Use `yo m2ext:module` to generate a module and use `cd` to move inside the module folder.';
    if(!this.insideModuleFolder()) {
      this.env.error('You must be located inside a Magento 2 module folder to run this gnerator.\n' + createModuleMessage);
    }

    if(!this.canGetModuleName()) {
      this.env.error('Failed to get your module name from the files.\n' + createModuleMessage);
    }
  },

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

  getAreas: function(extraChoice) {
    var areas = [{name: 'Frontend', value: 'frontend'},{name: 'Adminhtml', value: 'adminhtml'}];
    if(extraChoice !== undefined)
      areas.push(extraChoice);
    return areas;
  },

  copyObjects: function(sourceObject, destinationObject) {
    Object.keys(sourceObject).forEach(function(key){
      destinationObject[key] = sourceObject[key];
    })
  },

  insideModuleFolder: function() {
    return this.fs.exists(this.destinationPath('registration.php'))
           && this.fs.exists(this.destinationPath('etc/module.xml'))
  },

  canGetModuleName: function() {
    var contents = this.fs.read(this.destinationPath('registration.php'));
    return contents.match(/[a-zA-Z0-9]+_[a-zA-Z0-9]+/) !== null;
  }
});

'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  writing: function() {
    this.fs.copyTpl(
      this.templatePath('acl.xml'),
      this.destinationPath('etc/acl.xml'),
      { moduleName: this.getModuleName() }
    );
  },

  logging: function() {
    this.log('Acl file generated with some default rules.');
  }
});

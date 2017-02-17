'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'routeArea',
      message : 'Route Area (frontend, adminhtml): ',
      default : 'frontend'
    }, {
      type    : 'input',
      name    : 'frontName',
      message : 'Frontname: ',
      default : this.getModuleName().toLowerCase()
    }]).then((answers) => {
      this.routeArea = answers.routeArea;
      this.frontName = answers.frontName;
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('routes.xml'),
      this.destinationPath('./etc/' + this.routeArea + '/routes.xml'),
      { frontName: this.frontName, fullModuleName: this.getModuleName() }
    );
  }
});

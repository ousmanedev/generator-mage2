'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting: function() {
    var generator = this;
    return this.prompt([{
      type    : 'input',
      name    : 'area',
      message : 'Which Area (frontend, adminhtml): ',
      default : 'frontend'
    }, {
      type    : 'input',
      name    : 'frontName',
      message : 'Frontname: ',
      default : this.getModuleName().toLowerCase()
    }]).then((answers) => {
      this.area = answers.area;
      this.frontName = answers.frontName;
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('routes.xml'),
      this.destinationPath('./etc/' + this.area + '/routes.xml'),
      { frontName: this.frontName, fullModuleName: this.getModuleName() }
    );
  }
});

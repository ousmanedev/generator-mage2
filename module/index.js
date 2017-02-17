'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'vendorName',
      message : 'Vendor name: '
    }, {
      type    : 'input',
      name    : 'moduleName',
      message : 'Module name: ',
    }, {
      type    : 'input',
      name    : 'version',
      message : 'Version: ',
    }]).then((answers) => {
      this.moduleName = answers.vendorName + '_' + answers.moduleName;
      this.modulePath = answers.vendorName + '/' + answers.moduleName;
      this.version    = answers.version;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('registration.php'),
      this.destinationPath(this.modulePath + '/registration.php'),
      { fullModuleName: this.moduleName }
    );

    this.fs.copyTpl(
      this.templatePath('module.xml'),
      this.destinationPath(this.modulePath + '/etc/module.xml'),
      { fullModuleName: this.moduleName, version: this.version }
    );
  }
})

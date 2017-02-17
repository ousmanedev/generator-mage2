'use strict';

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  _getFullModuleName(separator) {
    return separator === undefined ? this.fullModuleName : this.fullModuleName.replace('_', separator);
  }

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
      this.fullModuleName = answers.vendorName + '_' + answers.moduleName;
      this.version    = answers.version;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('registration.php'),
      this.destinationPath(this._getFullModuleName('/') + '/registration.php'),
      { fullModuleName: this._getFullModuleName() }
    );

    this.fs.copyTpl(
      this.templatePath('module.xml'),
      this.destinationPath(this._getFullModuleName('/') + '/etc/module.xml'),
      { fullModuleName: this._getFullModuleName(), version: this.version }
    );
  }
};

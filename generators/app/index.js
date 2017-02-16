'use strict';

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  getInfos() {
    return this.prompt([{
      type    : 'input',
      name    : 'vendor_name',
      message : 'Vendor name: '
    }, {
      type    : 'input',
      name    : 'module_name',
      message : 'Module name: ',
    }, {
      type    : 'input',
      name    : 'version',
      message : 'Version: ',
    }]).then((answers) => {
      this.vendor_name = answers.vendor_name;
      this.module_name = answers.module_name;
      this.version     = answers.version;
    });
  }

  writing() {
    var full_module_name = this.vendor_name + '_' + this.module_name;

    this.fs.copyTpl(
      this.templatePath('registration.php'),
      this.destinationPath(this.vendor_name + '/' + this.module_name +'/registration.php'),
      { full_module_name: full_module_name }
    );

    this.fs.copyTpl(
      this.templatePath('module.xml'),
      this.destinationPath(this.vendor_name + '/' + this.module_name +'/etc/module.xml'),
      { full_module_name: full_module_name, version: this.version }
    );
  }
};

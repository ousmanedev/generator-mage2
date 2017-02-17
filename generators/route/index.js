'use strict';

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  _getFullModuleName(separator) {
    return separator === undefined ? this.fullModuleName : this.fullModuleName.replace('_', separator);
  }

  initializing() {
    var contents = this.fs.read(this.destinationPath('registration.php'));
    this.fullModuleName = contents.match(/[a-zA-Z0-9]*_[a-zA-Z0-9]*/)[0];
  }

  prompting() {
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
      default : this._getFullModuleName().toLowerCase()
    }]).then((answers) => {
      this.area = answers.area;
      this.frontName = answers.frontName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('routes.xml'),
      this.destinationPath('./etc/' + this.area + '/routes.xml'),
      { frontName: this.frontName, fullModuleName: this._getFullModuleName() }
    );
  }
};

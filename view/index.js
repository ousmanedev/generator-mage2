'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'list',
      name    : 'viewArea',
      message : 'View Area: ',
      choices : this.getAreas(),
      default : 'frontend'
    }, {
      type    : 'input',
      name    : 'viewHandle',
      message : 'View Handle: ',
      default : this.getModuleName().toLowerCase() + '_index_index'
    }, {
      type    : 'input',
      name    : 'blockName',
      message : 'Block Name: ',
      default : 'Main'
    }, {
      type    : 'input',
      name    : 'templateFile',
      message : 'Template File: ',
      default : 'content.phtml'
    }, {
      type    : 'input',
      name    : 'viewLayout',
      message : 'Layout: ',
      default : '1column'
    }]).then((answers) => {
      this.copyObjects(answers, this);
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('layout.xml'),
      this.destinationPath(this._getLayoutXmlPath()),
      {
        viewLayout: this.viewLayout,
        templateFile: this.templateFile,
        blockInstance: this.getModuleNamespace(this.blockName),
        blockFullName: this.getModuleNamespace(this.blockName).toLowerCase().replace(/\\/g, '_')
      }
    );
    this.fs.copyTpl(
      this.templatePath('Block.php'),
      this.destinationPath(this._getBlockPhpPath()),
      {
        blockNamespace: this.getModuleNamespace('Block' + (this.viewArea == 'adminhtml' ? '\\Adminhtml' : '')),
        blockName: this.blockName
      }
    );
    this.fs.copyTpl(
      this.templatePath('content.phtml'),
      this.destinationPath(this._getContentPhtmlPath())
    );
  },

  _getLayoutXmlPath() {
    return 'view/' + this.viewArea + '/layout/' + this.viewHandle + '.xml';
  },

  _getBlockPhpPath: function() {
    return 'Block/' + (this.viewArea == 'adminhtml' ? 'Adminhtml/' : '') + this.blockName + '.php';
  },

  _getContentPhtmlPath: function() {
    return 'view/' + this.viewArea  + '/templates/' + this.templateFile;
  }
});

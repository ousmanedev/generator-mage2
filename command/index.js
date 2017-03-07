'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'commandName',
      message : 'Command Name: '
    }]).then((answers) => {
      this.commandClassName = answers.commandName.charAt(0).toUpperCase() +
                              answers.commandName.slice(1);
    });
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('Command.php'),
      this.destinationPath('Commands/'+ this.commandClassName + '.php'),
      { namespace: this.getModuleNamespace(this.commandClassName),
        commandClassName: this.commandClassName,
        commandName: this.commandClassName.toLowerCase() }
    );
  }
})

'use strict';
var ModuleBase = require('../module-base.js');

module.exports = ModuleBase.extend({
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'modelName',
      message : 'Model Name: '
    }]).then((answers) => {
      this.modelName = answers.modelName.charAt(0).toUpperCase() + answers.modelName.slice(1);
    });
  },

  writing() {
    var templateData = {
      moduleNamespace: this.getModuleNamespace(),
      modelName: this.modelName,
      modelPath: (this.getModuleName() + '_' + this.modelName).toLowerCase()
    };

    this.fs.copyTpl(
      this.templatePath('Api/ModelRepositoryInterface.php'),
      this.destinationPath('Api/'+ this.modelName + 'RepositoryInterface.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Model/ModelRepository.php'),
      this.destinationPath('Model/'+ this.modelName + 'Repository.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Model/ModelInterface.php'),
      this.destinationPath('Model/'+ this.modelName + 'Interface.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Model/ResourceModel/Model/Collection.php'),
      this.destinationPath('Model/ResourceModel/'+ this.modelName + '/Collection.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Model/ResourceModel/Model.php'),
      this.destinationPath('Model/ResourceModel/'+ this.modelName + '.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Model/Model.php'),
      this.destinationPath('Model/'+ this.modelName + '.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Setup/InstallSchema.php'),
      this.destinationPath('Setup/InstallSchema.php'),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath('Setup/InstallData.php'),
      this.destinationPath('Setup/InstallData.php'),
      templateData
    );
  }
})

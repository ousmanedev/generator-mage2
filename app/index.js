'use strict';
var Generator = require('yeoman-generator');
var download = require('download');

module.exports = Generator.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'magento2Version',
      message : 'Version: ',
      default : '2.1.4'
    }]).then((answers) => {
      this.magento2Version = answers.magento2Version;
    });
  },

  writing: function() {
    this.log('Downloading Magento2 version '+ this.magento2Version +'...');
    download('https://github.com/magento/magento2/archive/' + this.magento2Version + '.zip',
             this.destinationPath(),
             { extract: true }).then(() => {
              var magentoFolderName = 'magento2-' + this.magento2Version;
              this.log('Magento 2 installed in ' + this.destinationPath(magentoFolderName) + '\n\
Use `cd '+ magentoFolderName + '` to move into your magento2 folder and run `composer install` to install the magento 2 dependencies.');
            });
  }
})

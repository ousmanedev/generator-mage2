'use strict';
var Generator = require('yeoman-generator');
var download = require('download');

module.exports = Generator.extend({
  constructor: function (args, opts) {
    Generator.apply(this, arguments);
    this.argument('version', { desc: 'Magento 2 version to install',
                               type: String,
                               default: '2.1.4' });
  },

  writing: function() {
    this.log('Started downloading Magento2 version '+ this.options.version +'...');
    download('https://github.com/magento/magento2/archive/' + this.options.version + '.zip',
             this.destinationPath(),
             { extract: true }).then(() => {
              var magentoFolderName = 'magento2-' + this.options.version;
              this.log('Magento 2 installed in ' + this.destinationPath(magentoFolderName) + '\n\
Use `cd '+ magentoFolderName + '` to move into your magento2 folder and run `composer install` to install the magento 2 dependencies.');
            });
  }
})

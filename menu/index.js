'use strict';
var ModuleBase = require('../module-base.js');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var inquirer = require('inquirer');

module.exports = ModuleBase.extend({
  prompting() {
    return this.prompt([{
      type    : 'confirm',
      name    : 'menuTop',
      message : 'Is this a top level menu : ',
      default : true
    }, {
      type    : 'list',
      name    : 'menuParent',
      message : 'Choose the parent menu: ',
      choices : this._getMenuParents(),
      when    : function (answers) {
        return answers.menuTop === false;
      }
    }, {
      type    : 'input',
      name    : 'menuLinkId',
      message : 'Menu Link ID: ',
      default : this.getModuleName() + '::unique_identifier'
    }, {
      type    : 'input',
      name    : 'menuAclResource',
      message : 'ACL Resource: ',
      default : this.getModuleName() + '::unique_identifier'
    }, {
      type    : 'input',
      name    : 'menuTitle',
      message : 'Menu Title: ',
      default : 'My awesome menu title'
    }, {
      type    : 'input',
      name    : 'menuAction',
      message : 'Menu Action: ',
      default : this.getModuleName().toLowerCase() + '/index/index'
    }, {
      type    : 'input',
      name    : 'menuSortOrder',
      message : 'Sort Order: ',
      default : '10'
    }]).then((answers) => {
      this.copyObjects(answers, this);
    });
  },

  writing() {
    var menuFileLocation = this.destinationPath('etc/adminhtml/menu.xml');
    var contents = this.fs.exists(menuFileLocation) ? this.fs.read(menuFileLocation) : this.fs.read(this.templatePath('menu.xml'));
    var generator = this;
    parseString(contents, function(error, json) {
      if(error) {
        generator.log(error);
        return;
      }

      var menu = {'$': {id: generator.menuLinkId,
                        instance: generator.menuAclResource,
                        title: generator.menuTitle,
                        action: generator.menuAction,
                        module: generator.getModuleName(),
                        sortOrder: generator.menuSortOrder}};
      if(generator.menuTop === false) {
        menu.$.parent = generator.menuParent;
        if(generator.menuParent.indexOf('Magento_') > -1) {
          menu.$.dependsOnModule = generator.menuParent.match(/(Magento_[A-Za-z]*)\::/)[1];
        }
      }

      if(json.config.menu === undefined) {
        json.config.menu = [];
        json.config.menu.push({add: menu});
      }else {
        json.config.menu[0].add.push(menu);
      }

      var builder = new xml2js.Builder();
      generator.fs.write(menuFileLocation, builder.buildObject(json));
    });
  },

  _getMenuParents: function() {
    var moduleMenus = [
      new inquirer.Separator( this.getModuleName() + ' top menus')
    ];

    var magentoTopLevelMenus = [
      new inquirer.Separator('Magento2 top Menus'),
      {name:'Dashboard (Magento_Backend::dashboard)', value :'Magento_Backend::dashboard'},
      {name:'Sales (Magento_Sales::sales)', value :'Magento_Sales::sales'},
      {name:'Products (Magento_Catalog::catalog)', value :'Magento_Catalog::catalog'},
      {name:'Customers (Magento_Customer::customer)', value :'Magento_Customer::customer'},
      {name:'Marketing (Magento_Backend::marketing)', value :'Magento_Backend::marketing'},
      {name:'Content (Magento_Backend::content)', value :'Magento_Backend::content'},
      {name:'Reports (Magento_Reports::report)', value :'Magento_Reports::report'},
      {name:'Stores (Magento_Backend::stores)', value :'Magento_Backend::stores'},
      {name:'System (Magento_Backend::system)', value :'Magento_Backend::system'},
      {name:'Find Partners and extension (Magento_Marketplace::partners)', value :'Magento_Marketplace::partners'}
    ];

    if(this.fs.exists(this.destinationPath('etc/adminhtml/menu.xml'))) {
      var contents = this.fs.read(this.destinationPath('etc/adminhtml/menu.xml'));
      parseString(contents, function(error, json) {
        if(error) {
          console.log(error);
          return;
        }
        if(json.config.menu !== undefined &&  json.config.menu.length > 0 && json.config.menu[0].add.length > 0) {
          var menus = json.config.menu[0].add;
          for (var i = 0, len = menus.length; i < len; i++) {
            var menu = menus[i];
            moduleMenus.push({name: menu.$.title + ' (' + menu.$.id +')', value: menu.$.id})
          }
        }
      });
    }

    return moduleMenus.length == 1 ? magentoTopLevelMenus : moduleMenus.concat(magentoTopLevelMenus);
  }
})

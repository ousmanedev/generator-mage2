# Magento2 Generator

`generator-mage2` makes it easy to create Magento2 extensions (modules and themes).

## Installation
```
$ npm install -g generator-mage2
```

## Commands
* `yo mage2`: Installs Magento2 Community Edition.
* `yo mage2:module`: Creates a basic Magento2 module folder.
* `yo mage2:command`: Generate a Magento2 command.

### Commands for module
Before using the following commands, you must be located inside your module folder.  
If you have a VendorName/ModuleName module, you should do: `cd VendorName/ModuleName`.

* `yo mage2:acl`: Creates acl file with some default rules.
* `yo mage2:menu`: Creates custom menu on Magento2 admin panel.
* `yo mage2:observer`: Creates an event observer. [Here](http://ousmanedev.github.io/magento2events) is all of the events dispatched in Magento2.
* `yo mage2:route`: Creates a route.
* `yo mage2:view`: Creates a view.
* More coming soon

### Commmands for theme
* Coming soon

'use strict';
var ModuleBase = require('../module-base.js');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');

module.exports = ModuleBase.extend({
  prompting: function() {
    var generator = this;
    return this.prompt([{
      type    : 'input',
      name    : 'eventName',
      message : 'Event Name: '
    }, {
      type    : 'input',
      name    : 'eventArea',
      message : 'Event Area (frontend, adminhtml, both): ',
      default : 'frontend'
    }, {
      type    : 'input',
      name    : 'observerName',
      message : 'Observer Name: '
    }, {
      type    : 'input',
      name    : 'observerClassPath',
      message : 'Observer Class Path: ',
      default : 'Observer/Observer.php'
    }]).then((answers) => {
      this.eventName = answers.eventName;
      this.eventArea = answers.eventArea;
      this.observerName = answers.observerName;
      this.observerClassPath = answers.observerClassPath;
    });
  },

  writing: function() {
    var generator = this;
    if(this.fs.exists(this.destinationPath(this._getEventsXmlPath()))) {
      var contents = this.fs.read(this.destinationPath(this._getEventsXmlPath()));
      parseString(contents, function(error, json) {
        if(error) {
          console.log(error);
          return;
        }
        if(json.config === undefined) {
          this._copyEventsXmlTemplate();
          return;
        }
        var builder = new xml2js.Builder();
        var observer = {'$': {name: generator.observerName, instance: generator._getObserverInstance()}};
        if(json.config.event !== undefined) {
          for (var i = 0, len = json.config.event.length; i < len; i++) {
            if( json.config.event[i].$.name == generator.eventName ) {
              json.config.event[i].observer.push(observer);
              generator._write(generator._getEventsXmlPath(), builder.buildObject(json));
              return;
            }
          }
        }
        json.config.event.push({'$': {name: generator.eventName}, observer: observer});
        generator._write(generator._getEventsXmlPath(), builder.buildObject(json));
      })
    }
    else{
      this._copyEventsXmlTemplate();
    }

    this.fs.copyTpl(
      this.templatePath('Observer.php'),
      this.destinationPath(this.observerClassPath),
      { namespace: this._getObserverNamespace() , className: this._getObserverClassName() }
    );
  },

  _getObserverNamespace: function() {
    var namespace = this.getModulePath() + '/' + this.observerClassPath.match(/[a-zA-Z0-9-_\/]*\//)[0].slice(0, -1);
    return namespace.replace(/\//g, '\\');
  },

  _getObserverClassName: function() {
    return this.observerClassPath.match(/[a-zA-Z0-9-_]*\.php/)[0].slice(0, -4);
  },

  _getObserverInstance: function() {
    return this._getObserverNamespace() + '\\' + this._getObserverClassName();
  },

  _getEventsXmlPath: function() {
    return this.eventArea == 'both' ? 'etc/events.xml' : 'etc/' + this.eventArea + '/events.xml';
  },

  _copyEventsXmlTemplate: function() {
    this.fs.copyTpl(
      this.templatePath('events.xml'),
      this.destinationPath(this._getEventsXmlPath()),
      { eventName: this.eventName, observerName: this.observerName, observerInstance: this._getObserverInstance() }
    );
  },

  _write: function(filePath, contents) {
    this.fs.write(filePath, contents);
    this.log(filePath + ' has been updated. Don\'t worry about the conflict, your previous data are kept.');
  }
});

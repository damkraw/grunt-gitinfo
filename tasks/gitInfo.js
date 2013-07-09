/*
 * grunt-gitinfo
 * https://github.com/damkraw/grunt-gitinfo
 *
 * Copyright (c) 2013 Damian Krawczyk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerTask('gitinfo', 'Your task description goes here.', function () {
    var done = this.async(),
    gitinfo = {
      local: {
        branch : {
          current : {}
        }
      },
      remote: {
        origin: {}
      }
    },
    commands = {
      'local.branch.current.name': ['rev-parse', '--abbrev-ref', 'HEAD'],
      'remote.origin.url': ['config', '--get-all', 'remote.origin.url'],
      'local.branch.current.SHA': ['rev-parse', 'HEAD'],
      'local.branch.current.shortSHA': ['rev-parse', '--short', 'HEAD'],
    };

    function work(conf_key, cb) {
      var spawn_args = commands[conf_key];

      grunt.util.spawn({
          cmd: 'git',
          args: spawn_args},
        function (err, result) {
          if (err) {
            console.warn("[gitinfo]: couldn't set config:", conf_key);
          } else {
            gitinfo[conf_key] = result.stdout;

            if (grunt.option("debug") || grunt.option("verbose")) {
              console.log("[gitinfo]:", conf_key, "=", gitinfo[conf_key]);
            }
          }

          cb();
        });
    }

    function fin() {
      grunt.config.set('gitinfo', gitinfo);
      done();
    }

    grunt.util.async.forEach(grunt.util._.keys(commands), work, fin);
  });
}

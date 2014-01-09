/*
 * grunt-gitinfo
 * https://github.com/damkraw/grunt-gitinfo
 *
 * Copyright (c) 2013 Damian Krawczyk, Corey Jewett, Maciej Lisiewski
 * Licensed under the MIT license.
 */

// JSLint
/*global module, console*/

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask('gitinfo', 'Your task description goes here.', function () {
        var done = this.async(),
            gitinfo = {},
            config = grunt.config.get('gitinfo') || {},
            commands = {
                'local.branch.current.name'             : ['rev-parse', '--abbrev-ref', 'HEAD'],
                'local.branch.current.SHA'              : ['rev-parse', 'HEAD'],
                'local.branch.current.shortSHA'         : ['rev-parse', '--short', 'HEAD'],
                'local.branch.current.currentUser'      : ['config', '--global', 'user.name'],
                'local.branch.current.lastCommitTime'   : ['log', '--format="%ai"', '-n1', 'HEAD'],
                'local.branch.current.lastCommitAuthor' : ['log', '--format="%aN"', '-n1', 'HEAD'],
                'local.branch.current.tag'              : ['describe', '--abbrev=0', '--exact-match'],
                'remote.origin.url'                     : ['config', '--get-all', 'remote.origin.url']
            },

            work = function (conf_key, cb) {
                var spawn_args = commands[conf_key];

                grunt.util.spawn(
                    {
                        cmd  : 'git',
                        args : spawn_args,
                        opts : {
                            cwd : (config.options && config.options.cwd) ? config.options.cwd : null
                        }
                    },
                    function (err, result) {
                        if (err) {
                            console.warn("[gitinfo]: couldn't set config:", conf_key);
                        } else {
                            var ref = gitinfo, keys = conf_key.split("."), i, key;
                            for (i = 0; i < keys.length - 1; i += 1) {
                                key = keys[i];

                                if (ref[key] === undefined) {
                                    ref[key] = {};
                                }

                                ref = ref[key];
                            }

                            ref[keys.pop()] = result.stdout;

                            if (grunt.option("debug") || grunt.option("verbose")) {
                                console.log("[gitinfo]:", conf_key, "=", result.stdout);
                            }
                        }
                        cb();
                    }
                );
            },

            fin = function () {
                grunt.config.set('gitinfo', gitinfo);
                done();
            };

        grunt.util.async.forEach(grunt.util._.keys(commands), work, fin);
    });
};

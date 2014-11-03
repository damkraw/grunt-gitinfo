/*
 * grunt-gitinfo
 * https://github.com/damkraw/grunt-gitinfo
 *
 * Copyright (c) 2013 Damian Krawczyk, Corey Jewett, Maciej Lisiewski, Tom Gault, kolya-ay, nerdgore, madarche, drasive
 * Licensed under the MIT license.
 */

// JSLint
/*global module, require, console*/
/*jslint nomen: true */

module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash'),
        async = require('async'),
        getobject = require('getobject');

    grunt.registerTask('gitinfo', 'Gather information about the git repository.', function () {
        var done = this.async(),
            gitinfo = {},

            // Retrieve our config object, filling in missing items with defaults.
            config = _.merge({
                options: {
                    cwd: null
                },
                commands : {
                    'local.branch.current.name'              : ['rev-parse', '--abbrev-ref', 'HEAD'],
                    'local.branch.current.SHA'               : ['rev-parse', 'HEAD'],
                    'local.branch.current.shortSHA'          : ['rev-parse', '--short', 'HEAD'],
                    'local.branch.current.currentUser'       : ['config', '--global', 'user.name'],
                    'local.branch.current.lastCommitTime'    : ['log', '--format="%ai"', '-n1', 'HEAD'],
                    'local.branch.current.lastCommitMessage' : ['log', '--format="%B"', '-n1', 'HEAD'],
                    'local.branch.current.lastCommitAuthor'  : ['log', '--format="%aN"', '-n1', 'HEAD'],
                    'local.branch.current.lastCommitNumber'  : ['rev-list', '--count', 'HEAD'],
                    'remote.origin.url'                      : ['config', '--get-all', 'remote.origin.url']
                }
            }, grunt.config.get('gitinfo')),


            work = function (conf_key, cb) {
                var spawn_args = config.commands[conf_key];

                grunt.util.spawn(
                    {
                        cmd  : 'git',
                        args : spawn_args,
                        opts : {
                            cwd : config.options.cwd
                        }
                    },
                    function (err, result) {
                        if (err) {
                            grunt.log.debug("Couldn't set config:", conf_key);
                        } else {
                            getobject.set(gitinfo, conf_key, result.stdout);

                            if (grunt.option("verbose")) {
                                // could be unnecessary
                                grunt.verbose.ok(conf_key, "=", result.stdout);
                            } else {
                                grunt.log.debug(conf_key, "=", result.stdout);
                            }
                        }
                        cb();
                    }
                );
            },

            fin = function () {
                var merged = _.defaults(gitinfo, grunt.config.get('gitinfo'));
                grunt.config.set('gitinfo', merged);
                done();
            };

        grunt.verbose.writeflags(config.options, 'config.options');

        async.each(_.keys(config.commands), work, fin);
    });
};

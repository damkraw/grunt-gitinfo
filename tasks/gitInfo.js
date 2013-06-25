/*
 * grunt-gitinfo
 * https://github.com/damkraw/grunt-gitinfo
 *
 * Copyright (c) 2013 Damian Krawczyk, Maciej Lisiewski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerTask('gitinfo', 'Your task description goes here.', function () {
        var done = this.async(),
        gitinfo = grunt.config.get('gitinfo'),

        getCurrentBranchName = function () {
            grunt.util.spawn({
                cmd : 'git',
                args : ['rev-parse', '--abbrev-ref', 'HEAD'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.local.branch.current.name = result.stdout;
                    grunt.config.set('gitinfo', gitinfo);
                    done();
                }
            });
        },

        getRemoteOriginUrl = function () {
            grunt.util.spawn({

                cmd : 'git',
                args : ['config', '--get-all', 'remote.origin.url'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.remote = {
                        origin : {
                            url : result.stdout
                        }
                    };
                    getCurrentBranchName();
                }
            });
        },

        getLastCommitTime = function () {
            grunt.util.spawn({
                cmd : 'git',
                args : ['log', '--format="%ai"', '-n1', 'HEAD'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.local.branch.current.lastCommitTime = result.stdout;
                    getRemoteOriginUrl();
                }
            });
        },
        getLastCommitAuthor = function () {
            grunt.util.spawn({
                cmd : 'git',
                args : ['log', '--format="%aN"', '-n1', 'HEAD'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.local.branch.current.lastCommitAuthor = result.stdout;
                    getLastCommitTime();
                }
            });
        },
        getShortSHA = function () {
            grunt.util.spawn({
                cmd : 'git',
                args : ['rev-parse', '--short', 'HEAD'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.local.branch.current.shortSHA = result.stdout;
                    getLastCommitAuthor();
                }
            });
        },
        getSHA = function () {
            grunt.util.spawn({
                cmd : 'git',
                args : ['rev-parse', 'HEAD'],
                opts : {
                    cwd : gitinfo.options.cwd
                }
            }, function (err, result) {
                if (err) {
                    done();
                } else {
                    gitinfo.local = {
                       branch : {
                           current : {
                               SHA : result.stdout
                           }
                       }
                    };
                    getShortSHA();
                }
            });
        };
        getSHA();
    });
};

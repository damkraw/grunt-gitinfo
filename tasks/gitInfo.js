/*
 * grunt-gitInfo
 * https://github.com/damkraw/grunt-gitInfo
 *
 * Copyright (c) 2013 Damian Krawczyk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerTask('gitInfo', 'Your task description goes here.', function () {
        var done = this.async(),
            gitInfo = {},

            getCurrentBranchName = function () {
                grunt.util.spawn({
                    cmd : 'git',
                    args : ['rev-parse', '--abbrev-ref', 'HEAD']
                }, function (err, result) {
                  if (err) {
                      done();
                  } else {
                      gitInfo.local.branch.current.name = result.stdout;
                      grunt.config.set('gitInfo', gitInfo);
                      done();
                  }
                });
            },

            getRemoteOriginUrl = function () {
                grunt.util.spawn({
                    cmd : 'git',
                    args : ['config', '--get-all', 'remote.origin.url']
                }, function (err, result) {
                    if (err) {
                        done();
                    } else {
                        gitInfo.remote = {
                            origin : {
                                url : result.stdout
                            }
                        };
                        getCurrentBranchName();
                    }
                });
            },

            getShortSHA = function () {
                grunt.util.spawn({
                    cmd : 'git',
                    args : ['rev-parse', '--short', 'HEAD']
                }, function (err, result) {
                    if (err) {
                        done();
                    } else {
                        gitInfo.local.branch.current.shortSHA = result.stdout;
                        getRemoteOriginUrl();
                    }
                });
            },
            getSHA = function () {
                grunt.util.spawn({
                    cmd : 'git',
                    args : ['rev-parse', 'HEAD']
                }, function (err, result) {
                    if (err) {
                        done();
                    } else {
                        gitInfo.local = {
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

'use strict';

var assert = require('assert');
var grunt = require('grunt');

grunt.initConfig({
    gitinfo: {
        commands: {
            'custom.literal\\.key': ['status']
        }
    }
});

grunt.util.spawn = function (options, callback) {
    var stdout = options.args[0] === 'status' ? 'custom output' : 'Git text with a literal <% opener';
    process.nextTick(function () {
        callback(null, {stdout: stdout});
    });
};

grunt.loadTasks('tasks');
grunt.registerTask('verifyGitinfo', function () {
    var path = 'gitinfo.local.branch.current.lastCommitMessage';
    var expected = 'Git text with a literal &lt;% opener';

    assert.strictEqual(grunt.config.get(path), expected);
    assert.strictEqual(grunt.template.process('<%= ' + path + ' %>'), expected);
    assert.strictEqual(grunt.config.get(['gitinfo', 'custom', 'literal.key']), 'custom output');
});

grunt.task.options({error: function (error) {
    throw error;
}});
grunt.task.run('gitinfo', 'gitinfo', 'verifyGitinfo');
grunt.task.start({asyncDone: true});

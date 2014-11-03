# grunt-gitinfo

> Get Git info from a working copy and populate grunt.config with the data

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gitinfo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gitinfo');
```

## The "gitinfo" task

### Overview
Inspired by grunt-svninfo. In your project's Gruntfile, add a section named `gitinfo` to the data object passed into `grunt.initConfig()`.
Executing the task will populate grunt.config.gitinfo with repository data described below. You can use gitinfo object in your build as e.g. `<%= gitinfo.local.branch.current.SHA %>`.
The resulting `gitinfo` object has the following structure:


```js
{
    local : {
        branch : {
            current : {
                SHA               : "Current HEAD SHA",
                shortSHA          : "Current HEAD short SHA",
                name              : "Current branch name",
                currentUser       : "Current git user" ,
                lastCommitTime    : "Last commit time",
                lastCommitMessage : "Last commit message",
                lastCommitAuthor  : "Last commit author",
                lastCommitNumber  : "Last commit number"
            }
        }
    },
    remote : {
        origin : {
            url : "Branch Url"
        }
    },
    (custom command values)
}
```

### Options

#### cwd
Type: `String`

Allows to specify a cwd (current working directory) path repository. The default directory is the where you run grunt from (`'.'`).

Example:
``` js
gitinfo: {
    options: {
        cwd: './myproject/ishere'
    },
    ...
}
```

### Custom commands

Type: `Object`

Allows to specify a custom git command.

Example:
``` js
gitinfo: {
    commands: {
        'my.custom.command' : ['arg1', 'arg2', (...)] // git arg1 arg2 (...)
    }
}
```

This will populate `<%= gitinfo.my.custom.command %>` with `git arg1 arg2` output.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.7
-----
- \#19 Added the command lastCommitMessage
- \#18 Update dependencies
- \#17 Fix JSHint warnings about if-else braces

0.1.6
-----
- Removed tag from commands list
- \#13 Adding lastCommitNumber command
- \#12 Logging through grunt.log API
- \#9 Extend existing gitinfo config




# grunt-gitInfo

> Get Git info from a working copy and populate grunt.config with the data

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gitInfo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gitInfo');
```

## The "gitInfo" task

### Overview
In your project's Gruntfile, add a section named `gitInfo` to the data object passed into `grunt.initConfig()`.
Executing the task will populate grunt.config.gitInfo with repository data described below. You can use gitInfo object in your build as e.g. `<%= gitInfo.local.branch.current.SHA %>`.
The resulting `gitInfo` object has the following structure:


```js
{
    local : {
        branch : {
            current : {
                SHA      : "Current HEAD SHA",
                shortSHA : "Current HEAD short SHA",
                name     : "Current branch name"
            }
        }
    },
    remote : {
        origin : {
            url : "Branch Url"
        }
    }
}
```

### Options

#### cwd
Type: `String`

Allows to specify a cwd (current working directory) path repository. The default directory is the where you run grunt from (`'.'`).

Example:
``` js
gruntInfo: {
  options: {
    cwd: './myproject/ishere'
  },
  ...
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

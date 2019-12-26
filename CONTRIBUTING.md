# How to contribute

I'm really glad you're reading this, because we need volunteer developers to help this project come to fruition.

## Testing

There are test suites that are run by Mocha and uses BDD expect style assertions. If you contribute code please also add some tests for the contributed functionality.

## Submitting changes

Please send a [GitHub Pull Request to dispatcher-config-generator](https://github.com/bdhoine/dispatcher-config-generator/pull/new/master) with a clear list of what you've done 
(read more about [pull requests](http://help.github.com/pull-requests/)). If you are solving an issue please refer to it in you commit message.
Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."
    
Every contribution needs to pass all linting and testing. Pull requests with failing tests or failing static code analysis will not be merged.

## Coding conventions

Start reading our code and you'll get the hang of it. We optimize for readability:

  * We indent using two spaces (soft tabs)
  * Most of the coding conventions are enforced by the linters

Thanks,

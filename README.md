# Nodepal

## A Drupal integration layer for Node.js developers

This is a module that allows the integration of a Drupal installation with a custom Node.js app. It provides an API so
that Node.js developers can directly read and write in Drupal's repository, using constracts like node, user,
permission, etc., with having to worry about the underlying implementation and setup of the Drupal installation.


## Use Cases

- You have a working Drupal installation, with users, content, etc. and would like to add real-time services like chat,
etc. The usual Apache-PHP-MySQL setup might not the best suited for this kind of apps, so you can develop you app in
Node.js and hook it up to your Drupal, using the Nodelpal integration layer.

- You want to build a new Node.js app, that has some notion of users, roles, permissions or content and would
like to use Drupal's user, roles, permissions, content model and its great administrative interface, without having to
 build everything from scratch.

- You want to build a new Node.js app and combine it with Drupal because there is some Drupal module that you find
useful. E.g. you can add a Drupal forum, a Blog, or expose some content as a Web Service, or search it with Apache Solr.
There is a Drupal module for everything :)

## Current limitations

At the time of this writing, Nodepal is:

- Read-only
- Works only with MySQL,
- Provides a limited set of function (which can be easily extended),
- Works only for Drupal v6 (but it's veru easy to go v7),
- Doesn't work with memcache setups (wanna contribute?),

## Examples

See demo.js. In order for it to work, you need both Node.js and Drupal on teh same domain in order to share the session
cookie. Also you must first create a user in Drupal, who has both roles and permissions. After first login into Drupal
(sessions cookie created), launch demo.js and see if your Drupal data are available in Node.js.

## Install

###Via git (preffered):

    $ git clone http://github.com/synodinos/nodepal.git

###Via npm (package might be older):

    $ npm install nodepal

The only requirements are node and npm.

You must have already downladed and installed node and [node-mysql](https://github.com/felixge/node-mysql).

## FAQ

### Why not have a Drupal Module, directly serve JSON to Node.js

Putting a PHP stack, between your data repository and Node.js might introduce a significant bottleneck. Nodepal is based
on the idea that Node.js integrates with Drupal directly on the DB layer, for maximum performance!

### I need to read/write X from/to my Drupal installation but there is no function in the Nodepal API for that.

Drupal has a huge API and it's not possible to replicate it in Node.js. Nodepal aims to grow organically, adding new
functionality, depending on what I need for my projects or what its users request. You can always develop your own
 functionality using the current as template, or open a ticket and I'll try to add it.

## Who's using it

I'll try to keep track of 3rd party projects that are using Nodepal:

-LimitedList: "Community Rankings for Everything", [service](http://limitedlist.com/) , [discussion](http://www.reddit.com/r/programming/comments/f0k70/drupal_nodejs_weekend_hack_review_and_ama/c1cho3p)

## Support

Email me and I'll see what I can do.
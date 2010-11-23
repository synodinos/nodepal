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

###Via npm:

    $ npm install nodepal

The only requirements are node and npm.

###Via git:

    $ git clone http://github.com/synodinos/nodepal.git

You must have already downladed and installed node and [node-mysql](https://github.com/felixge/node-mysql).

## Support

Email me and I'll see what I can do.



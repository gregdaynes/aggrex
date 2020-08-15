# Picking a framework to handle HTTP/S routing

* Status: proposed
* Deciders: Gregory Daynes <gregdaynes@gmail.com
* Date: 2020-08-01

## Context and Problem Statement

Handling receiving and responding to HTTP based requests for both API and web based interactions.

## Decision Drivers

* Minimal overhead on request
* Connect based middleware
* Unoppinionated organization
* In depth resources and education material available
* Permissive license

## Considered Options

* Express
* Restify
* Fastify
* Koa
* Sails

## Decision Outcome

Chosen option: "Express", because it has been around the longest, is known throughout the NodeJS community, and satisfies the descision drivers.


### Positive Consequences

* Reliable and quick (not the fastest) http framework
* Minimal footprint, can be replaced with little effort
* Uses common Connect style middleware
* Actively maintained

### Negative Consequences

* Old code base
* Version 5 has been in alpha for more than 5 years
* Not the fastest

## Pros and Cons of the Options

### Express

* Quick but not fast
* Mature API
* Is a layer on top of Node's HTTP library
* Connect based middleware
* Huge user base
* Lots of documentation online
* Legacy codebase that is maintained but does not seem to be going anywhere

### Restify

* Quick but not fast
* Connect based middleware
* Layer on top of Node's HTTP Library
* Big names like Joyent, Netflix, and NPM use it
* First party documentation is verbose
* Actively maintained
* Baked in Dtrace probes for debugging

### Fastify

* Very fast (maybe the fastest)
* Rich ecosystem of plugins
* Connect based middleware
* Layer on top of Node's HTTP Library
* Baked in JSON Schema, validation, serialization
* Focus on performance
* Lead developer on TSC for NodeJS

### Koa

* Fast
* Based on generators for efficient event loop usage out of the box
* Dwindiling ecosystem of plugins/support/compatibility
* Context based middleware
* Layer on top of Node's HTTP Library

### Sails

* Oppinionated MVC Framework similar to Rails
* Baked in ORM

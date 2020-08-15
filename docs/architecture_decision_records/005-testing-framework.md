# Testing Framework

* Status: accepted
* Deciders: Gregory Daynes <gregdaynes@gmail.com>
* Date: 2020-08-02

## Context and Problem Statement

A reliable and fluent testing framework that supports modern Javascript syntax, BDD/TDD styles, expectation/should, snapshots, doubles and coverage.

## Decision Drivers

* Speed
* Customizability
* TDD/BDD - Expect/Should
* Test Doubles
* Code Coverage

## Considered Options

* JestJS
* Mocha + Chai/Sinon/NYC
* Ava

## Decision Outcome

Chosen option: "Mocha + Chai/Sinon/NYC", because it is flexible in configuration and setup, test, and teardown is faster than JestJS by an order of magnitude.

### Positive Consequences

* Fluent testing interface
* Modern code support
* Tests that can leverage context of the tests around it (if necessary)
* Extremely fast
* Customizable

### Negative Consequences

* Less support testing frontend applications
* Batteries not included

## Pros and Cons of the Options

### JestJS

* Familiar interface
* Baked in doubles, coverage, expectations
* Slow setup and tear down speed
* Tests have difficulting with context around test
* JSDom can influence non-dom-tests
* Non parallelizable tests

### Mocha + Chai/Sinon/NYC

* Familiar interface
* Fast
* Extendable and customizable
* Parallel test runs
* Requires dependency for testing style (if not using NodeJS Assert)
* Requires dependency for coverage tool
* Requires dependency for doubles
* Does not support ES Modules in parallel mode

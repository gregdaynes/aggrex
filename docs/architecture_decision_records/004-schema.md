# Object Schema & Validation

* Status: proposed
* Deciders: Gregory Daynes
* Date: 2020-08-02

## Context and Problem Statement

Requirements of a legible schema and validation tool for handling IO validation and internal document handling.

## Decision Drivers

* Common Standard
* Readable
* Data Coercsion (nice to have)

## Considered Options

* Joi
* AJV

## Decision Outcome

Chosen option: "AJV", because it implements the JSON Schema spec which allows the schema to be written for other languages without a translation/adapter.

### Positive Consequences

* Flexible design to create legible schemas
* Data Coercion
* Follows JSON Schema Draft 7

### Negative Consequences

* Initial implementation difficulty

## Pros and Cons of the Options

### JOI

* Simple, easy to write syntax
* Does not conform to JSON Schema
* Part of HAPI JS which is looking for maintainers

### AJV

* Flexible design to create legible schemas
* Data Coercion
* Follows JSON Schema Draft 7
* Initial implementation difficulty

# Code Linter and Formatter

* Status: accepted
* Deciders: Gregory Daynes <gregdaynes@gmail.com>
* Date: 2020-08-01

## Context and Problem Statement

Remove bias and preference on styling and formatting of code through programmatic reinforcement.

## Decision Drivers

* Extendable/customizable
* Supported
* Permissive licence
* Automatic code formatting
* Editor plugins to alert programmer of syntax issues

## Considered Options

* ESLint
* TSLint
* Prettier

## Decision Outcome

Chosen option: "ESLint", because it meets the decision drivers.

### Positive Consequences <!-- optional -->

* Well known
* Lots of big name support / backing
* Can customize all rules as necessary
* Can utilize pre-configured rulesets

### Negative Consequences <!-- optional -->

* Can be over configured

## Pros and Cons of the Options <!-- optional -->

### Eslint

* Well known
* Lots of big name support / backing
* Can customize all rules as necessary
* Can utilize pre-configured rulesets
* Can be over configured

### TSLint

Ineligible for being a Palantir product. Deprecated 2019.

### Prettier

* Good formatting
* Limited customizability
* Less common plugins for editors and real time linting

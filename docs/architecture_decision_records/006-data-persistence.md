# Data Persistence

* Status: proposed
* Deciders: Gregory Daynes <gregdaynes@gmail.com>
* Date: 2020-08-02

## Context and Problem Statement

Determine a data persistence mechanism & product.

## Decision Drivers <!-- optional -->

* Fast
* ACID Compliance
* Simple to use

## Considered Options

* Postgres
* MongoDB

## Decision Outcome

Chosen option: "MongoDB", because its been a while (1.x) since I've used it. This is more of a test to see if it's a resonable option yet.

Once the data structures are more rigid, re-evaluation of solutions should be made. Code and tooling should be built in a way that makes the replacement of the system painless (Repo / DAL patterns).

### Positive Consequences <!-- optional -->

* Record structure is not defined up front (No contracts)
* Fast / Efficient storage and usage
* Simple API that can grow with needs
* Meets decision drivers
* Flexible
* JSON Data querying is easy

### Negative Consequences <!-- optional -->

* A joke to most programmers/tech scenes
* A little too loose on the data going in and out, application has to do more work.

## Pros and Cons of the Options <!-- optional -->

### Postgres

* Fast
* Familiar
* Efficient
* Requires design decisions on data structure upfront, unless using lots of JSONB columns.
* Querying JSONB is frustrating compared to other column types eg: `->>`
* Clients in NodeJS are either Overpowered / Complex or bare bones
* CLI administration is painful, no great cross platform guis

### MongoDB

* Fast
* Data structures are familiar (JSON)
* Documentation is great
* First party gui for administration
* Joke to most tech enthusiasts
* Security issues in prior versions
* Loose document constraints allow for making a mess

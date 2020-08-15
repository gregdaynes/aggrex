# Directory Structure

* Status: accepted
* Deciders: Gregory Daynes <gregdaynes@gmail.com>
* Date: 2018-08-01

Technical Story: Organization structure for files within application and supporting (resources, docs, etc)

## Context and Problem Statement

The organization of an applications files is complicated, with application code (the good stuff), the supporting interfaces (web / apis), to the supporting resource: documentation, tooling/scripts, infrastructure/devops, wikis. A level of organization is required that separates each concern without getting in the way of the people developing, maintaining, and supporting the application.

## Considered Options

* MVC
* Organic (let it happen)
* Components / Layers

## Decision Outcome

Chosen option: "Components / Layers", because it clearly defines boundaries/concerns of each area beyond the scope of MVC. Source code that is required for the application to run belongs in /src, where as everything else that works around the application is in the root directory. This can also be extended to have build directories, or design documentation.

### Positive Consequences

* At a glance, you can see where each area of concern lies.

### Negative Consequences <!-- optional -->

* Components (application code/business logic) is a loaded term these days with components that exist in the web layer. This could be mitigated with a different name.

## Pros and Cons of the Options

### MVC

Rails, Laravel, Symphony, Phoenix

Maintains 3 primary folders, Models, Views, Controllers. As well as some smaller ones for organiation Lib, Services, Tests

* Very common pattern from the late 90's early 2000. Lots of resources online
* Uniform with most web application frameworks on the market
* Does not intuitively indicate application logic area
* Commonly leads to controllers containing business logic, and models being stuffed with everything else.
* Endless debates on where to put service objects

### Organic

Write code now, organize later

* Lets the programmers put things where they feel they should go, but has no constraints.
* Fast to find things during initial development and design
* Usually ends up with prefixes and hacks to indicate files that are similar in idea but operate indepedently
* Maintaining multiple applications with this organization leads to:
* - A common directory layout for all applications (usually looks like MVC)
* - A painful onboarding experience for new team members
* - Context switching between applications can be confusing if not done regularily

### Components / Layers

Similar layouts in modern frontend frameworks, React, Angular, Vue

Allows easier conformity with "Clean Architecture (Robert Martin)"

* Separation of responsibility by boundaries
* Clearly defined directories
* Components contain the core application code (components of the application)
* API (as its name implied) contains the api layer of the application
* Web contains the web layer with html/css
* lib contains the application specific libraries which could but have not yet been promoted to a dependency module.
* Less resources out there, literature on the idea, but few concrete examples
* Not familiar coming from common frameworks (Rails/Laravel)

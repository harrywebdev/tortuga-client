# tortuga-frontend

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd tortuga-frontend`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://tortuga.frontend.test:4200](http://tortuga.frontend.test:4200).
* Visit your tests at [http://tortuga.frontend.test:4200/tests](http://tortuga.frontend.test:4200/tests).
* add `127.0.0.1  tortuga.frontend.test` to your `/etc/hosts` or remove `host` from `.ember-cli` to use localhost

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deployment is done via [ember-cli-deploy](http://ember-cli-deploy.com/). This command deploys current branch onto Alpha:

```
yarn run deploy:alpha
```

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

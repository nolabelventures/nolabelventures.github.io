# nolabelventures.github.io

This website has been created using the following technologies;

- Pinegrow
- Netlify CMS
- Jekyll / GH Pages
- GSAP
- SASS (pre-bundled by Pinegrow)

You will also find inside `/functions` code for our Github Oauth integration of Firebase Functions.

## Dependency Installation

To install all dependencies, make sure you have ruby 3.1.1 installed and run...

```
bundle install
```


## Project Start

The project uses Jekyll to load data (`/_data`) and blog posts (`/_posts`). To start pre-bundling, run...

```
bundle exec jekyll serve
```


### SASS

You may need to run SASS watch independently. If so, this is the script to run

```
sass --watch css/style.scss:_site/css/style.css
```

## Deployments

The project is deployed to Github pages and any changes to the Firebase Functions will get deployed all when pushed to the `main` branch.

## CMS

The cms can be found at [https://nolabel.ventures/admin](https://nolabel.ventures/admin) and users are required to have a Github profile with access to this repo.
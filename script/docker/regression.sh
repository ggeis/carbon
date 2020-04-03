#!/usr/bin/env bash
set -e

export COMPOSE_FILE=docker-compose-cypress-demo-site.yml

RUN_CHROME=false
RUN_FIREFOX=false

while test $# -gt 0; do
    case "$1" in
        # run regression using chrome
        --chrome)
          RUN_CHROME=true
          shift
          ;;
        # run regression using firefox
        --firefox)
          RUN_FIREFOX=true
          shift
          ;;
        *)
          break
          ;;
    esac
done

if $RUN_CHROME; then
  echo 'Running regression using chrome'
  docker-compose exec -T cypress bash -c "./node_modules/.bin/cypress run --spec './cypress/features/regression/a*.feature', './cypress/features/regression/b*.feature', './cypress/features/regression/c*.feature', './cypress/features/regression/d*.feature', './cypress/features/regression/e*.feature', './cypress/features/regression/f*.feature', './cypress/features/regression/g*.feature', './cypress/features/regression/h*.feature', './cypress/features/regression/i*.feature' --env CI=true --browser chrome --headless --reporter mocha-allure-reporter"
  docker-compose exec -T cypress bash -c "./node_modules/.bin/cypress run --spec './cypress/features/regression/k*.feature', './cypress/features/regression/l*.feature', './cypress/features/regression/m*.feature', './cypress/features/regression/n*.feature', './cypress/features/regression/o*.feature', './cypress/features/regression/p*.feature', './cypress/features/regression/q*.feature', './cypress/features/regression/r*.feature', './cypress/features/regression/s*.feature' --env CI=true --browser chrome --headless --reporter mocha-allure-reporter"
  docker-compose exec -T cypress bash -c "./node_modules/.bin/cypress run --spec './cypress/features/regression/t*.feature', './cypress/features/regression/u*.feature', './cypress/features/regression/v*.feature', './cypress/features/regression/w*.feature', './cypress/features/regression/x*.feature', './cypress/features/regression/y*.feature', './cypress/features/regression/z*.feature', './cypress/features/regression/test/*.feature', './cypress/features/regression/validations/*.feature' --env CI=true --browser chrome --headless --reporter mocha-allure-reporter"
  docker-compose exec -T cypress bash -c "./node_modules/.bin/cypress run --spec './cypress/features/regression/deprecated/*.feature', './cypress/features/regression/experimental/*.feature', './cypress/features/themes/themes.feature' --env CI=true --browser chrome --headless --reporter mocha-allure-reporter"
  docker-compose exec -T cypress bash -c "npm run generate-cypress-allure-report"
fi

if $RUN_FIREFOX; then
  echo 'Running regression using firefox'
  docker-compose exec -T cypress bash -c "./node_modules/.bin/cypress run --env CI=true --browser firefox --headless --reporter mocha-allure-reporter; npm run generate-cypress-allure-report"
fi
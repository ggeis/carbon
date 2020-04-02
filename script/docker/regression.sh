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
  docker-compose exec -T -e CI=true cypress bash -c "npm run test-cypress-regression --env CI=true; npm run generate-cypress-allure-report"
fi

if $RUN_FIREFOX; then
  echo 'Running regression using firefox'
  docker-compose exec -T -e CI=true cypress bash -c "npm run test-cypress-regression --browser firefox; npm run generate-cypress-allure-report"
fi
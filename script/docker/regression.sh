#!/usr/bin/env bash
set e+x

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
  docker run -it -v './allure-report/:/usr/src/app/allure-report' -w /app -e CI=true -u node cypress/browsers:node13.6.0-chrome80-ff72 --browser chrome
fi

if $RUN_FIREFOX; then
  echo 'Running regression using firefox'
  docker run -it -v './allure-report/:/usr/src/app/allure-report' -w /app -e CI=true -u node cypress/browsers:node13.6.0-chrome80-ff72 --browser firefox
fi
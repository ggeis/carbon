set e+x

docker run -it -v './allure-report/:/usr/src/app/allure-report' -w /app -e CI=true -u node cypress/browsers:node13.6.0-chrome80-ff72 --browser chrome
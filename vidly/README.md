1. npm i lodash
   [1...pagesCount]

2. npm i prop-types@15.6.2
   为什么要 typecheck？
   因为如果没规定 type，应该传 number，但是却传了 string，并不会报错，但实际上有错误。

3. MongoDB - docker

docker run -d --network some-network --name some-mongo \
 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
 -e MONGO_INITDB_ROOT_PASSWORD=secret \
 mongo

Connected from mongo compass:
mongodb://admin:admin@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false

## August

这个项目仅为个人使用，由于在app端采用了postgres作为数据源，因此更新数据不是特别容易。因此单独建一个数据库进行管理，然后进行同步。

### August-server

暴露api接口，供管理系统使用，首先将`.env.sample`改为`.env`，然后将其中的值替换为自己想要的。

### August manage system

主要用于常识数据管理，启动命令

```shell
cd august/

docker-compose up -d

## run migrate scripts
docker ps
docker exec -it {app_container_id}

npm run db:migrate
npm run db:seed:all

## api 
localhost:8000

## manage system
localhost:4173
```


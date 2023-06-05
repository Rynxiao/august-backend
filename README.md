## August

这个项目仅为个人使用，由于在app端采用了sqlite作为数据源，因此更新数据不是特别容易。因此单独建一个数据库进行管理，然后进行同步。

### August-server

暴露api接口，供管理系统使用

### August manage system

主要用于常识数据管理，启动命令

```shell
cd august/

docker-compose up -d

## api 
localhost:8000

## manage system
localhost:4173
```


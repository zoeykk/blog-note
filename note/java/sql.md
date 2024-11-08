### SQL 分类

| 分类 | 全称                       | 说明                                                   |
| ---- | -------------------------- | ------------------------------------------------------ |
| DDL  | Data Definition Language   | 数据定义语言，用来定义数据库对象（数据库，表，字段）   |
| DML  | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改         |
| DQL  | Data Query Language        | 数据查询语言，用来查询数据库中表的记录                 |
| DCL  | Data Control Language      | 数据控制语言，用来创建数据库用户，控制数据库的访问权限 |

- SQL 语句可以进行单行/多行书写，以分号结束
- SQL 语句中可以增加缩进/空格来增强可读性
- SQL 语句中关键字不区分大小写
- SQL 语句注释： 单行注释（--注释），多行注释（/_注释_/）

基本语法结构

```
select <字段列表> from <表名> where <条件> group by <分组字段> having <分组条件> order by <排序字段> limit <分页参数>
```

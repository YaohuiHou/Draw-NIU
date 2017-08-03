# Draw-NIU
涂牛小游戏

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 小游戏说明文档

## 请求说明
    正式接口：https://topic.360che.com
    
    调用方式：POST
    
    提交信息的时间 中文需要编码
    

## 提交信息

        域名 + /m/2017060501/addimg.aspx

#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
imginfo | string |1|图片base64
bless | string |1|祝福

#### 返回值

```
{
    result: 1,
    data: 
    {
        imgsrc: "https://img8.kcimg.cn/HW_Image/NiuImg/2017/0605/0605171511.jpg",//图片地址
        allcount: "14"//多少名
    }
}

{
    result: 0,
    data: 
    {
        mess: "错误信息"
    }
}

```


## 排名

        域名 + /m/2017060501/getrank.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
page | int |1|页数

#### 返回值

```
{
    result: 1,
    data: 
    [
        {
            rank: "1",//排名
            infoid: "14",//投票时需要
            bbsname: "vanwade",//昵称
            bbsimg: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg",/头像
            imgsrc: "https://img8.kcimg.cn/HW_Image/NiuImg/2017/0605/0605171511.jpg",//图画
            bless: "祝福",//祝福
            score: "666"//分数
        },
        ...
    ]
}

```


## 详情页

        域名 + /m/2017051701/getinfo.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
infoid | int |1|画图id

#### 返回值

```
{
    result: 1,
    data:
    {
        infoid: "14",//投票时需要
        bbsname: "vanwade",//昵称
        bbsimg: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg",//头像
        imgsrc: "https://img8.kcimg.cn/HW_Image/NiuImg/2017/0605/0605171511.jpg",//图画
        bless: "祝福",//祝福
        score: "666"//分数
        isvote:"1" //是否投过票 1：是 0：否
        votescore:"0"//投票分数
    }
}

{
    result: 1,
    data: { }
}
```


## 投票

        域名 + /m/2017051701/addvote.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
infoid | int |1|画图id
score | int |1|分数类型 0:0分 1:666  2:888

#### 返回值

```
{
    result: 1,
    data: 
    {
        mess: "提交成功"
    }
}

{
    result: 0,
    data: 
    {
        mess: "错误信息"
    }
}

```



## 个人中心

        域名 + /m/2017060501/getuser.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
page | int |1|页数
userid | int |1| 用户id 没有传的时间 获取当前用户的

#### 返回值

```
{
    result: 1,
    isget: "0",  //为1时，弹出填写电话和地址页面
    data: 
    [
        {
            rank: "1",
            infoid: "14",//投票时需要
            bbsname: "vanwade",//昵称
            bbsimg: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg",//头像
            imgsrc: "https://img8.kcimg.cn/HW_Image/NiuImg/2017/0605/0605171511.jpg",//图画
            bless: "祝福",//祝福
            score: "666"分数
        },
        ...
    ]
}

```


## 提交名称电话地址

        域名 + /m/2017060501/adduser.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
name | string |1|名称
tel | string |1|电话
address | string |1|地址

#### 返回值

```
{
    result: 1,
    data: 
    {
        mess: "提交成功"
    }
}

{
    result: 0,
    data: 
    {
        mess: "错误信息"
    }
}

```








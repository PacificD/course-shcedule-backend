# 课程表服务端API接口文档

## API V1 接口说明：

- 接口基准地址：`http://localhost:8081`
- 服务端对前端所有域开放权限
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中添加 `token` 字段提供 token 令牌
- 本API文档出现的请求参数默认不能为空
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON



## 启动：

> 1. 在文件夹的根目录打开vscode终端或其他终端
> 2. 执行： `npm install`
> 3. 依赖安装完毕后，执行：`node app.js`
> 4. 打开浏览器，进入 `http://localhost:8081`，看到网页数据，则证明后端服务启动成功
> 5. 所有的API请求都是基于 `http://localhost:8081`为根地址，如用户注册请求：`http://localhost:8081/user/register`



## 请求示例：

### 1. 注册

- JavaScript中的ajax代码：

  - ```javascript
    var XHR = new XMLHttpRequest()
    XHR.open("POST","http://localhost:8081/user/register",false)
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    XHR.send("username=user&password=123456") //传参
    console.log(JSON.parse(XHR.responseText))
    ```

  - 在浏览器F12控制台可以看到后端返回的消息

### 2. 请求需要权限的接口（带上token）

- 注册成功后，登录获取token

  - 登录成功后的返回结果：

    ```json
    {
        "statusCode": 200,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0"
        },
        "message": "success"
    }
    ```

- 这里使用获取用户的所有课程分类为例子，

  - ```javascript
    var XHR = new XMLHttpRequest()
    XHR.open("GET","http://localhost:8081/classify",false)
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    XHR.setRequestHeader("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0")
    XHR.send()
    console.log(JSON.parse(XHR.responseText))
    ```

- 返回结果：

  - ```json
    {
        "statusCode": 200,
        "data": [
            {
                "id": "45be0080-ac4a-11ec-b04d-0bf819bbfaac",
                "course": "人工智能",
            },
            {
                "id": "e1e1a741-ac3c-11ec-91fc-dd21b53c1b29",
                "course": "计算机网络",
            },
            {
                "id": "e1e1ce50-ac3c-11ec-91fc-dd21b53c1b29",
                "course": "概率论与数理统计",
            }
        ],
        "message": "success"
    }
    ```

### 3. restful请求

- 这里用删除一个课程分类接口为例子

- restful请求：

  - 请求路径：`/classify/:classifyId`，/classify加课程分类ID
  - 如删除课程分类请求：`/classify/45be0080-ac4a-11ec-b04d-0bf819bbfaac`，请求方法为`DELETE`，在路径后加上课程分类的ID
  - 类似这种的，称之为restful API

- ```javascript
  var XHR = new XMLHttpRequest()
  XHR.open("DELETE","http://localhost:8081/classify/45be0080-ac4a-11ec-b04d-0bf819bbfaac",false)
  XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  XHR.setRequestHeader("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0")
  XHR.send()
  console.log(JSON.parse(XHR.responseText))
  ```

- 返回结果：

  - ```json
    {
        "statusCode": 200,
        "data": "删除成功",
        "message": "success"
    }
    ```



## 支持的请求方法：

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。



## 通用返回状态说明：

| *状态码* | *含义*                | *说明*                             |
| -------- | --------------------- | ---------------------------------- |
| 200      | OK                    | 请求成功                           |
| 201      | CREATED               | 创建成功                           |
| 204      | DELETED               | 删除成功                           |
| 400      | BAD REQUEST           | 请求的语法错误或者包含不支持的参数 |
| 401      | UNAUTHORIZED          | 未授权，请求要求用户的身份认证     |
| 403      | FORBIDDEN             | 被禁止访问                         |
| 404      | NOT FOUND             | 请求的资源不存在                   |
| 500      | INTERNAL SERVER ERROR | 服务器内部错误                     |



## API列表：

### 1. 用户模块

#### 1.1 注册接口

- 请求路径：`/user/register`

- 请求方法：`post`

- 是否需要token：否

- 请求参数：

  - | **参数名** | **参数说明** | 备注               |
    | ---------- | ------------ | ------------------ |
    | username   | 用户名       | 长度在2~16字符之间 |
    | password   | 密码         | 长度在2~16字符之间 |

- 响应参数：

  - | **参数名** | **参数说明** | 备注 |
    | ---------- | ------------ | ---- |
    | id         | 用户ID       |      |
    | username   | 用户名       |      |

- 响应数据：

  - ```json
    {
        "statusCode": 201,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user"
        },
        "message": "success"
    }
    ```

#### 1.2 登录接口

- 请求路径：`/user/login`

- 请求方法：`post`

- 是否需要token：否

- 请求参数：

  - | **参数名** | **参数说明** | 备注                         |
    | ---------- | ------------ | ---------------------------- |
    | username   | 用户名       | 不能为空，长度在2~16字符之间 |
    | password   | 密码         | 不能为空，长度在2~16字符之间 |

- 响应参数：

  - | **参数名** | **参数说明** | 备注                                                   |
    | ---------- | ------------ | ------------------------------------------------------ |
    | id         | 用户ID       |                                                        |
    | username   | 用户名       |                                                        |
    | token      | 令牌         | 用户身份的凭证，在请求需要权限的接口时需要在请求头加上 |

- 响应数据：

  - ```json
    {
        "statusCode": 200,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZTE1OTIwLWFjM2MtMTFlYy05MWZjLWRkMjFiNTNjMWIyOSIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjEzOTE0LCJleHAiOjE2NDgzMDAzMTR9.04KvKYNZAmxX8w-85MO40VaJscDxfMFPZ-F0pNLEUPQ"
        },
        "message": "success"
    }
    ```



### 2. 课程模块

#### 2.1 获取某周的课表

- 请求路径：`/course/:week`

- 请求方法：`get`

- 是否需要token：是

- 请求参数：

  - | **参数名** | 参数说明     | **备注**                                                     |
    | ---------- | ------------ | ------------------------------------------------------------ |
    | week       | 周数（1~20） | 在请求url处加上，如请求第三周的课表："http://localhost:8081/course/3" |

- 响应参数：

  - 一个包含那一周7天课程表的数组：

    - | **参数名** | 参数说明           | **备注** |
      | ---------- | ------------------ | -------- |
      | date       | 星期几             |          |
      | courses    | 包含当天数据的数组 |          |

- 响应数据：

  - ```JSON
    [
            {
                "date": "Monday",
                "courses": [
                    {
                        "id": "e1e577d1-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "计算机组成原理",
                        "classifyId": "e1e1ce54-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "16:30",
                        "endTime": "18:05",
                        "location": "教2-219"
                    }
                ]
            },
            {
                "date": "Tuesday",
                "courses": [
                    {
                        "id": "e1e577d2-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "操作系统",
                        "classifyId": "e1e1ce51-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "10:25",
                        "endTime": "12:00",
                        "location": "教1-314"
                    },
                    {
                        "id": "e1e577d3-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "计算机网络",
                        "classifyId": "e1e1a741-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "16:30",
                        "endTime": "18:05",
                        "location": "教2-218"
                    }
                ]
            },
            {
                "date": "Wednesday",
                "courses": []
            },
            {
                "date": "Thrusday",
                "courses": [
                    {
                        "id": "e1e577d7-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "大学英语",
                        "classifyId": "e1e1ce55-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "16:30",
                        "endTime": "18:05",
                        "location": "教1-202"
                    }
                ]
            },
            {
                "date": "Friday",
                "courses": [
                    {
                        "id": "e1e577d9-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "高等数学",
                        "classifyId": "e1e1ce5d-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "08:30",
                        "endTime": "10:05",
                        "location": "教3-305"
                    },
                    {
                        "id": "e1e59ee0-ac3c-11ec-91fc-dd21b53c1b29",
                        "course": "JAVA程序设计",
                        "classifyId": "e1e1ce52-ac3c-11ec-91fc-dd21b53c1b29",
                        "startTime": "14:40",
                        "endTime": "16:15",
                        "location": "教2-223"
                    }
                ]
            },
            {
                "date": "Saturday",
                "courses": []
            },
            {
                "date": "Sunday",
                "courses": []
            }
    ]
    ```

#### 2.2 添加一个课程

- 请求路径：`/course`

- 请求方法：`post`

- 是否需要token：是

- 请求参数：

  - | **参数**   | 参数说明       | **备注**                   |
    | ---------- | -------------- | -------------------------- |
    | week       | 周数           | 1 ~ 20                     |
    | date       | 星期几         | 1 ~ 7                      |
    | classifyId | 课程分类的ID   |                            |
    | startTime  | 课程开始的时间 | 格式如："2020-02-21 10:25" |
    | endTime    | 课程结束的时间 | 格式如："2020-02-21 12:00" |
    | location   | 上课地点       |                            |

- 响应参数：无

- 响应数据：

  - ```json
    {
        "statusCode": 201,
        "data": "添加成功!",
        "message": "success"
    }
    ```


#### 2.3 更新一个课程信息

- 请求路径：`/course`

- 请求方法：`patch`

- 是否需要token：是

- 请求参数：

  - | **参数**   | 参数说明       | **备注**                   |
    | ---------- | -------------- | -------------------------- |
    | id         | 课程ID         |                            |
    | classifyId | 课程分类的ID   |                            |
    | startTime  | 课程开始的时间 | 格式如："2020-02-21 10:25" |
    | endTime    | 课程结束的时间 | 格式如："2020-02-21 12:00" |
    | location   | 上课地点       |                            |

- 响应参数：无

- 响应数据：

  - ```json
    {
        "statusCode": 200,
        "data": "更新成功!",
        "message": "success"
    }
    ```


#### 2.4 删除一个课程

- 请求路径：`/course/:courseId`

- 请求方法：`delete`

- 是否需要token：是

- 请求参数：

  - | **参数** | **参数说明** | **备注** |
    | -------- | ------------ | -------- |
    | courseId | 课程ID       |          |

- 响应参数：无

- 响应数据：

  - ```json
    {
        "statusCode": 200,
        "data": "删除成功!",
        "message": "success"
    }
    ```




### 3. 课程分类模块

#### 3.1 获取所有课程分类

- 请求路径：`/classify`

- 请求方法：`get`

- 是否需要token：是

- 请求参数：无

- 响应参数：

  - 一个包含所有课程分类的数组：

    - | **参数** | **参数说明** | **备注** |
      | -------- | ------------ | -------- |
      | id       | 课程分类ID   |          |
      | course   | 课程名       |          |

- 响应数据：

  - ```json	
    {
        "statusCode": 200,
        "data": [
            {
                "id": "e1e1a740-ac3c-11ec-91fc-dd21b53c1b29",
                "course": "人工智能",
            },
            {
                "id": "e1e1a741-ac3c-11ec-91fc-dd21b53c1b29",
                "course": "计算机网络",
            },
            {
                "id": "e1e1ce50-ac3c-11ec-91fc-dd21b53c1b29",
                "course": "概率论与数理统计",
            }
        ],
        "message": "success"
    }
    ```


#### 3.2 新增一个课程分类

- 请求路径：`/classify`

- 请求方法：`post`

- 是否需要token：是

- 请求参数：

  - | **参数** | **参数说明** | 备注 |
    | -------- | ------------ | ---- |
    | course   | 课程分类名称 |      |

- 响应参数：

  - | **参数** | **参数说明** | 备注 |
    | -------- | ------------ | ---- |
    | id       | 课程分类ID   |      |
    | course   | 课程分类名称 |      |

- 响应数据：

  - ```json
    {
        "statusCode": 201,
        "data": {
            "id": "f2bece60-ac43-11ec-a282-2d5d388b66fa",
            "course": "美术",
        },
        "message": "success"
    }
    ```


#### 3.3 删除一个课程分类

- 请求路径：`/classify/:classifyId`

- 请求方法：`delete`

- 是否需要token：是

- 请求参数：

  - | **参数**   | **参数说明** | **备注** |
    | ---------- | ------------ | -------- |
    | classifyId | 课程分类的ID |          |

- 响应参数：无

- 响应数据：

  - ```json
    {
        "statusCode": 200,
        "data": "删除成功",
        "message": "success"
    }
    ```
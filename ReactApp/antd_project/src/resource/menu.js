const menuList = [
    {
        "id":18,
        "name":"首页",
        "type":0,
        "url":"/home",
        "perms":"home",
        "parentId":null,
        "parentName":null,
        "sort":0,
        "icon":"home",
        "isenable":1,
        "createTime":"2019-04-11 10:49:28",
        "modifyTime":"2019-04-11 10:53:24",
    },
    {
        "id":1,
        "name":"系统管理",
        "type":0,
        "url":"/manager",
        "perms":"",
        "parentId":null,
        "parentName":null,
        "sort":1,
        "icon":"setting",
        "isenable":1,
        "createTime":"2019-01-04 11:47:59",
        "modifyTime":"2019-04-11 11:24:50",
        "children":[
            {
                "id":7,
                "name":"模块管理",
                "type":1,
                "url":"/manager/moudle",
                "perms":"xtgl_mkgl",
                "parentId":1,
                "parentName":"系统管理",
                "sort":0,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:50:40",
                "modifyTime":"2019-04-11 10:44:49",
            },
            {
                "id":8,
                "name":"权限管理",
                "type":1,
                "url":"/manager/permission",
                "perms":"xtgl_qxgl",
                "parentId":1,
                "parentName":"系统管理",
                "sort":1,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:51:08",
                "modifyTime":"2019-04-11 10:44:54",
            },
            {
                "id":9,
                "name":"角色管理",
                "type":1,
                "url":"/manager/role",
                "perms":"xtgl_jsgl",
                "parentId":1,
                "parentName":"系统管理",
                "sort":2,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:51:44",
                "modifyTime":"2019-04-11 10:45:00",
            },
            {
                "id":10,
                "name":"NC管理",
                "type":1,
                "url":"/manager/nc",
                "perms":"xtgl_ncgl",
                "parentId":1,
                "parentName":"系统管理",
                "sort":3,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:52:18",
                "modifyTime":"2019-04-11 10:45:01",
            },
            {
                "id":11,
                "name":"用户授权",
                "type":1,
                "url":"/manager/setRole",
                "perms":"xtgl_yfsq",
                "parentId":1,
                "parentName":"系统管理",
                "sort":4,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:53:15",
                "modifyTime":"2019-04-11 10:45:07",
            }
        ]
    },
    {
        "id":3,
        "name":"数据统计",
        "type":0,
        "url":"/datasta",
        "perms":"",
        "parentId":null,
        "parentName":null,
        "sort":3,
        "icon":"dot-chart",
        "isenable":1,
        "createTime":"2019-01-04 11:48:54",
        "modifyTime":"2019-04-11 11:24:55",
        "children":[
            {
                "id":14,
                "name":"基础数据统计",
                "type":1,
                "url":"/datasta/baseData",
                "perms":"sjtj_jcsj",
                "parentId":3,
                "parentName":"数据统计",
                "sort":0,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:55:33",
                "modifyTime":"2019-04-11 10:48:01",

            },
            {
                "id":15,
                "name":"单据数据统计",
                "type":1,
                "url":"/datasta/baseData",
                "perms":"sjtj_djsj",
                "parentId":3,
                "parentName":"数据统计",
                "sort":1,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:56:15",
                "modifyTime":"2019-04-11 10:48:02",
            }
        ]
    },
    {
        "id":4,
        "name":"日志管理",
        "type":0,
        "url":"/log",
        "perms":"",
        "parentId":null,
        "parentName":null,
        "sort":4,
        "icon":"project",
        "isenable":1,
        "createTime":"2019-01-04 11:49:15",
        "modifyTime":"2019-04-11 11:24:56",
    },
    {
        "id":5,
        "name":"内容管理",
        "type":0,
        "url":"/content",
        "perms":"",
        "parentId":null,
        "parentName":null,
        "sort":5,
        "icon":"appstore",
        "isenable":1,
        "createTime":"2019-01-04 11:49:40",
        "modifyTime":"2019-04-11 11:25:00",
        "children":[
            {
                "id":16,
                "name":"首页轮播",
                "type":1,
                "url":"/content/banner",
                "perms":"nrgl_sylb",
                "parentId":5,
                "parentName":"内容管理",
                "sort":2,
                "icon":null,
                "isenable":1,
                "createTime":"2019-01-04 11:57:15",
                "modifyTime":"2019-04-11 10:48:21",
            }
        ]
    }
];
export default menuList;
/*
 Navicat Premium Data Transfer

 Source Server         : mongodb
 Source Server Type    : MongoDB
 Source Server Version : 50006
 Source Host           : localhost:27017
 Source Schema         : realworld

 Target Server Type    : MongoDB
 Target Server Version : 50006
 File Encoding         : 65001

 Date: 23/03/2022 21:15:18
*/


// ----------------------------
// Collection structure for usermenus
// ----------------------------
db.getCollection("usermenus").drop();
db.createCollection("usermenus");

// ----------------------------
// Documents of usermenus
// ----------------------------
db.getCollection("usermenus").insert([ {
    _id: ObjectId("621c9d60642d00001a006835"),
    role: "student",
    menus: [
        {
            icon: "Menu",
            name: "课程安排",
            type: 1,
            children: [
                {
                    name: "今日课表",
                    type: 2,
                    url: "/main/class/todayClass"
                },
                {
                    name: "课程计划",
                    type: 2,
                    url: "/main/class/classPlan"
                }
            ]
        },
        {
            icon: "Calendar",
            name: "学习计划",
            type: 1,
            children: [
                {
                    name: "今日打卡",
                    type: 2,
                    url: "/main/studyPlan/signIn"
                },
                {
                    name: "课程笔记",
                    type: 2,
                    url: "/main/studyPlan/classNote"
                }
            ]
        },
        {
            icon: "Monitor",
            type: 1,
            name: "公告安排",
            children: [
                {
                    name: "信息公告",
                    type: 2,
                    url: "/main/notice"
                }
            ]
        },
        {
            icon: "OfficeBuilding",
            name: "系统概况",
            type: 1,
            children: [
                {
                    name: "注册人数",
                    type: 2,
                    url: "/main/system/enrollment"
                }
            ]
        },
        {
            icon: "User",
            name: "个人信息",
            type: 1,
            children: [
                {
                    name: "基本信息",
                    type: 2,
                    url: "/main/user/basic"
                },
                {
                    name: "兴趣爱好",
                    type: 2,
                    url: "/main/user/hobbies"
                }
            ]
        }
    ]
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    userid: NumberInt("1")
}, {
    name: "userid_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("621c8f88af1e43db68a4a087"),
    username: "dudulu",
    userid: "20188678",
    password: "325939e607d7b416ca1b10766b32667e",
    bio: null,
    image: null,
    role: "admin",
    createDate: ISODate("2022-02-28T09:02:00.329Z"),
    updateDate: ISODate("2022-02-28T09:02:00.329Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("621c9bc517d7c0b9086c4626"),
    username: "小明",
    userid: "20188888",
    password: "325939e607d7b416ca1b10766b32667e",
    bio: null,
    image: null,
    role: "student",
    createDate: ISODate("2022-02-28T09:54:13.049Z"),
    updateDate: ISODate("2022-02-28T09:54:13.049Z"),
    __v: NumberInt("0")
} ]);

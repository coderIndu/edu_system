<template>
  <!-- <el-input v-model="inputValue"></el-input>
  <el-button type="primary" @click="send">发送</el-button> -->
  <div class="chat">
    <div class="window">
      <!-- 聊天内容显示区域 -->
      <div class="window-container">
        <div class="window-container-head">软件一班</div>
        <!-- 聊天列表 -->
        <div class="window-container-content">
            <div :class="[userInfo.userid === user.userid ? 'content-item-self': 'content-item']" v-for="(user,index) in chat_list" :key="index">
              <el-image v-if="user.image && user.userid!==userInfo.userid" style="width: 30px; height: 30px; border-radius: 50%;" :src="user.image" :initial-index="4" fit="cover" />
              <span class="content-item-name">{{user.msg}}</span>
              <el-image v-if="user.image && user.userid===userInfo.userid" style="width: 30px; height: 30px; border-radius: 50%;" :src="user.image" :initial-index="4" fit="cover" />
            </div>
        </div>
      </div>
      <!-- 发送消息区域 -->
      <div class="window-send">
        <div class="window-send-utils">
           <Emoji @emojiClick="emojiClick"></Emoji>
        </div>
        <!-- 文本域 -->
        <div class="window-send-text">
           <textarea type="text" contenteditable="true" @keyup.enter="send" v-model="inputValue" class="input"></textarea>
        </div>
        <!-- 发送部分 -->
        <el-button class="window-send-btn" type="primary" @click.stop="send">发送</el-button>
      </div>
    </div>
    <!-- 人员列表 -->
    <div class="user-list">
      <div class="user-item" v-for="(item, index) in userList" :key="index">
        <el-image style="width: 30px; height: 30px; border-radius: 50%;" :src="item.image"/>
        <div class="user-name">{{ item.username }}</div>
      </div>
    </div>
  </div>

</template>


<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import Emoji from '@/components/common/emojs.vue'

// 设置公共数据
const store = useStore()
const socket = window.io.connect('http://114.132.229.173:5000')
const userInfo = store.state.userInfo

// 监听客户端连接
socket.on('success', (data) => {
  // 连接成功后发送人员信息
  socket.emit('into', userInfo)
})

// 监听人员退出情况
socket.on('quit', (id, list) => {
  // console.log(id, list);
  console.log(`${id}已断开连接`, list.map(item => item.username));
  userList.value = list
})

// 监听人员列表事件
socket.on('userlist', (list) => {
  console.log('人员更新了', list.map(item => item.username));
  userList.value = list
})

// 监听服务端响应事件
socket.on('resMsg', (data) => {
  // console.log(data);
  chat_list.value = data
})

// 设置data数据
const inputValue = ref("")
const url = ref("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg")
const userList = ref([])
const chat_list = ref([])

// methods部署
const send = () => {
  socket.emit('message', {...userInfo, msg:inputValue.value})
  inputValue.value = ""
}

const emojiClick = (emoji) => {
  inputValue.value += emoji
}

// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
@import url('../../common/common.less');

.el-input {
  width: 200px;
}

.chat {
  width: 80%;
  display: flex;
  height: 600px;
}

.window {
  flex: 1;
  flex-direction: column;
  border: 1px solid #f6f6f6;
  margin: 0 10px;
  .shadow();
  background-color: #fff;
  
  @height: 70%;
  &-container {
    flex: 1;
    height: @height;
    display: flex;
    flex-direction: column;
    
    position: relative;
    &-head {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 600;
      font-size: 20px;
      border-bottom: 1px solid #ccc;
    }
    
    &-content {
      overflow: auto;
    }
    .content-item, .content-item-self {
      display: flex;
      align-items: center;
      margin: 20px;
      
      &-name {
        margin: 0 5px;
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
        background: #12b7f5;
        border-radius: 10px;
        color: #fff;
      }
    }

    .content-item-self {  // 自己的聊天显示
      justify-content: flex-end;
    }
  }

  &-send {
    border-top: 1px solid #ccc;
    position: relative;
    // padding: 5px;
    height: 100% - @height;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    &-utils {     // 工具
      .flex-w-center();
      height: 25px;
      padding-left: 5px;
      padding-top: 3px;
      box-sizing: border-box;
    }

    &-text {      // 输入内容
      width: 100%;
      flex: 1;

      .input {
        width: 99%;
        height: 100%;
        outline: none;
        border: none;
        resize: none;
      }
    }

    &-btn {      // 发送消息按钮 
      width: 100px;
      position: absolute;
      right: 1%;
      bottom: 5%;
    }
  }
}

// 人员列表
.user-list {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 600px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  .shadow();

  .user-item {
    display: flex;
    align-items: center;
    margin: 5px;

    .user-name {
      margin-left: 10px;
    }
  }


}
</style>

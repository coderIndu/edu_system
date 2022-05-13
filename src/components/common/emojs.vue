<template>
  <div class="emojis">
    <!-- emoji列表 -->
    <div class="emoji-list" v-show="isShow">
      <span class="emoji-list-item" v-for="(item,index) in emojiArr" :key="index" @click="itemClick(item)">{{item}}</span>
    </div>
    <el-icon class="icon" @click="isShow=!isShow" :size="20"><PictureRounded /></el-icon>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 设置公共数据
const emojis = "😀,😁,😂,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,😇,😐,😑,😶,😏,😣,😥,😮,😯,😪,😫,😴,😌,😛,😜,😝,😒,😓,😔,😕,😲,😷,😖,😞,😟,😤,😢,😭,😦,😧,😨,😬,😰,😱,😳,😵,😡,😠,💘,❤,💓,💔,💕,💖,💗,💙,💚,💛,💜,💝,💞,💟,❣,💪,👈,👉,☝,👆,👇,✌,✋,👌,👍,👎,✊,👊,👋,👏,👐,✍,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🍅,🍆,🌽,🍄,🌰,🍞,🍖,🍗,🍔,🍟,🍕,🍳,🍲,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🍫,🍬,🍭,🍮,🍯,🍼,☕,🍵,🍶,🍷,🍸,🍹,🍺,🍻,🍴,🌹,🍀,🍎,💰,📱,🌙,🍁,🍂,🍃,🌷,💎,🔪,🔫,🏀,⚽,⚡,👄,👍,🔥,🙈,🙉,🙊,🐵,🐒,🐶,🐕,🐩,🐺,🐱,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🐈,🐯,🐅,🐆,🐴,🐎,🐮,🐂,🐃,🐄,🐷,🐖,🐗,🐽,🐏,🐑,🐐,🐪,🐫,🐘,🐭,🐁,🐀,🐹,🐰,🐇,🐻,🐨,🐼,🐾,🐔,🐓,🐣,🐤,🐥,🐦,🐧,🐸,🐊,🐢,🐍,🐲,🐉,🐳,🐋,🐬,🐟,🐠,🐡,🐙,🐚,🐌,🐛,🐜,🐝,🐞,🦋,😈,👿,👹,👺,💀,☠,👻,👽,👾,💣"
const emits = defineEmits(['emojiClick'])

// 设置data数据
const emojiArr = ref(emojis.split(','))
const isShow = ref(false)

// methods部署
const itemClick = (item) => {
  isShow.value = false
  emits('emojiClick', item)
}

// 组件挂载
onMounted(() => {

})

</script>

<style lang="less" scoped>
.emojis {
  position: relative;
  display: inline-block;
}
.emoji-list {
  position: absolute;
  left: 0;
  top: -100px;
  width: 190px;
  height: 100px;
  overflow: auto;
  background-color: #fff;
  &-item {
    margin: 5px;
    font-size: 23px;
    cursor:pointer
  }
}
</style>

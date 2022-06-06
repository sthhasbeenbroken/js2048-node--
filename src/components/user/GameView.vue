<template>
  <div class="gameMain">
    <div class="nag">
        <div class="back" @click="$router.back()">
        <span class="iconfont icon-jiantou_xiangzuo"></span>
         <span class="gameName">2048</span>
        </div>        
    </div>
    <div class="maxScore">
      Maxscore：<span id="maxScore">{{ maxScore }}</span>
    </div>
    <div class="col-sm-3 col-md-4"></div>
    <div class="gameBody" id="gameBody" v-touch:left="move" v-touch:right="move" v-touch:up="move" v-touch:down="move">
      <div class="row" v-for="(row, index) in gameList" :key="index">
        <div
          class="item"
          :style="{ background: refreshColorData[item.num] }"
          v-for="(item, idx) in row"
          :key="idx"
        >
          {{ item ? item.num : null }}
        </div>
      </div>
    </div>
    <!-- <div class="gameDirection">
      <span @click="move('up')">上</span>
      <span @click="move('down')">下</span>
      <span @click="move('left')">左</span>
      <span @click="move('right')">右</span>
    </div> -->
    <div class="scoreAndRefresh">
      <div class="gameScore ">
        得分：<span id="gameScore">{{ gameScore }}</span> 分
      </div>

      <div class="btn btn-danger refreshBtn" @click="refreshGame">NEWGAME</div>
    </div>

   <div class="gameOver" v-if="gameOver">游戏结束</div>
  </div>
</template>

<script>
import touch from '/public/js/touch'
export default {
  name: 'GamesView',
  directives: { touch },
  data () {
    return {
      refreshColorData: {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        521: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
        4096: 'rgb(250, 139, 176)'
      },
      gameOver: false,
      gameScore: 0,
      maxScore: 0, // 最高分
      gameList: null,
      isNewRndItem: false, //   // 是否产生新元素,
      dbmaxScore:0,
      user:{
          userid:'',
      }
    }
  },
  created () {
    this.gameList = this.matrix(5, 5, null)
    // 游戏初始化
    this.user.userid = this.$cookies.get("cid");
    //console.log(this.user.userid)
    this.dbmaxScore=this.$cookies.get("score");
    this.gameInit()
  },
  methods: {
    gameInit () {
      // 初始化分数
      this.gameScore = 0
      this.gameScore = 0
      // 最大分值
      if (this.$cookies.get("score")) {
        this.maxScore = this.$cookies.get("score") - 0
      } else {
        this.maxScore = 0
      }
      // 随机生成两个新元素
      this.newRndItem()
      this.newRndItem()
    },
    move (direction) {
      if (this.gameOver) return false
      // 获取所有非空元素
      let nonEmptyItems = [].concat
        .apply([], this.gameList)
        .filter(item => item.num !== null)
      // 如果按下的方向是左或上，则正向遍历非空元素
      if (direction === 'left' || direction === 'up') {
        for (let i = 0; i < nonEmptyItems.length; i++) {
          let currentItem = nonEmptyItems[i]
          this.itemMove(currentItem, direction)
        }
      } else if (direction === 'right' || direction === 'down') {
        // 如果按下的方向是右或下，则反向遍历非空元素
        for (let i = nonEmptyItems.length - 1; i >= 0; i--) {
          let currentItem = nonEmptyItems[i]
          this.itemMove(currentItem, direction)
        }
      }
      // 是否产生新元素
      if (this.isNewRndItem && !this.gameOver) {
        this.newRndItem()
      }
      this.isGameOver()
    },
    getSideItem (current, direction) {
      let sideItemX = current.id.substr(0, 1)
      let sideItemY = current.id.slice(1, 2)
      let falg
      switch (direction) {
        case 'left':
          falg = sideItemX > 0
          sideItemX = falg ? Number(sideItemX) - 1 : sideItemX
          break
        case 'right':
          falg = sideItemX < 4
          sideItemX = falg ? Number(sideItemX) + 1 : sideItemX
          break
        case 'up':
          falg = sideItemY > 0
          sideItemY = falg ? Number(sideItemY) - 1 : sideItemY
          break
        case 'down':
          falg = sideItemY < 4
          sideItemY = falg ? Number(sideItemY) + 1 : sideItemY
          break
      }
      let currentId = sideItemX + sideItemY
      let currentItem = falg
        ? [].concat(...this.gameList).filter(item => item.id === currentId)[0]
        : null
      // 判断移动方向是否有空位
      return currentItem
    },
    itemMove (currentItem, direction) {
      var sideItem = this.getSideItem(currentItem, direction)
      // 当前元素在最边上
      if (sideItem === null) return false
      // 当前元素不在最后一个且左（右、上、下）侧元素是空元素
      if (sideItem.num === null) {
        this.setGameList(sideItem, currentItem.num)
        sideItem.num = currentItem.num
        currentItem.num = null
        this.itemMove(sideItem, direction)
        this.isNewRndItem = true
      } else if (sideItem.num === currentItem.num) {
        sideItem.num = Number(currentItem.num) * 2
        currentItem.num = null
        this.gameScore += Number(sideItem.num) * 10
        
        if(this.gameScore>this.maxScore){
          this.user.id=this.$cookies.get('cid');
          this.user.score=this.gameScore
          this.$axios({
            url:'/api/updatescore',
            method:"put",
            data:{
              ...this.user
            }
          })
        }

        this.maxScore =
          this.maxScore < this.gameScore ? this.gameScore : this.maxScore
       this.$cookies.set("score",this.maxScore)
        this.itemMove(sideItem, direction)
        this.isNewRndItem = true
      }
    },
    // 游戏是否结束
    isGameOver () {
      let nonEmptyItems = [].concat
        .apply([], this.gameList)
        .filter(item => item.num !== null)
      let Items = [].concat
        .apply([], this.gameList)
      let gameOver = true
      if (Items.length === nonEmptyItems.length) { // 所有元素的个数 == 所有非空元素的个数  即没有空元素
        nonEmptyItems.forEach(currentItem => {
          // let up = this.getSideItem(currentItem, 'up') && this.getSideItem(currentItem, 'up').num
          // let down = this.getSideItem(currentItem, 'down') && this.getSideItem(currentItem, 'down').num
          // let left = this.getSideItem(currentItem, 'left') && this.getSideItem(currentItem, 'left').num
          // let right = this.getSideItem(currentItem, 'right') && this.getSideItem(currentItem, 'right').num
          // console.log(up + 'up' + down + 'down' + left + 'left' + right + 'right')
          // alert(currentItem.num + 'up' + this.getSideItem(currentItem, 'up').num + 'down' + this.getSideItem(currentItem, 'down').num + 'left' + this.getSideItem(currentItem, 'left').num + 'right' + this.getSideItem(currentItem, 'right').num)
          if (this.getSideItem(currentItem, 'up') && currentItem.num === this.getSideItem(currentItem, 'up').num) {
            gameOver = false
          } else if (this.getSideItem(currentItem, 'down') && currentItem.num === this.getSideItem(currentItem, 'down').num) {
            gameOver = false
          } else if (this.getSideItem(currentItem, 'left') && currentItem.num === this.getSideItem(currentItem, 'left').num) {
            gameOver = false
          } else if (this.getSideItem(currentItem, 'right') && currentItem.num === this.getSideItem(currentItem, 'right').num) {
            gameOver = false
          }
        })
      } else {
        gameOver = false
      }
      this.gameOver = gameOver
    },
    // 随机生成新数字
    newRndItem () {
      var newRndArr = [2, 2, 4]
      var newRndNum = newRndArr[this.getRandom(0, 2)]
      let emptyItemList = [].concat
        .apply([], this.gameList)
        .filter(item => item.num === null)
      var newRndSite = this.getRandom(0, emptyItemList.length - 1)
      var emptyItem = emptyItemList[newRndSite]
      this.setGameList(emptyItem, newRndNum)
    },
    // 设置数字
    setGameList (item, num) {
      if (!item) return false
      for (var row = 0; row < this.gameList.length; ++row) {
        for (var col = 0; col < this.gameList[row].length; ++col) {
          if (this.gameList[row][col].id === item.id) {
            this.gameList[row][col].num = num
          }
        }
      }
    },
    // 产生随机数，包括min、max
    getRandom (min, max) {
      return min + Math.floor(Math.random() * (max - min + 1))
    },
    // 刷新操作
    refreshGame () {
      this.gameList = this.matrix(5, 5, null)
      this.gameOver = false
      // 游戏初始化
      this.gameInit()
    },
    // 随机生成一个两位数组
    matrix (numrows, numcols, initial) {
      var arr = []
      for (var i = 0; i < numrows; ++i) {
        var columns = []
        for (var j = 0; j < numcols; ++j) {
          columns[j] = { id: j + '' + i, num: initial }
          // columns[j] = initial
        }
        arr[i] = columns
      }
      return arr
    }
  }
}
</script>

<style scoped lang="scss">
// @import "./index.scss";
.gameMain {
  height: calc(100vh - 88px);
  background: #fff;
  .nag{
        padding: 7px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.8rem;
        border-bottom: 1px solid #ccc;
       img{
           border-radius: 50%;
           border: 1px solid #ccc;
           height: 0.8rem;
       }
       span{
           font-weight: 600;
           font-size: 20px;
       }
    }
  .gameName {
    margin-left: 150px;
    font-size: 28px;
    font-weight: bold;
    padding-top: 20px;
  }
  .maxScore {
    width: 200px;
    font-size: 19px;
    margin: 20px 120px;
    span {
      color: #666;
      font-weight: bold;
    }
  }
  .gameBody {
    width: 80%;
    height: 40%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background: #bbada0;
    border-radius: 8px;

    .row {
      display: flex;
      justify-content: space-between;
      .item {
        width: 58px;
        height:58px;
        border-radius: 10px;
        background:#ccc0b3;
        text-align: center;
        line-height: 55px;
        font-size: 30px;
        font-weight: bold;
        color: #666;
      }
    }
  }
  .gameDirection {
    width: 60%;
    margin: 50px 100px;
    font-size: 26px;
    font-weight: bold;
    span {
        background-color: wheat;
        border-radius: 15%;
        margin: 10px;
      width: 13%;
      display: inline-block;
      color: #666;
    }
  }
  .gameRule {
    font-size: 26px;
    font-weight: bold;
    margin-top: 5px;
  }
  .gameScore {
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    span {
      color: #666;
      font-size: 20px;
    }
  }
  .scoreAndRefresh {
    display: flex;
    justify-content: space-around;
        align-items: center;
    width: 280px;
    margin: 20px auto;
    .refreshBtn {
      padding:2px 20px;
      line-height: 40px;
      margin-top: 8px;
      background: #ccc0b3;
      color: #fff;
      font-weight: 700;
      border-radius: 6px;
    }
  }

  .gameOver{
      color: red;
      font-size: 40px;
  }
}
</style>
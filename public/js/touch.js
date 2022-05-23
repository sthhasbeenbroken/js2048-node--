const touch = {
    bind (el, binding) {
      console.log(binding)
      // 滑动指令
      var touchType = binding.arg // 传入的模式 press swipeRight swipeLeft swipeTop swipeDowm Tap
      var timeOutEvent = 0
      var direction = ''
      // 滑动处理
      var startX, startY
  
      // 返回角度
      function GetSlideAngle (dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI
      }
  
      // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
      function GetSlideDirection (startX, startY, endX, endY) {
        var dy = startY - endY
        var dx = endX - startX
        var result = 0
  
        // 如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          return result
        }
  
        var angle = GetSlideAngle(dx, dy)
        if (angle >= -45 && angle < 45) {
          result = 'right'
        } else if (angle >= 45 && angle < 135) {
          result = 'up'
        } else if (angle >= -135 && angle < -45) {
          result = 'down'
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 'left'
        }
        return result
      }
  
      el.addEventListener('touchstart', function (ev) {
        startX = ev.touches[0].pageX
        startY = ev.touches[0].pageY
  
        // 判断长按
        timeOutEvent = setTimeout(() => {
          timeOutEvent = 0
          if (touchType === 'press') {
            binding.value()
          }
        }, 500)
      }, false)
  
      el.addEventListener('touchmove', function () {
        clearTimeout(timeOutEvent)
        timeOutEvent = 0
      })
  
      el.addEventListener('touchend', function (ev) {
        var endX, endY
        endX = ev.changedTouches[0].pageX
        endY = ev.changedTouches[0].pageY
        direction = GetSlideDirection(startX, startY, endX, endY)
  
        clearTimeout(timeOutEvent)
        switch (direction) {
          case 0:
            break
          case 'up':
            if (touchType === 'up') {
              binding.value(direction)
            }
            break
          case 'down':
            if (touchType === 'down') {
              binding.value(direction)
            }
            break
          case 'left':
            if (touchType === 'left') {
              binding.value(direction)
            }
            break
          case 'right':
            if (touchType === 'right') {
              binding.value(direction)
            }
            break
          default:
        }
      }, false)
    }
  }
  
  export default touch
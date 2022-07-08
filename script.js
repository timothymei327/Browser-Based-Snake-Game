let gameBoard = document.getElementById('container')
let allDivs = document.querySelectorAll('div')
const boardWidth = 20
const boardHeight = 20
let snakeBlocks = [183, 184, 185]
let dotBlocks = []
let speed = 500
let direction = null
let previousInput = ['gamestart']
let intervalTime = 390
let dotSpawnTime = 1
let numsArr = []

for (i = 0; i < 400; i++) {
  let spaces = document.createElement('div')
  spaces.setAttribute('class', 'spaces')
  gameBoard.append(spaces)
}

let spaces = document.getElementsByClassName('spaces')

const snake = () => {
  for (i = 0; i < snakeBlocks.length; i++) {
    let snakeBody = spaces[snakeBlocks[i]]
    snakeBody.setAttribute('id', 'snake')
    snakeBody.style.backgroundColor = '#f46d10'
    snakeBody.style.border = '1px solid #aa1408'
  }
}

snake()

const randomNum = () => {
  let nums = Math.round(Math.random() * 400)
  numsArr.unshift(nums)
}

const generateDots = () => {
  randomNum()
  while (snakeBlocks.includes(numsArr[0])) {
    numsArr.shift()
    randomNum()
    if (!snakeBlocks.includes(numsArr[0])) break
  }
  let randomDots = spaces[numsArr[0]]
  dotBlocks.push(numsArr[0])
  if (snakeBlocks[snakeBlocks.length - 1] == dotBlocks[0]) {
    generateDots()
  } else {
    randomDots.setAttribute('id', 'dot')
    randomDots.style.backgroundColor = '#aa1408'
  }
}

generateDots()

//e.keyCode learned from https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
// and https://www.geeksforgeeks.org/javascript-detecting-the-pressed-arrow-key/
const arrowPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      if (direction == 'right') {
        return false
      } else {
        direction = 'left'
        const leftMovement = () => {
          if (direction == 'left') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 1)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
              spaces[snakeBlocks[0]].style.border = 'none'
              snakeBlocks.shift(snakeBlocks[0])
              previousInput.push('left')
              snake()
              setTimeout(leftMovement, speed)
            }
          } else {
            return
          }
        }
        if (
          previousInput[previousInput.length - 1] !== 'left' &&
          previousInput[previousInput.length - 1] !== 'right' &&
          previousInput[previousInput.length - 1] !== 'gamestart'
        ) {
          leftMovement()
        }
        break
      }
    case 38:
      if (direction == 'bottom') {
        return false
      } else {
        direction = 'top'
        const topMovement = () => {
          if (direction == 'top') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 20)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
              spaces[snakeBlocks[0]].style.border = 'none'
              snakeBlocks.shift(snakeBlocks[0])
              previousInput.push('top')
              snake()
              setTimeout(topMovement, speed)
            }
          } else {
            return
          }
        }
        if (
          previousInput[previousInput.length - 1] !== 'top' &&
          previousInput[previousInput.length - 1] !== 'bottom'
        ) {
          topMovement()
        }
        break
      }
    case 39:
      if (direction == 'left') {
        return false
      } else {
        direction = 'right'
        const rightMovement = () => {
          if (direction == 'right') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 1)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
              spaces[snakeBlocks[0]].style.border = 'none'
              snakeBlocks.shift(snakeBlocks[0])
              previousInput.push('right')
              snake()
              setTimeout(rightMovement, speed)
            }
          } else {
            return
          }
        }
        if (
          previousInput[previousInput.length - 1] !== 'right' &&
          previousInput[previousInput.length - 1] !== 'left' &&
          previousInput[previousInput.length - 1] !== 'gameover'
        ) {
          rightMovement()
        }
        break
      }
    case 40:
      if (direction == 'top') {
        return false
      } else {
        direction = 'bottom'
        const bottomMovement = () => {
          if (direction == 'bottom') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 20)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
              spaces[snakeBlocks[0]].style.border = 'none'
              snakeBlocks.shift(snakeBlocks[0])
              previousInput.push('bottom')
              snake()
              setTimeout(bottomMovement, speed)
            }
          } else {
            return
          }
        }
        if (
          previousInput[previousInput.length - 1] !== 'bottom' &&
          previousInput[previousInput.length - 1] !== 'top'
        ) {
          bottomMovement()
          break
        }
      }
  }
}

window.addEventListener('keydown', arrowPressed)

const collisions = () => {
  if (
    (snakeBlocks[snakeBlocks.length - 1] % boardWidth == boardWidth - 1 &&
      direction == 'right') ||
    (snakeBlocks[snakeBlocks.length - 1] % boardWidth == 0 &&
      direction == 'left') ||
    (snakeBlocks[snakeBlocks.length - 1] - boardWidth < 0 &&
      direction == 'top') ||
    (snakeBlocks[snakeBlocks.length - 1] + boardWidth >= 400 &&
      direction == 'bottom')
  ) {
    location.href = 'gameOver.html'
    //clear highest timeout learned from https://stackoverflow.com/questions/3847121/how-can-i-disable-all-settimeout-events
    let highestTimeoutId = setTimeout(';')
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i)
    }
  } else {
    return
  }
}

const dotEaten = () => {
  if (snakeBlocks[snakeBlocks.length - 1] == dotBlocks[0]) {
    snakeBlocks.unshift(snakeBlocks[0] + 1)
    dotBlocks.shift()
    generateDots()
  }
}

const hitSelf = () => {
  for (let i = 0; i < snakeBlocks.length - 1; i++) {
    if (snakeBlocks[snakeBlocks.length - 1] == snakeBlocks[i]) {
      location.href = 'gameOver.html'
      let highestTimeoutId = setTimeout(';')
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i)
      }
    }
  }
}

const youWin = () => {
  if (snakeBlocks.length == 401) {
    location.href = 'gameOver.html'
    let highestTimeoutId = setTimeout(';')
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i)
    }
  }
}

let dotSpawnInterval = setInterval(dotEaten, dotSpawnTime)
let hitSelfCheck = setInterval(hitSelf, dotSpawnTime)
let youWinCheck = setInterval(youWin, intervalTime)
let interval = setInterval(collisions, intervalTime)

//loss conditions and setIntervals learned/inspired from https://youtu.be/rui2tRRVtc0?t=553
// and https://www.w3schools.com/jsref/met_win_setinterval.asp

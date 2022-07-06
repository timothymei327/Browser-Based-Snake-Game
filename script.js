let gameBoard = document.getElementById('container')
const boardWidth = 20
const boardHeight = 20
let snakeBlocks = [183, 184, 185]
let speed = 1000
let direction = null
let previousInput = ['gamestart']
// let gameSession = true

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
  }
}

snake()

const randomDots = () => {
  // let dots = document.getElementById('dots')
  // let randomColumn = Math.round(Math.random() * 20)
  // let randomRow = Math.round(Math.random() * 20)
  let randomNum = Math.round(Math.random() * 400)
  let randomDots = spaces[randomNum]
  randomDots.setAttribute('id', 'dot')
  randomDots.style.backgroundColor = '#aa1408'
  // if (randomColumn !== 4 && randomRow !== 8) {
  //   dots.style.gridArea = `${randomRow} / ${randomColumn}`
  console.log(randomDots)
  // }
}

randomDots()

const arrowPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      console.log('left arrowkey pressed')
      direction = 'left'
      const leftMovement = () => {
        for (i = 0; i < snakeBlocks.length; i++) {
          snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 1)
          spaces[snakeBlocks[0]].setAttribute('id', 'snake')
          spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
          snakeBlocks.shift(snakeBlocks[0])
          previousInput.push('left')
          snake()
          setTimeout(leftMovement, speed)
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
    case 38:
      console.log('top arrowkey pressed')
      direction = 'top'
      const topMovement = () => {
        for (i = 0; i < snakeBlocks.length; i++) {
          snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 20)
          spaces[snakeBlocks[0]].setAttribute('id', 'snake')
          spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
          snakeBlocks.shift(snakeBlocks[0])
          previousInput.push('top')
          snake()
          setTimeout(topMovement, speed)
        }
      }
      if (
        previousInput[previousInput.length - 1] !== 'top' &&
        previousInput[previousInput.length - 1] !== 'bottom'
      ) {
        topMovement()
      }
      break
    case 39:
      console.log('right arrowkey pressed')
      direction = 'right'
      const rightMovement = () => {
        for (i = 0; i < snakeBlocks.length; i++) {
          snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 1)
          spaces[snakeBlocks[0]].setAttribute('id', 'snake')
          spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
          snakeBlocks.shift(snakeBlocks[0])
          previousInput.push('right')
          snake()
          setTimeout(rightMovement, speed)
        }
      }
      if (
        previousInput[previousInput.length - 1] !== 'right' &&
        previousInput[previousInput.length - 1] !== 'left'
      ) {
        rightMovement()
      }
      break
    case 40:
      console.log('bottom arrowkey pressed')
      direction = 'bottom'
      const bottomMovement = () => {
        for (i = 0; i < snakeBlocks.length; i++) {
          snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 20)
          spaces[snakeBlocks[0]].setAttribute('id', 'snake')
          spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
          snakeBlocks.shift(snakeBlocks[0])
          previousInput.push('bottom')
          snake()
          setTimeout(bottomMovement, speed)
        }
      }
      if (
        previousInput[previousInput.length - 1] !== 'bottom' &&
        previousInput[previousInput.length - 1] !== 'top'
      ) {
        bottomMovement()
      }
      break
  }
}

window.addEventListener('keydown', arrowPressed)

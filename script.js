let gameBoard = document.getElementById('container')
let allDivs = document.querySelectorAll('div')
const boardWidth = 20
const boardHeight = 20
let snakeBlocks = [183, 184, 185]
let dotBlocks = []
let speed = 500
let direction = null
let previousInput = ['gamestart']
let intervalTime = 400
let dotSpawnTime = 1

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

const generateDots = () => {
  let randomNum = Math.round(Math.random() * 400)
  let randomDots = spaces[randomNum]
  dotBlocks.push(randomNum)
  if (randomDots.getAttribute('id') == 'snake') {
    generateDots()
  } else {
    randomDots.setAttribute('id', 'dot')
    randomDots.style.backgroundColor = '#aa1408'
    console.log(randomDots)
    console.log(dotBlocks)
  }
}

generateDots()
// setInterval(generateDots(), 1000)

const arrowPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      if (direction == 'right') {
        return false
      } else {
        console.log('left arrowkey pressed')
        direction = 'left'
        const leftMovement = () => {
          if (direction == 'left') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 1)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
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
        console.log('top arrowkey pressed')
        direction = 'top'
        const topMovement = () => {
          if (direction == 'top') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] - 20)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
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
        console.log('right arrowkey pressed')
        direction = 'right'
        const rightMovement = () => {
          if (direction == 'right') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 1)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
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
        console.log('bottom arrowkey pressed')
        direction = 'bottom'
        const bottomMovement = () => {
          if (direction == 'bottom') {
            for (i = 0; i < snakeBlocks.length; i++) {
              snakeBlocks.push(snakeBlocks[snakeBlocks.length - 1] + 20)
              spaces[snakeBlocks[0]].setAttribute('id', 'snake')
              spaces[snakeBlocks[0]].style.backgroundColor = '#465947'
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

let button = document.body.querySelector('button')

button.addEventListener('click', generateDots)

const snakeEats = () => {
  if (snakeBlocks[snakeBlocks.length] - 1 == dotBlocks[dotBlocks.length] - 1) {
    let gainedMass = snakeBlocks[0] + 1
    snakeBlocks.unshift(gainedMass)
  }
}

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
    console.log('game over')

    let highestTimeoutId = setTimeout(';')
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i)
    }
  } else {
    return
  }
}

const dotSpawning = () => {
  if (snakeBlocks[snakeBlocks.length - 1] == dotBlocks[0]) {
    snakeBlocks.unshift(snakeBlocks[0] + 1)
    dotBlocks.shift()
    generateDots()
  }
}

let dotSpawnInterval = setInterval(dotSpawning, dotSpawnTime)
let interval = setInterval(collisions, intervalTime)

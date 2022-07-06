let gameBoard = document.getElementById('container')
const boardWidth = 20
const boardHeight = 20
let snakeBlocks = [183, 184, 185]
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
    snakeBody.setAttribute('class', 'snake')
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
      snakePosition.style.gridColumnStart -= 1
      console.log(snakePosition.style.gridColumnStart)
      break
    case 38:
      console.log('top arrowkey pressed')
      snakePosition.style.gridRowStart -= 1
      break
    case 39:
      console.log('right arrowkey pressed')
      snakePosition.style.gridColumnStart =
        parseInt(snakePosition.style.gridColumnStart) + parseInt(1)
      break
    case 40:
      console.log('bottom arrowkey pressed')
      snakePosition.style.gridRowStart =
        parseInt(snakePosition.style.gridRowStart) + parseInt(1)
      break
  }
}

window.addEventListener('keydown', arrowPressed)

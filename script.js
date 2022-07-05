let gameBoard = document.getElementById('container')
// let gameSession = true

const snake = () => {
  let snakeHead = document.getElementById('snake')
  snakeHead.style.gridColumnStart = 4
  snakeHead.style.gridRowStart = 8
  snakeHead.style.backgroundColor = '#f46d10'
}

snake()

const randomDots = () => {
  let dots = document.getElementById('dots')
  let randomColumn = Math.round(Math.random() * 17)
  let randomRow = Math.round(Math.random() * 15)
  dots.style.backgroundColor = '#aa1408'
  if (randomColumn !== 4 && randomRow !== 8) {
    dots.style.gridArea = `${randomRow} / ${randomColumn}`
    console.log(randomRow, randomColumn)
  }
}

randomDots()

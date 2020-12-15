const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, index) {
  return `
    <div class="row">
      <div class="row-info">${index ?? ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
  const colsCounts = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCounts)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cells = new Array(colsCounts)
      .fill('')
      .map(toCell)
      .join('')

  rows.push(createRow(cols))

  for(let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
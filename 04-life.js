/*
  eslint-disable
    brace-style,
    global-require,
    indent,
    key-spacing,
    keyword-spacing,
    max-statements-per-line,
    newline-per-chained-call,
    no-empty-function,
    no-loop-func,
    no-multi-spaces,
    no-param-reassign,
    no-return-assign,
    no-unused-vars,
    object-curly-newline,
    no-process-exit,
    space-infix-ops,
    import/no-commonjs,
 */

const {
  _01: cursor = require('ansi')(process.stdout),

  _02: { floor, random } = Math,
  _03: { assign, keys } = Object,
  _04: not = predicate => x => !predicate(x),
  _05: range = (from, to) => Array.from({ length: to - from }).map((_, i) => from + i),
  _06: xprod = (as, bs = as) => [].concat(...as.map(a => bs.map(b => [a, b]))),

  _07: toNumber = point => point.map(Number),
  _08: isInside = ({ width, height }) => ([x, y]) => x > 0 && x <= width && y > 0 && y <= height,
  _09: isSamePoint = ([x1, y1]) => ([x2, y2]) => x1 == x2 && y1 == y2,
  _10: applyOffset = ([x, y]) => ([dx, dy]) => [x + dx, y + dy],
  _11: gridToArray = grid => [].concat(...keys(grid).map(x => keys(grid[x]).map(y => toNumber([x, y])))),
  _12: arrayToGrid = array => array.reduce((grid, [x, y]) => (
  _13  => assign({}, grid, { [x]: assign({}, grid[x] || {}, { [y]: true }) }))(), {}),

  _14: getCell = grid => ([x, y]) => (({ [x]: { [y]: cell = false } = {} }) => cell)(grid),
  _15: getNeighbors = point => xprod(range(-1, 2)).map(applyOffset(point)),
  _16: getLiveCount = cells => cells.filter(cell => cell).length,
  _17: isAlive = (count, { [count]: cell = false }) => cell,
  _18: cellTransition = cell => ({ 2: cell, 3: true }),

  _19: cellStep = (grid, point) => (({
  _20:     cell = getCell(grid)(point),
  _21:     neighbors = getNeighbors(point).filter(not(isSamePoint(point))).map(getCell(grid)),
  _22:     count = getLiveCount(neighbors),
  _23:     Return = isAlive(count, cellTransition(cell)),
  _24  }) => Return)({}),

  _25: storeAlivePoint = (array, grid) => point => cellStep(grid, point) && array.push(point),

  _26: next = grid => (({
  _27:     alivePoints = [],
  _28:     storePoints = points => points.forEach(storeAlivePoint(alivePoints, grid)),
  _29=     gridToArray(grid).map(getNeighbors).forEach(storePoints),
  _30:     Return = arrayToGrid(alivePoints),
  _31  }) => Return)({}),

  _32: drawOffset = [0, 0],
  _33: moveOffset = [0, 0],

  _34: resize = () => (({
  _35=     drawOffset[0] = process.stdout.columns / 2,
  _36=     drawOffset[1] = process.stdout.rows / 2,
  _37  }) => {})({}),

  _38: move = key => (({
  _39=     key == '\u001B\u005B\u0041' && (moveOffset[1] += 2),
  _40=     key == '\u001B\u005B\u0042' && (moveOffset[1] -= 2),
  _41=     key == '\u001B\u005B\u0043' && (moveOffset[0] -= 2),
  _42=     key == '\u001B\u005B\u0044' && (moveOffset[0] += 2),
  _43=     key == '\u0003' && process.exit(),
  _44  }) => {})({}),

  _45: drawPoint = ([x, y]) => cursor.goto(x, y).write('●'),

  _46: draw = grid => (({
  _47:     width = process.stdout.columns,
  _48:     height = process.stdout.rows,
  _49=     process.stdout.write('\x1Bc'),
  _50:     offset = applyOffset(drawOffset)(moveOffset),
  _51:     normalizedPoints = gridToArray(grid).map(applyOffset(offset)),
  _52=     normalizedPoints.filter(isInside({ width, height })).forEach(drawPoint),
  _53=     cursor.reset(),
  _54  }) => {})({}),

  _55: randomPoint = ({
  _56: { stdout: { columns, rows } } = process,
  _57  } = {}) => [random() * columns - columns / 2, random() * rows - rows / 2].map(floor),

  _58: acorn = { 1: { 3:1 }, 2: { 1:1, 3:1 }, 4: { 2:1 }, 5: { 3:1 }, 6: { 3:1 }, 7: { 3:1 } },
  _59: diehard = { 1: { 2:1 }, 2: { 2:1, 3:1 }, 6: { 3:1 }, 7: { 1:1, 3:1 }, 8: { 3: 1 } },
  _60: glider = { 1: { 1:1, 3:1 }, 2: { 2:1, 3:1 }, 3: { 2:1 } },
  _61: rand = arrayToGrid(Array.from({ length: floor(random() * 500) }).map(randomPoint)),

  _62= process.stdin.setRawMode(true),
  _63= process.stdin.resume(),
  _64= process.stdin.setEncoding('utf8'),
  _65= process.stdin.on('data', move),
  _66= process.stdout.on('resize', resize),
  _67= resize(),
  _68= (({
  _69:     grid = { acorn, diehard, glider, random: rand }[process.argv[2]] || glider,
  _70=     draw(grid),
  _71=     setInterval(() => draw(grid = next(grid)), 500),
  _72  }) => {})({}),
} = Object.create(null)

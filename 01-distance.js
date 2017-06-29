const {
  argv: {
    2: x1 = 0, 3: y1 = 0,
    4: x2 = 0, 5: y2 = 0,
  },
  output = (
    (
      { dx, dy },
      { sqrt } = Math
    ) => sqrt(dx * dx + dy * dy)
  )({ dx: x2 - x1, dy: y2 - y1 }),
} = process

console.log(output)

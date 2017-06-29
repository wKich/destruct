const {
  argv: { 2: input = 'world' },
  output = `Hello ${input}`,
} = process

console.log(output)

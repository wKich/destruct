/*
  eslint-disable
    brace-style,
    indent,
    key-spacing,
    keyword-spacing,
    max-statements-per-line,
    no-empty-function,
    no-loop-func,
    no-multi-spaces,
    no-param-reassign,
    no-unused-vars,
    object-curly-newline,
    space-infix-ops,
 */

const {
  _01: input = Number(process.argv[2]),
  _02: fib = n => (({
  _03:     a = 1,
  _04:     b = 0,
  _05:     sum = 0,
  _06=     (() => { while(n > 0) { (({
  _07=         sum = a + b,
  _08=         a = b,
  _09=         b = sum,
  _10=         n -= 1,
  _11      }) => {})({}) } })(),
  _12:     Return = sum,
  _13  }) => Return)({}),
  _14: output = fib(input),
  _15= console.log(output),
} = Object.create(null)

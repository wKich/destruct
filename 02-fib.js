const {
  argv: { 2: input },
  output = (
    (
      number,
      arg = n => ({
        n1: n - 1, [n - 0]: 1,
        n2: n - 2, [n - 1]: 0,
      }),
      fib = ({
        n1, n2,
        0: fib0 = fib(arg(n1)),
        1: fib1 = fib(arg(n2)),
      }) => fib0 + fib1
    ) => number ? fib(arg(number)) : 0
  )(Number(input)),
} = process

console.log(output)

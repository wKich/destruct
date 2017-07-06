# Destructuring

Note: Привет. Меня зовут Дима, я из команды Форм Экстерна. Сегодня я бы хотел вам рассказать немного про `Destructuring`, это синтаксис появившийся в стандарте `ES2015`, это конечно не какой-нибудь новый фреймворк, появивщийся 2 недели назад, но я всё же надеюсь что в конце презентации я смогу вас удивить, показав какие прикольные штуки можно сделать с помощью него, например как создать "Жизнь" из "ничего". Давайте начнем с простого примера.

---

```js
const size = [100, 200]
const width = size[0]
const height = size[1]
const area = width * height
```

```js
const size = [100, 200]
const [width, height] = size
const area = width * height
```

<!-- .element: class="fragment" data-fragment-index="1" -->

```js
const size = { width: 100, height: 100 }
const width = size.width
const height = size.height
```

<!-- .element: class="fragment" data-fragment-index="2" -->

```js
const size = { width: 100, height: 100 }
const { width, height } = size
```

<!-- .element: class="fragment" data-fragment-index="2" -->

Note: Допустим мы хотим посчитать площадь прямоугольника, а его размеры у нас представлены в виде массива, нам необходимо вручную присвоить каждой переменной элемент с соответствующим индексом. 

При использовании `Destructuring`'а мы как бы говорим, что хотим разобрать массив просто описав объявления переменных в соответствующем порядке, заключив их в скобки. 

Тоже самое можно сделать и с объектами.

---

```js
let width, height
// some code
const size = [100, 200]
;[width, height] = size
```

```js
let width, height
// some code
const size = { width: 100, height: 100 }
{ width, height } = size // SyntaxError
```

<!-- .element: class="fragment" data-fragment-index="1" -->

```js
let width, height
// some code
const size = { width: 100, height: 100 }
;({ width, height } = size)
```

<!-- .element: class="fragment" data-fragment-index="1" -->

Note: Кстати говоря нам необязательно использовать `Destructuring` при объявлении переменных. Мы можем объявить переменные где-то выше по коду, а после присвоить им значения.

Однако для объектов есть одна особенность, присваивание необходимо оборачивать в круглые скобки, в виду того что написание фигурных скобок в левой части выражения является объявлением блока.

---

```js
let a = 1
let b = 2
;[a, b] = [b, a]
console.log(a, b) // 2 1
```

```js
function foo() {
  return [1, 2, 3]
}
const [, , a] = foo()
console.log(a) // 3
```

<!-- .element: class="fragment" data-fragment-index="1" -->

```js
const [a, ...rest] = [1, 2, 3]
console.log(a) // 1
console.log(rest) // [2, 3]
```

<!-- .element: class="fragment" data-fragment-index="2" -->

```js
const [a, ...rest, b] = [1, 2, 3, 4] // SyntaxError
```

<!-- .element: class="fragment" data-fragment-index="2" -->

Note: Давайте рассмотрим более интересные случаи применения деструктуринга. Например мы можем менять значения переменных местами без использования `XOR` и третьей переменной.

Или пропустить какие-нибудь элементы.

Или взять все элементы кроме первого используя `Rest Operator`, тут стоит заметить что по спецификации он всегда должен стоять в конце.

---

```js
const { foo: bar } = { foo: 1 }
console.log(bar) // 1
```

```js
const prefix = 'foo'
const { [`${prefix}_bar`]: bar } = { foo_bar: "Hello" }
console.log(bar) // "Hello"
```

<!-- .element: class="fragment" data-fragment-index="1" -->

```js
const obj = { a: 1, b: 2, c: 3, d: 4 }
const { a, b, ...restObj } = obj
console.log(restObj) // { c: 3, d: 4 }
```

<!-- .element: class="fragment" data-fragment-index="2" -->

Note: У объектов в целом похожее поведение, за исключением некоторых особенностей. Первая из них позволяет сохранить значение по ключу в переменную с другим именем. Например тут мы берем значение свойства `foo` и присваиваем его переменной `bar`. Такая запись может приводить в замешательство, но достаточно просто иметь в виду, что выражение в левой части необходимо читать в обратном порядке и всё прояснится.

Вторая особенность позволяет, как и в случае объявления объектов использовать вычисляемые имена свойств.

Если же говорить про `Rest Operator` то у объектов он тоже есть и это довольно элегантный способ создать новый объект содержащий только нужные нам свойства, но пока он находится в stage-3.

---

```js
function drawCircleOldSchool(x, y, radius) {
  x = x === undefined ? 0 : x
  y = y === undefined ? 0 : y
  radius = radius === undefined ? 1 : radius
  // ...
}

drawCircleOldSchool(10, 5, 3)
```

```js
function drawCircleDestructuring({ x = 0, y = 0, radius = 1 }) {
  // ...
}

drawCircleDestructuring({ x: 10, y: 5, radius: 3 })
```

Note: Особенно хорошо себя показывает `Destructuring` при использовании `Default values` и `Function parameters`. В случае передачи в параметры функции объекта можно не только значительно повысить читаемость кода, но и снизить вероятность ошибки, так как порядок свойств в объекте не имеет значения.

---

```js
const {
  props: {
    products: {
      [this.state.id]: {
        title,
        description,
        price,
      }
    }
  }
} = this
```

Note: `Destructuring` так же позволяет позволяет доставать значения из объектов с любым уровнем вложенности. Читаемость кода в данном примере конечно оставляет желать лучшего и писать так в реальных проектах я не советую.

---

```typescript
type Prop = {
  a: number,
  b: string,
  c: boolean[],
}

function foo({a, b, c}: Prop) {
  // ...
}
const {a, b, c}: Prop = obj
```

```typescript
function foo({ a: b: number }) {
  return b
}
foo({ a: "Hello" })
```

<!-- .element: class="fragment" data-fragment-index="1" -->

[Type annotations inside destructuring](https://github.com/facebook/flow/issues/235)

<!-- .element: class="fragment" data-fragment-index="2" -->

Note: Если же говорить про статическую типизацию при использовании `Destructuring`'а, то пока единственный способ сделать это выглядит так. Правда вот такой вариант записи, хоть и является валидным, но почему-то `Flow` игнорирует описание типа в параметре функции и выводит его из переденного в функцию значения. По этому поводу есть issue, но пока нет единого мнения какой вариант синтаксиса должен быть в данном случае. А как обстоят дела в `TypeScript`?

---

# Show time

---

## Ссылки

https://goo.gl/8eY1PJ - Презентация и исходники

[MDN Destructuring assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[Typora](https://www.typora.io) - A truly **minimal** Markdown editor

[reveal-md](https://github.com/webpro/reveal-md) - Reveal.js presentations from Markdown
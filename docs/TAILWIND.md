# Tailwind CSS: справочник для этого проекта

В проекте установлен Tailwind CSS **4.3.3** и плагин `@tailwindcss/vite`.
Примеры написаны для React + TypeScript: классы указываются в `className`.
Это рабочая шпаргалка по основным классам для страницы с анимациями.
Значения ниже соответствуют стандартной теме; при настройке темы они могут измениться.

Сравнение подходов и готовые приёмы оформления — в
[справочнике HTML/CSS и Tailwind](HTML-CSS-PATTERNS.md).

## Содержание

- [Начало работы](#начало-работы)
- [Отступы](#отступы)
- [Размеры](#размеры)
- [Flexbox](#flexbox)
- [Grid](#grid)
- [Текст](#текст)
- [Цвета и оформление](#цвета-и-оформление)
- [Позиционирование](#позиционирование)
- [Адаптивность](#адаптивность)
- [Состояния элементов](#состояния-элементов)
- [Переходы и трансформации](#переходы-и-трансформации)
- [Анимации](#анимации)
- [Произвольные значения и тема](#произвольные-значения-и-тема)
- [Классы и состояние React](#классы-и-состояние-react)
- [Готовый пример страницы](#готовый-пример-страницы)

## Начало работы

В `src/styles.css` уже подключён Tailwind:

```css
@import "tailwindcss";
```

Добавляй классы в `src/App.tsx` или в свои компоненты:

```tsx
<button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">
  Начать
</button>
```

Здесь `rounded-xl` скругляет углы, `bg-indigo-600` задаёт фон,
`px-6` и `py-3` — внутренние отступы, `font-semibold` — насыщенность шрифта,
`text-white` — цвет текста. Один элемент получает несколько отдельных правил.

Класс может включать условие: `hover:bg-indigo-700` применяется при наведении,
`md:px-8` — начиная с ширины `md`. Условия можно совмещать: `md:hover:bg-indigo-700`.

В HTML используется `class`, в React — `className`.
В VS Code классы удобно искать прямо в коде; в браузере итоговые правила видны
в инструментах разработчика во вкладке Elements → Styles.

[Официальное объяснение utility-классов](https://tailwindcss.com/docs/styling-with-utility-classes).

## Отступы

В стандартной теме шаг отступов — `0.25rem`.
При базовом размере шрифта 16 px: `1` = 4 px, `2` = 8 px,
`4` = 16 px, `6` = 24 px, `8` = 32 px. Например, `p-4` — это `1rem`, а не 4 px.

| Класс | Назначение |
| --- | --- |
| `p-4` | Внутренний отступ со всех сторон: 1rem |
| `px-6` | Внутренний отступ по горизонтали: 1.5rem |
| `py-3` | Внутренний отступ по вертикали: 0.75rem |
| `pt-8` | Внутренний отступ сверху: 2rem |
| `pb-8` | Внутренний отступ снизу: 2rem |
| `pl-4` / `pr-4` | Внутренний отступ слева / справа |
| `m-4` | Внешний отступ со всех сторон: 1rem |
| `mt-6` / `mb-6` | Внешний отступ сверху / снизу: 1.5rem |
| `mx-auto` | Автоматические внешние отступы по горизонтали; центрирование блока с ограниченной шириной |
| `-mt-4` | Отрицательный внешний отступ сверху: −1rem |
| `gap-4` | Интервал между элементами Flexbox или Grid: 1rem |
| `gap-x-6` / `gap-y-3` | Интервал между колонками / рядами |

```tsx
<section className="mx-auto max-w-5xl px-6 py-12">
  <h2 className="mb-6 text-3xl font-bold">Мои проекты</h2>
  <div className="flex flex-wrap gap-4">
    <div className="rounded-xl bg-slate-100 p-4">Первый проект</div>
    <div className="rounded-xl bg-slate-100 p-4">Второй проект</div>
  </div>
</section>
```

[Padding](https://tailwindcss.com/docs/padding),
[margin](https://tailwindcss.com/docs/margin),
[gap](https://tailwindcss.com/docs/gap).

## Размеры

| Класс | Назначение |
| --- | --- |
| `w-full` | Ширина 100% доступной ширины родителя |
| `w-1/2` | Ширина 50% |
| `w-64` | Ширина 16rem |
| `max-w-5xl` | Максимальная ширина 64rem |
| `max-w-xl` | Максимальная ширина 36rem |
| `h-48` | Высота 12rem |
| `h-full` | Высота 100%; зависит от заданной высоты родителя |
| `min-h-screen` | Минимальная высота 100vh |
| `min-h-dvh` | Минимальная высота 100dvh; учитывает изменение доступной высоты окна на мобильном устройстве |
| `size-12` | Ширина и высота одновременно: 3rem |
| `aspect-video` | Соотношение ширины и высоты 16:9 |
| `object-cover` | Заполнение области изображением с сохранением пропорций и обрезкой лишнего |

```tsx
<div className="mx-auto w-full max-w-xl">
  <div className="aspect-video w-full rounded-2xl bg-indigo-100" />
  <p className="mt-4">Область с пропорциями видео</p>
</div>
```

Для изображения можно использовать
`<img src="/photo.jpg" alt="Описание фотографии" className="h-48 w-full object-cover" />`.
Для этого примера нужно добавить собственный файл `public/photo.jpg`.

[Width](https://tailwindcss.com/docs/width),
[height](https://tailwindcss.com/docs/height),
[min-height](https://tailwindcss.com/docs/min-height),
[object-fit](https://tailwindcss.com/docs/object-fit).

## Flexbox

| Класс | Назначение |
| --- | --- |
| `flex` | Создаёт flex-контейнер |
| `inline-flex` | Flex-контейнер, участвующий в строковом расположении |
| `flex-row` | Главная ось идёт горизонтально; направление по умолчанию |
| `flex-col` | Главная ось идёт вертикально |
| `items-center` | Центрирование по поперечной оси |
| `items-start` | Выравнивание по началу поперечной оси |
| `justify-center` | Центрирование по главной оси |
| `justify-between` | Свободное пространство распределяется между элементами |
| `flex-wrap` | Разрешает перенос элементов |
| `flex-1` | Позволяет элементу занимать свободное место с учётом соседей |
| `shrink-0` | Запрещает сжатие элемента |

При `flex-row` класс `items-center` центрирует по вертикали,
а `justify-center` — по горизонтали. При `flex-col` оси меняются местами.

```tsx
<header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
  <a href="#home" className="shrink-0 text-xl font-bold">Мой сайт</a>
  <nav className="flex gap-6" aria-label="Основная навигация">
    <a href="#about">Обо мне</a>
    <a href="#projects">Проекты</a>
  </nav>
</header>
```

[Display](https://tailwindcss.com/docs/display),
[flex-direction](https://tailwindcss.com/docs/flex-direction),
[align-items](https://tailwindcss.com/docs/align-items),
[justify-content](https://tailwindcss.com/docs/justify-content).

## Grid

| Класс | Назначение |
| --- | --- |
| `grid` | Создаёт grid-контейнер |
| `grid-cols-1` | Одна колонка |
| `grid-cols-2` | Две равные колонки |
| `grid-cols-3` | Три равные колонки |
| `col-span-2` | Элемент занимает две колонки |
| `place-items-center` | Центрирует элементы внутри ячеек по обеим осям |

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {["Дизайн", "Разработка", "Анимации"].map((title) => (
    <article key={title} className="rounded-2xl bg-slate-100 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
    </article>
  ))}
</div>
```

Карточки располагаются в одну, две или три колонки в зависимости от ширины окна.

[Grid columns](https://tailwindcss.com/docs/grid-template-columns),
[grid-column](https://tailwindcss.com/docs/grid-column).

## Текст

| Класс | Назначение |
| --- | --- |
| `text-sm` | Размер шрифта 0.875rem |
| `text-base` | Размер шрифта 1rem |
| `text-lg` | Размер шрифта 1.125rem |
| `text-xl` | Размер шрифта 1.25rem |
| `text-3xl` | Размер шрифта 1.875rem |
| `text-5xl` | Размер шрифта 3rem |
| `font-normal` | Насыщенность 400 |
| `font-medium` | Насыщенность 500 |
| `font-semibold` | Насыщенность 600 |
| `font-bold` | Насыщенность 700 |
| `text-left` / `text-center` | Выравнивание текста слева / по центру |
| `leading-relaxed` | Межстрочный интервал 1.625 |
| `tracking-tight` | Уменьшенное расстояние между буквами |
| `uppercase` | Отображение текста в верхнем регистре |
| `underline` | Подчёркивание |
| `truncate` | Одна строка с многоточием; требует ограниченной доступной ширины |

```tsx
<div className="mx-auto max-w-xl text-center">
  <p className="text-sm font-semibold uppercase text-indigo-600">Портфолио</p>
  <h1 className="mt-3 text-5xl font-bold tracking-tight">Создаю цифровые продукты</h1>
  <p className="mt-6 text-lg leading-relaxed text-slate-600">
    Интерфейсы, интерактивность и плавные анимации.
  </p>
</div>
```

[Font size](https://tailwindcss.com/docs/font-size),
[font-weight](https://tailwindcss.com/docs/font-weight),
[line-height](https://tailwindcss.com/docs/line-height),
[text-overflow](https://tailwindcss.com/docs/text-overflow).

## Цвета и оформление

| Класс | Назначение |
| --- | --- |
| `bg-white` | Белый фон |
| `bg-slate-100` | Светлый фон из палитры slate |
| `bg-indigo-600` | Фон из палитры indigo |
| `text-white` / `text-slate-900` | Цвет текста |
| `bg-black/50` | Чёрный фон с прозрачностью 50% |
| `border` | Рамка толщиной 1 px |
| `border-2` | Рамка толщиной 2 px |
| `border-slate-200` | Цвет рамки |
| `rounded-lg` | Скругление 0.5rem |
| `rounded-xl` | Скругление 0.75rem |
| `rounded-2xl` | Скругление 1rem |
| `rounded-full` | Максимальное скругление; круг у квадратного элемента |
| `shadow-md` / `shadow-xl` | Тени разной интенсивности |
| `opacity-50` | Прозрачность всего элемента и его содержимого: 50% |
| `bg-linear-to-r` | Линейный градиент слева направо |
| `from-indigo-500` / `to-purple-600` | Начальный / конечный цвет градиента |

```tsx
<article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
  <div className="mb-4 size-12 rounded-full bg-linear-to-r from-indigo-500 to-purple-600" />
  <h2 className="text-xl font-semibold text-slate-900">Карточка проекта</h2>
  <p className="mt-2 text-slate-600">Описание и детали проекта.</p>
</article>
```

`bg-black/50` делает полупрозрачным только фон. `opacity-50` влияет на весь элемент.

[Background color](https://tailwindcss.com/docs/background-color),
[border-radius](https://tailwindcss.com/docs/border-radius),
[box-shadow](https://tailwindcss.com/docs/box-shadow),
[градиенты](https://tailwindcss.com/docs/background-image).

## Позиционирование

| Класс | Назначение |
| --- | --- |
| `relative` | Сохраняет место в потоке и может стать опорой для абсолютных потомков |
| `absolute` | Убирает элемент из потока; размещает относительно ближайшего подходящего предка |
| `fixed` | Фиксирует элемент обычно относительно окна браузера |
| `sticky` | При прокрутке удерживает элемент у заданной границы внутри своего контейнера |
| `top-0` / `right-4` | Отступ от верхней / правой границы |
| `inset-0` | Задаёт нулевые отступы от всех четырёх границ |
| `z-10` / `z-50` | Уровень наложения внутри контекста наложения |
| `overflow-hidden` | Обрезает содержимое за границами области |
| `overflow-auto` | Добавляет прокрутку, когда она нужна |
| `hidden` | `display: none`; элемент не занимает место |
| `invisible` | Скрывает элемент, сохраняя его место |
| `sr-only` | Визуально скрывает текст, оставляя его для программ чтения с экрана |

```tsx
<div className="relative overflow-hidden rounded-2xl bg-slate-100 p-8">
  <span className="absolute right-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-sm text-white">
    Новый
  </span>
  <h2 className="mt-8 text-2xl font-bold">Проект с бейджем</h2>
</div>
```

Для закрепляемой шапки: `className="sticky top-0 z-50 bg-white"`.
Работа `sticky` зависит от высоты контейнера и настроек прокрутки его предков.

[Position](https://tailwindcss.com/docs/position),
[overflow](https://tailwindcss.com/docs/overflow),
[visibility](https://tailwindcss.com/docs/visibility).

## Адаптивность

Классы без префикса применяются на любой ширине.
Префикс включает правило **начиная с указанной ширины**, включая большие экраны.

| Префикс | Минимальная ширина по умолчанию |
| --- | --- |
| `sm:` | 40rem — обычно 640 px |
| `md:` | 48rem — обычно 768 px |
| `lg:` | 64rem — обычно 1024 px |
| `xl:` | 80rem — обычно 1280 px |
| `2xl:` | 96rem — обычно 1536 px |

```tsx
<section className="px-4 py-12 md:px-8 lg:py-24">
  <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">Моя страница</h1>
  <div className="mt-8 flex flex-col gap-4 md:flex-row">
    <button className="rounded-xl bg-indigo-600 px-6 py-3 text-white">Проекты</button>
    <button className="rounded-xl border border-slate-300 px-6 py-3">Связаться</button>
  </div>
</section>
```

На узком экране кнопки идут вертикально; от `md` — горизонтально.
`sm:` не означает «только телефон». Для диапазона можно сочетать
`md:max-lg:`, например `md:max-lg:bg-slate-100`.

[Responsive design](https://tailwindcss.com/docs/responsive-design).

## Состояния элементов

| Пример класса | Когда применяется |
| --- | --- |
| `hover:bg-indigo-700` | При наведении на устройствах с поддержкой hover |
| `focus-visible:ring-2` | При видимом фокусе, например после перехода клавишей Tab |
| `focus-visible:ring-indigo-500` | Цвет кольца видимого фокуса |
| `focus-visible:ring-offset-2` | Отступ кольца от элемента |
| `active:scale-95` | Во время нажатия |
| `disabled:opacity-50` | Когда элемент действительно отключён атрибутом `disabled` |
| `disabled:cursor-not-allowed` | Курсор для отключённого элемента |
| `group-hover:text-indigo-600` | Когда курсор над предком с классом `group` |
| `dark:bg-slate-900` | В тёмной теме; по умолчанию учитывает системную настройку |
| `motion-safe:hover:scale-105` | Эффект при наведении, если пользователь допускает анимации |
| `motion-reduce:transition-none` | Отключает переход при настройке уменьшения движения |

```tsx
<button
  type="button"
  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white
             transition-colors hover:bg-indigo-700
             focus-visible:outline-none focus-visible:ring-2
             focus-visible:ring-indigo-500 focus-visible:ring-offset-2
             disabled:cursor-not-allowed disabled:opacity-50"
>
  Отправить
</button>
```

Чтобы увидеть отключённое состояние, добавь кнопке `disabled`.

Пример изменения дочернего элемента при наведении на всю карточку:

```tsx
<a href="#projects" className="group block rounded-2xl border border-slate-200 p-6">
  <h2 className="text-xl font-semibold transition-colors group-hover:text-indigo-600">
    Посмотреть проекты
  </h2>
  <p className="mt-2 text-slate-600">Карточка целиком является ссылкой.</p>
</a>
```

[Состояния и варианты](https://tailwindcss.com/docs/hover-focus-and-other-states),
[dark mode](https://tailwindcss.com/docs/dark-mode).

## Переходы и трансформации

Переход плавно меняет значение при смене состояния, например при наведении.
Сам по себе `transition` не создаёт движение: нужно изменить цвет, масштаб или другое свойство.

| Класс | Назначение |
| --- | --- |
| `transition` | Переход для набора распространённых свойств, включая цвета, прозрачность и трансформации |
| `transition-colors` | Переход цвета текста, фона, рамки и других цветовых свойств |
| `transition-opacity` | Переход прозрачности |
| `transition-transform` | Переход трансформаций, включая scale, rotate и translate |
| `transition-all` | Переход всех изменяемых свойств; используй, когда это требуется |
| `duration-300` | Длительность перехода 300 мс |
| `duration-700` | Длительность перехода 700 мс |
| `delay-150` | Задержка перехода 150 мс |
| `ease-in` | Медленное начало перехода |
| `ease-out` | Замедление к концу перехода |
| `ease-in-out` | Замедление в начале и конце |
| `scale-105` | Масштаб 105% |
| `rotate-6` | Поворот на 6° |
| `-translate-y-2` | Сдвиг вверх на 0.5rem |
| `translate-x-4` | Сдвиг вправо на 1rem |
| `origin-center` | Центр трансформации |

```tsx
<article
  className="rounded-2xl border border-slate-200 bg-white p-6
             transition-transform duration-300 ease-out
             motion-safe:hover:-translate-y-2 motion-safe:hover:scale-105
             motion-reduce:transition-none"
>
  <h2 className="text-xl font-semibold">Наведи курсор</h2>
  <p className="mt-2 text-slate-600">Карточка приподнимается и увеличивается.</p>
</article>
```

Для движений обычно удобно менять `translate`, `scale`, `rotate` и `opacity`:
они не перестраивают расположение соседей, как изменение отступов или размеров.
Сдвиг не освобождает исходное место элемента, поэтому учитывай возможное перекрытие.

`duration-*` и `delay-*` здесь управляют **переходами**, а не длительностью `animate-*`.

[Transition property](https://tailwindcss.com/docs/transition-property),
[duration](https://tailwindcss.com/docs/transition-duration),
[timing function](https://tailwindcss.com/docs/transition-timing-function),
[translate](https://tailwindcss.com/docs/translate),
[scale](https://tailwindcss.com/docs/scale).

## Анимации

Анимация выполняет последовательность кадров `@keyframes`.
Она может стартовать сразу после появления элемента, без наведения.

| Класс | Назначение |
| --- | --- |
| `animate-spin` | Бесконечное вращение; один оборот за 1 секунду |
| `animate-pulse` | Бесконечное изменение прозрачности; цикл 2 секунды |
| `animate-bounce` | Бесконечное подпрыгивание; цикл 1 секунда |
| `animate-ping` | Расширение и исчезновение; цикл 1 секунда |
| `animate-none` | Отключение анимации |
| `motion-safe:animate-pulse` | Пульсация только при разрешённом движении |
| `motion-reduce:animate-none` | Отключение анимации при уменьшении движения |

Индикатор загрузки:

```tsx
<div role="status" className="inline-flex items-center gap-3">
  <span
    aria-hidden="true"
    className="size-6 rounded-full border-2 border-indigo-600 border-t-transparent
               motion-safe:animate-spin"
  />
  <span>Загрузка…</span>
</div>
```

### Собственное появление блока

Добавь после существующего импорта в `src/styles.css`:

```css
@theme {
  --animate-reveal: reveal 700ms ease-out both;

  @keyframes reveal {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

Теперь можно использовать новый класс `animate-reveal`:

```tsx
<section className="px-6 py-20 motion-safe:animate-reveal">
  <h1 className="text-5xl font-bold">Привет, я создаю интерфейсы</h1>
  <p className="mt-6 text-lg text-slate-600">Текст плавно появляется снизу.</p>
</section>
```

`both` применяет начальное состояние до старта и сохраняет конечное после завершения.
Один запуск выполняется при добавлении элемента на страницу; обычный повторный рендер
React сам по себе не обязан перезапускать CSS-анимацию.

Для задержки именно этой анимации используй произвольное CSS-свойство:

```tsx
<p className="motion-safe:animate-reveal [animation-delay:200ms]">
  Появлюсь немного позже
</p>
```

Блоки с такой анимацией стартуют при появлении в DOM, даже если находятся ниже экрана.
Для запуска при прокрутке понадобится определить видимость, например через
`IntersectionObserver`, и затем добавить класс в React.

[Готовые анимации и настройка](https://tailwindcss.com/docs/animation),
[theme variables](https://tailwindcss.com/docs/theme).

## Произвольные значения и тема

Квадратные скобки задают точное значение, если стандартная шкала не подходит:

| Класс | Назначение |
| --- | --- |
| `w-[320px]` | Ширина ровно 320 px |
| `max-w-[1200px]` | Максимальная ширина 1200 px |
| `bg-[#121212]` | Фон с указанным HEX-цветом |
| `text-[42px]` | Размер шрифта 42 px |
| `rounded-[20px]` | Скругление 20 px |
| `duration-[450ms]` | Длительность перехода 450 мс |

```tsx
<div className="w-full max-w-[1200px] rounded-[20px] bg-[#121212] p-8 text-white">
  <h2 className="text-[42px] font-bold">Точные значения</h2>
</div>
```

Повторяющийся цвет можно добавить в тему в `src/styles.css` после импорта:

```css
@theme {
  --color-brand: #6d28d9;
}
```

После этого работают `bg-brand`, `text-brand` и `border-brand`:

```tsx
<button className="rounded-xl bg-brand px-6 py-3 text-white">Цвет бренда</button>
```

Для текущей базовой настройки Tailwind 4 отдельный `tailwind.config.js` не нужен.

[Произвольные значения](https://tailwindcss.com/docs/styling-with-utility-classes#using-arbitrary-values),
[настройка темы](https://tailwindcss.com/docs/theme).

## Классы и состояние React

Tailwind ищет полные имена классов в файлах. Конструкция вроде
``className={`bg-${color}-600`}`` не гарантирует генерацию нужного CSS.
Выбирай между полными строками классов.

Пример компонента с раскрывающейся панелью. Сохрани его в собственном `.tsx`-файле
или временно используй вместо `App.tsx`:

```tsx
import { useState } from "react";

export default function Details() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-xl p-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="details-panel"
        onClick={() => setOpen((value) => !value)}
        className="rounded-xl bg-indigo-600 px-6 py-3 text-white"
      >
        {open ? "Скрыть детали" : "Показать детали"}
      </button>

      <div
        id="details-panel"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300
                    motion-reduce:transition-none
                    ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-slate-600">
            Высота плавно меняется при нажатии на кнопку.
          </p>
        </div>
      </div>
    </section>
  );
}
```

В этой панели только текст. Если добавляешь внутрь ссылки или поля ввода,
позаботься также об отключении их фокуса в закрытом состоянии, например с помощью `inert`.

Для значений, полученных во время работы программы, можно использовать `style`:

```tsx
<div style={{ backgroundColor: "#6d28d9" }} className="rounded-xl p-6 text-white">
  Цвет может приходить из API
</div>
```

[Обнаружение классов](https://tailwindcss.com/docs/detecting-classes-in-source-files).

## Готовый пример страницы

Этот пример можно целиком вставить в `src/App.tsx`. Он использует только
встроенные классы и работает с текущим `src/styles.css`.

```tsx
export default function App() {
  return (
    <main id="home" className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <a href="#home" className="text-xl font-bold">Моё портфолио</a>
        <a href="#projects" className="text-sm font-medium hover:text-indigo-600">
          Проекты
        </a>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-28">
        <p className="font-semibold text-indigo-600">Дизайн и разработка</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Создаю страницы, которые хочется исследовать
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          React, TypeScript и плавные анимации на Tailwind CSS.
        </p>
        <a
          href="#projects"
          className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3
                     font-semibold text-white transition duration-300
                     hover:bg-indigo-700 motion-safe:hover:-translate-y-1
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                     motion-reduce:transition-none"
        >
          Посмотреть проекты
        </a>
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-6 text-3xl font-bold">Проекты</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Личный сайт", "Интерактивная страница", "Анимации"].map((title) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6
                         shadow-sm transition-transform duration-300
                         motion-safe:hover:-translate-y-2
                         motion-reduce:transition-none"
            >
              <div className="mb-5 aspect-video rounded-xl bg-indigo-100" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                Здесь будет описание проекта.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

Запусти `npm run dev`, открой адрес из вывода Vite и сохраняй изменения.
Наведение проверяй мышью, фокус — клавишей Tab, адаптивность — изменением ширины окна.
Для собственного появления секций добавь `@theme` из раздела «Анимации» и класс
`motion-safe:animate-reveal` нужным блокам.

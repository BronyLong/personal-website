# Практические приёмы HTML/CSS и их аналоги в Tailwind

Этот справочник дополняет [справочник классов Tailwind](TAILWIND.md).
В каждом разделе: задача, обычный HTML/CSS, затем аналог на Tailwind 4.
Примеры Tailwind написаны в JSX для React + TypeScript.

Это набор приёмов, из которых выбирают подходящие конкретной странице.
Цвета и тени из стандартной темы Tailwind могут отличаться от HEX-значений
в обычном CSS-примере; если нужна точная копия, задай свои значения через `@theme`.

В этом проекте разметка живёт в `src/App.tsx` и компонентах,
а общие стили, тема и ключевые кадры — в `src/styles.css`.
Примеры иллюстрируют оформление; обработчики действий и загрузку данных
добавляют в React отдельно.

## Содержание

- [Семантическая разметка](#семантическая-разметка)
- [Базовые стили и box-sizing](#базовые-стили-и-box-sizing)
- [Токены дизайна](#токены-дизайна)
- [Контейнер и ритм отступов](#контейнер-и-ритм-отступов)
- [Адаптивная сетка](#адаптивная-сетка)
- [Плавно меняющаяся типографика](#плавно-меняющаяся-типографика)
- [Длинный контент и переполнение](#длинный-контент-и-переполнение)
- [Состояния кнопок и фокус](#состояния-кнопок-и-фокус)
- [Поля формы и ошибки](#поля-формы-и-ошибки)
- [Изображения и стабильная геометрия](#изображения-и-стабильная-геометрия)
- [Закреплённая шапка и якоря](#закреплённая-шапка-и-якоря)
- [Переходы и анимации](#переходы-и-анимации)
- [Тёмная тема](#тёмная-тема)
- [Повторяемые компоненты](#повторяемые-компоненты)
- [Краткая таблица соответствий](#краткая-таблица-соответствий)

## Семантическая разметка

**Задача:** сделать структуру страницы понятной браузеру, пользователю
и программам чтения с экрана. Тег выбирают по назначению, а его внешний вид задают стилями.

Для перехода используют `<a href="...">`, для действия — `<button>`.
У кнопки вне отправки формы указывают `type="button"`.
У страницы обычно один основной `<main>` и главный заголовок `<h1>`;
разделы получают `<h2>`, вложенные темы — `<h3>`.

**HTML + CSS:**

```html
<header>
  <nav class="site-nav" aria-label="Основная навигация">
    <a href="#projects">Проекты</a>
    <a href="#contacts">Контакты</a>
  </nav>
</header>
<main>
  <h1 class="page-title">Моё портфолио</h1>
  <section id="projects" aria-labelledby="projects-title">
    <h2 id="projects-title">Проекты</h2>
  </section>
  <section id="contacts" aria-labelledby="contacts-title">
    <h2 id="contacts-title">Контакты</h2>
    <a href="mailto:hello@example.com">Написать мне</a>
  </section>
</main>
```

```css
.site-nav { display: flex; gap: 1.5rem; }
.page-title { font-size: 3rem; font-weight: 700; }
```

**Аналог на Tailwind:**

```tsx
<>
  <header>
    <nav className="flex gap-6" aria-label="Основная навигация">
      <a href="#projects">Проекты</a>
      <a href="#contacts">Контакты</a>
    </nav>
  </header>
  <main>
    <h1 className="text-5xl font-bold">Моё портфолио</h1>
    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Проекты</h2>
    </section>
    <section id="contacts" aria-labelledby="contacts-title">
      <h2 id="contacts-title">Контакты</h2>
      <a href="mailto:hello@example.com">Написать мне</a>
    </section>
  </main>
</>
```

Tailwind отвечает за оформление; семантика и HTML-атрибуты остаются теми же.
[MDN: семантика и доступность HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML).

## Базовые стили и box-sizing

**Задача:** сделать расчёт размеров предсказуемым и убрать случайные браузерные отступы.
При `border-box` заданная ширина включает рамки и внутренние отступы.

**Обычный CSS:**

```css
*, *::before, *::after {
  box-sizing: border-box;
}

body { margin: 0; font-family: system-ui, sans-serif; }
h1, h2, h3, p { margin: 0; }
button, input, textarea, select { font: inherit; }
img { display: block; max-width: 100%; height: auto; }
```

Это пример небольшого базового слоя, который действует на всю страницу.
В следующих обычных CSS-примерах предполагается, что базовый слой подключён.

**Аналог в Tailwind:**

```css
/* src/styles.css — уже подключено в проекте */
@import "tailwindcss";
```

Импорт включает Preflight: базовый слой с `border-box`, сбросом отступов
и другими правилами нормализации. Заголовки получают оформление через классы:

```tsx
<h2 className="mb-6 text-3xl font-bold">Проекты</h2>
```

Размер тега `<h2>` и его отступы после Preflight задаются явно.
[Tailwind: Preflight](https://tailwindcss.com/docs/preflight).

## Токены дизайна

**Задача:** хранить повторяющиеся цвета, размеры и скругления в одном месте.
Тогда изменение цвета бренда не требует редактирования каждой кнопки.

**HTML + CSS:**

```html
<button type="button" class="brand-button">Начать</button>
```

```css
:root {
  --color-brand: #6d28d9;
  --radius-card: 1.25rem;
  --space-control-x: 1.5rem;
}

.brand-button {
  border: 0;
  border-radius: var(--radius-card);
  padding: 0.75rem var(--space-control-x);
  background: var(--color-brand);
  color: white;
}
```

**Аналог на Tailwind:**

Добавь после импорта в `src/styles.css`:

```css
@theme {
  --color-brand: #6d28d9;
  --radius-card: 1.25rem;
}
```

```tsx
<button type="button" className="rounded-card bg-brand px-6 py-3 text-white">
  Начать
</button>
```

`--color-brand` создаёт классы `bg-brand`, `text-brand`, `border-brand`.
`--radius-card` создаёт `rounded-card`. Отступ `px-6` берётся из общей шкалы.
Для единичного точного значения можно использовать `rounded-[20px]`;
для повторяющегося решения удобнее именованный токен.
[Tailwind: theme variables](https://tailwindcss.com/docs/theme).

## Контейнер и ритм отступов

**Задача:** ограничить ширину контента на большом мониторе и сохранить поля на телефоне.
Соседние элементы внутри группы разделяют через `gap`, а разделы — через отступы секций.

**HTML + CSS:**

```html
<section class="section">
  <div class="page-container stack">
    <h2>Обо мне</h2>
    <p>Создаю интерфейсы и интерактивные страницы.</p>
    <a href="#projects">Посмотреть проекты</a>
  </div>
</section>
```

```css
.page-container {
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
.section { padding-block: 4rem; }
.stack { display: flex; flex-direction: column; gap: 1.5rem; }
```

**Аналог на Tailwind:**

```tsx
<section className="py-16">
  <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
    <h2>Обо мне</h2>
    <p>Создаю интерфейсы и интерактивные страницы.</p>
    <a href="#projects">Посмотреть проекты</a>
  </div>
</section>
```

`mx-auto` центрирует, `max-w-6xl` ограничивает ширину, `px-6` создаёт поля.
`gap-6` задаёт расстояние между дочерними элементами без отдельных `margin` для каждого.
Класс `container` тоже существует, но центрирование и поля ему задают отдельно.
[Tailwind: max-width и container](https://tailwindcss.com/docs/max-width),
[gap](https://tailwindcss.com/docs/gap).

## Адаптивная сетка

**Задача:** начать с одной колонки и добавлять колонки, когда для них хватает места.
Точки переключения выбирают по содержимому страницы.

**HTML + CSS:**

```html
<div class="projects-grid">
  <article>Проект A</article>
  <article>Проект B</article>
  <article>Проект C</article>
</div>
```

```css
.projects-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
@media (min-width: 48rem) {
  .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 64rem) {
  .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

**Аналог на Tailwind:**

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <article>Проект A</article>
  <article>Проект B</article>
  <article>Проект C</article>
</div>
```

В стандартной теме `md` начинается с `48rem`, `lg` — с `64rem`.
`minmax(0, 1fr)` позволяет колонкам сжиматься даже при длинном содержимом;
встроенные `grid-cols-*` используют такую схему.
[Tailwind: responsive design](https://tailwindcss.com/docs/responsive-design),
[grid-template-columns](https://tailwindcss.com/docs/grid-template-columns).

## Плавно меняющаяся типографика

**Задача:** плавно увеличивать заголовок вместе с шириной окна, сохраняя пределы.
Текстовые абзацы ограничивают по длине строки, чтобы их было удобно читать.

**HTML + CSS:**

```html
<div class="hero-copy">
  <h1 class="hero-title">Создаю цифровые продукты</h1>
  <p class="hero-description">Дизайн, разработка и анимации для современных интерфейсов.</p>
</div>
```

```css
.hero-title {
  font-size: clamp(2rem, 1rem + 4vw, 4.5rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.025em;
}
.hero-description {
  max-width: 65ch;
  margin-top: 1.5rem;
  line-height: 1.625;
}
```

**Аналог на Tailwind:**

```tsx
<div>
  <h1 className="text-[clamp(2rem,1rem_+_4vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
    Создаю цифровые продукты
  </h1>
  <p className="mt-6 max-w-[65ch] leading-relaxed">
    Дизайн, разработка и анимации для современных интерфейсов.
  </p>
</div>
```

`clamp(минимум, желаемое значение, максимум)` ограничивает вычисляемый размер.
`ch` основан на ширине символа «0» текущего шрифта: `65ch` — ориентир длины строки.
Другой вариант — ступенчатая шкала `text-3xl md:text-5xl lg:text-6xl`.
[MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp),
[Tailwind: font-size](https://tailwindcss.com/docs/font-size).

## Длинный контент и переполнение

**Задача:** сохранить макет, когда имя файла, заголовок или ссылка длиннее ожидаемого.
У flex-элемента автоматическая минимальная ширина может мешать сжатию.

**HTML + CSS:**

```html
<div class="file-row">
  <div class="file-info">
    <p class="file-name">Очень-длинное-название-проекта-без-пробелов.pdf</p>
  </div>
  <button type="button" class="file-action">Скачать</button>
</div>
```

```css
.file-row { display: flex; align-items: center; gap: 1rem; }
.file-info { flex: 1; min-width: 0; }
.file-name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.file-action { flex-shrink: 0; }
```

**Аналог на Tailwind:**

```tsx
<div className="flex items-center gap-4">
  <div className="min-w-0 flex-1">
    <p className="truncate">Очень-длинное-название-проекта-без-пробелов.pdf</p>
  </div>
  <button type="button" className="shrink-0">Скачать</button>
</div>
```

`min-w-0` разрешает сжатие, `truncate` добавляет многоточие, `shrink-0` сохраняет ширину кнопки.
Для текста, который нужно прочитать целиком, используй перенос вместо обрезки:
`overflow-wrap: anywhere` → `wrap-anywhere`.
Обрезка текста — отдельное решение интерфейса; полный текст должен быть доступен там,
где он нужен пользователю.
[MDN: min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width),
[Tailwind: text-overflow](https://tailwindcss.com/docs/text-overflow).

## Состояния кнопок и фокус

**Задача:** оформить обычное состояние, наведение, фокус клавиатуры и отключение.
Видимый фокус помогает пользователю понимать, какой элемент активен при нажатии Tab.

**HTML + CSS:**

```html
<button type="button" class="button">Отправить</button>
```

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  border: 0;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  transition: background-color 200ms;
}
@media (hover: hover) {
  .button:not(:disabled):hover { background: #4338ca; }
}
.button:focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }
.button:disabled { opacity: 0.5; cursor: not-allowed; }
```

**Аналог на Tailwind:**

```tsx
<button
  type="button"
  className="inline-flex min-h-11 items-center justify-center rounded-xl
             bg-indigo-600 px-6 py-3 font-semibold text-white
             transition-colors duration-200 enabled:hover:bg-indigo-700
             focus-visible:outline-2 focus-visible:outline-indigo-600
             focus-visible:outline-offset-2
             disabled:cursor-not-allowed disabled:opacity-50"
>
  Отправить
</button>
```

Добавление атрибута `disabled` включает отключённое состояние; изменение цвета само по себе
не отключает кнопку. Вариант `enabled:hover:` сохраняет оформление отключённой кнопки.
Цвета проверяют на читаемость относительно фона, а область нажатия — на удобство использования.
[MDN: focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible),
[Tailwind: состояния](https://tailwindcss.com/docs/hover-focus-and-other-states).

## Поля формы и ошибки

**Задача:** дать полю понятное название, подсказку и читаемое сообщение об ошибке.
Название связывают с полем через `for`/`id`; в React используется `htmlFor`.
Ошибка должна передаваться текстом и состоянием поля.

**HTML + CSS:**

```html
<div class="field">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email"
         required aria-invalid="true" aria-describedby="email-error" />
  <p id="email-error" class="field-error">Введите корректный email.</p>
</div>
```

```css
.field { display: grid; gap: 0.5rem; }
.field input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
}
.field input:focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }
.field input[aria-invalid="true"] { border-color: #dc2626; }
.field-error { color: #dc2626; font-size: 0.875rem; }
```

**Аналог на Tailwind:**

```tsx
<div className="grid gap-2">
  <label htmlFor="email" className="font-medium">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    required
    aria-invalid="true"
    aria-describedby="email-error"
    className="w-full rounded-xl border border-slate-300 px-4 py-3
               focus-visible:outline-2 focus-visible:outline-indigo-600
               focus-visible:outline-offset-2 aria-invalid:border-red-600"
  />
  <p id="email-error" className="text-sm text-red-600">Введите корректный email.</p>
</div>
```

Показан вид поля **после неудачной проверки**. В работающей форме React устанавливает
`aria-invalid` и показывает сообщение по результатам проверки, а в нормальном состоянии
убирает сообщение и его связь с полем. Tailwind стилизует результат этой логики.
`placeholder` может приводить пример ввода, а постоянное название остаётся в `<label>`.
[MDN: label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label),
[aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid).

## Изображения и стабильная геометрия

**Задача:** зарезервировать место до загрузки изображения и корректно обрезать его в карточке.
Указывай размеры с правильным соотношением сторон исходного файла.

**HTML + CSS:**

```html
<img class="project-cover" src="/project.webp"
     width="1200" height="800" alt="Главная страница проекта"
     loading="lazy" decoding="async" />
```

```css
.project-cover {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 1rem;
}
```

**Аналог на Tailwind:**

```tsx
<img
  src="/project.webp"
  width={1200}
  height={800}
  alt="Главная страница проекта"
  loading="lazy"
  decoding="async"
  className="block aspect-[3/2] h-auto w-full rounded-2xl object-cover"
/>
```

Для примера нужен собственный файл `public/project.webp` размером 1200 × 800.
`width` и `height` — HTML-атрибуты, `w-full` задаёт адаптивную отображаемую ширину.
Для изображения ниже первого экрана подходит `loading="lazy"`.
Главное изображение первого экрана обычно загружают сразу; `fetchPriority="high"`
добавляют, когда оно действительно является важным ресурсом.
Содержательное изображение получает описательный `alt`, декоративное — `alt=""`.
Для разных размеров файла можно добавить `srcSet` и `sizes`; классы их не заменяют.
[MDN: img](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img),
[aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio).

## Закреплённая шапка и якоря

**Задача:** сохранить навигацию при прокрутке и оставить заголовки видимыми после перехода по якорю.

**HTML + CSS:**

```html
<header class="site-header">
  <a href="#projects">Проекты</a>
</header>
<section id="projects" class="anchor-section">
  <h2>Проекты</h2>
</section>
```

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 1.5rem;
  background: rgb(255 255 255 / 90%);
  backdrop-filter: blur(12px);
}
.anchor-section { scroll-margin-top: 6rem; }
```

**Аналог на Tailwind:**

```tsx
<>
  <header className="sticky top-0 z-20 bg-white/90 p-6 backdrop-blur-md">
    <a href="#projects">Проекты</a>
  </header>
  <section id="projects" className="scroll-mt-24">
    <h2>Проекты</h2>
  </section>
</>
```

`sticky` работает в пределах своего контейнера и зависит от прокрутки предков.
Отступ `scroll-mt-24` подбирают под реальную высоту шапки.
Значение `z-20` действует внутри контекста наложения: большое число само по себе
не позволяет элементу выйти из контекста предка.
[Tailwind: position](https://tailwindcss.com/docs/position),
[MDN: scroll-margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-top).

## Переходы и анимации

**Задача:** объяснить смену состояния и направить внимание к содержимому.
Для простых движений удобно анимировать трансформации и прозрачность.
Изменение `width`, `height` или отступов может затрагивать расчёт расположения соседей.

### Переход при наведении

**HTML + CSS:**

```html
<article class="project-card"><h2>Личный сайт</h2></article>
```

```css
.project-card { border-radius: 1rem; padding: 1.5rem; background: white; }
@media (prefers-reduced-motion: no-preference) {
  .project-card { transition: transform 300ms ease-out; }
}
@media (prefers-reduced-motion: no-preference) and (hover: hover) {
  .project-card:hover { transform: translateY(-4px); }
}
```

**Аналог на Tailwind:**

```tsx
<article
  className="rounded-2xl bg-white p-6
             motion-safe:transition-transform motion-safe:duration-300
             motion-safe:ease-out motion-safe:hover:-translate-y-1"
>
  <h2>Личный сайт</h2>
</article>
```

`motion-safe:` включает движение, когда пользователь не запросил уменьшение анимаций.
Переход запускается при смене значения; один класс `transition-transform` сам не сдвигает элемент.

### Появление при добавлении на страницу

**HTML + CSS:**

```html
<section class="hero"><h1>Моё портфолио</h1></section>
```

```css
@keyframes enter {
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: no-preference) {
  .hero { animation: enter 600ms ease-out both; }
}
```

**Аналог на Tailwind:**

Определение в `src/styles.css` после импорта:

```css
@theme {
  --animate-enter: enter 600ms ease-out both;
  @keyframes enter {
    from { opacity: 0; transform: translateY(1rem); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

```tsx
<section className="motion-safe:animate-enter">
  <h1>Моё портфолио</h1>
</section>
```

Анимация запускается при появлении элемента в DOM. Для запуска при прокрутке
нужна логика видимости, например `IntersectionObserver`, и добавление класса в React.
Не скрывай важное содержимое навсегда через `opacity-0` в ожидании обработчика:
при отсутствии анимации оно должно оставаться доступным.
Длительность `animate-enter` задаётся в определении анимации;
`duration-300` управляет длительностью перехода.
[MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion),
[Tailwind: animation](https://tailwindcss.com/docs/animation),
[transition-property](https://tailwindcss.com/docs/transition-property).

## Тёмная тема

**Задача:** менять фон, цвет текста и рамки согласованно.
В этом примере тема следует системному предпочтению.

**HTML + CSS:**

```html
<article class="theme-card">
  <h2>Проект</h2>
  <p>Описание проекта</p>
</article>
```

```css
.theme-card {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  background: white;
  color: #0f172a;
}
@media (prefers-color-scheme: dark) {
  .theme-card { border-color: #334155; background: #0f172a; color: #f8fafc; }
}
```

**Аналог на Tailwind:**

```tsx
<article
  className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900
             dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
>
  <h2>Проект</h2>
  <p>Описание проекта</p>
</article>
```

По умолчанию `dark:` учитывает `prefers-color-scheme`.
Для ручного переключателя можно настроить вариант по классу в `src/styles.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

После такой настройки `dark:*` зависит от класса `dark`, например на `<html>`.
React должен отдельно управлять выбором темы; сохранение выбора между посещениями
и применение до первого отображения страницы — части этой логики.
[Tailwind: dark mode](https://tailwindcss.com/docs/dark-mode).

## Повторяемые компоненты

**Задача:** одинаковые карточки должны иметь общий источник оформления.
В обычном CSS это классы компонента; в React с Tailwind — общий компонент с его классами.

**HTML + CSS:**

```html
<article class="card">
  <h2 class="card__title">Личный сайт</h2>
  <p class="card__description">Портфолио с анимациями.</p>
</article>
```

```css
.card { border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; background: white; }
.card__title { margin: 0; font-size: 1.25rem; font-weight: 600; }
.card__description { margin: 0.5rem 0 0; color: #475569; line-height: 1.625; }
```

Классы именованы по компоненту, поэтому изменения не зависят от глубокой цепочки
вложенных селекторов. Это один из вариантов организации CSS.

**Аналог на Tailwind + React:**

```tsx
type ProjectCardProps = {
  title: string;
  description: string;
};

export function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}

export default function Projects() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProjectCard title="Личный сайт" description="Портфолио с анимациями." />
      <ProjectCard title="Каталог" description="Поиск и фильтрация проектов." />
    </div>
  );
}
```

Данные меняются через props, оформление — в одном компоненте.
При добавлении вариантов выбирай полные строки классов, чтобы Tailwind мог их обнаружить.
Например, `featured ? "border-indigo-600" : "border-slate-200"`.
Собственные CSS-правила для переиспользуемых компонентов можно помещать в
`@layer components`, сохраняя предсказуемый порядок слоёв Tailwind.
[Tailwind: управление повторениями](https://tailwindcss.com/docs/styling-with-utility-classes#managing-duplication),
[добавление собственных стилей](https://tailwindcss.com/docs/adding-custom-styles).

## Краткая таблица соответствий

| Обычный CSS | Tailwind | Практический случай |
| --- | --- | --- |
| `display: flex; gap: 1rem` | `flex gap-4` | Строка кнопок или навигация |
| `flex-direction: column` | `flex-col` | Вертикальная группа элементов |
| `align-items: center` | `items-center` | Выравнивание элементов строки |
| `max-width: 72rem; margin-inline: auto` | `max-w-6xl mx-auto` | Основной контейнер |
| `padding-inline: 1.5rem` | `px-6` | Боковые поля |
| `grid-template-columns: repeat(3, minmax(0, 1fr))` | `grid-cols-3` с `grid` | Сетка карточек |
| `@media (min-width: 48rem)` | `md:` | Стили от средней ширины окна |
| `min-width: 0` | `min-w-0` | Сжатие длинного содержимого |
| `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` | `truncate` | Заголовок в одну строку |
| `aspect-ratio: 16 / 9` | `aspect-video` | Обложка видео |
| `object-fit: cover` | `object-cover` | Обрезка изображения |
| `position: sticky; top: 0` | `sticky top-0` | Закреплённая шапка |
| `scroll-margin-top: 6rem` | `scroll-mt-24` | Отступ для перехода по якорю |
| `transition: transform 300ms ease-out` | `transition-transform duration-300 ease-out` | Плавный сдвиг |
| `transform: translateY(-4px)` | `-translate-y-1` | Небольшое движение вверх |
| `@media (prefers-reduced-motion: no-preference)` | `motion-safe:` | Движение по предпочтению пользователя |
| `@media (prefers-color-scheme: dark)` | `dark:` по умолчанию | Системная тёмная тема |

В Tailwind трансформации могут использовать отдельные CSS-свойства `translate`,
`scale` и `rotate`; в таблице приведено соответствие по визуальному результату.

Для своей страницы начни с семантики, контейнера и сетки. Затем настрой текст,
повторяемые компоненты и состояния. Анимации добавляй к уже работающей вёрстке —
так проще увидеть, какое движение помогает взаимодействию.

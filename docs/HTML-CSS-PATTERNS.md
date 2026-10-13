# Практические приёмы HTML и CSS

Справочник для проекта на HTML + CSS + React + TypeScript.
В каждом разделе приведены задача и пример обычного HTML/CSS.
Разметку компонентов меняй в `src/App.tsx` и `src/components/`,
стили — в `src/styles.css`. В React используй `className` вместо `class`,
`htmlFor` вместо `for`; остальные различия атрибутов видны в подсказках TypeScript.

Примеры из разделов можно использовать независимо. Для изображений
нужно добавить соответствующие файлы в `public/`. Обработчики действий
и проверка данных формы добавляются в React отдельно.

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

## Повторяемые компоненты

**Задача:** одинаковые карточки должны иметь общий источник оформления.
В CSS оформление хранится в классах компонента; в React эти классы используются в общем компоненте.

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

## Классы текущего сайта

| Класс | Назначение |
| --- | --- |
| `.page` | Общая обёртка с минимальной высотой окна |
| `.container` | Контейнер шириной до 1200 px, расположенный по центру |
| `.site-header` | Шапка и боковые поля |
| `.site-header__name` | Имя в шапке |
| `.site-header__menu` | Нумерованный список с промежутками и переносом |
| `.site-header__status` | Статус доступности |

Чтобы оформить новый компонент, добавь ему понятный класс в JSX
и опиши соответствующий селектор в `src/styles.css`:

```tsx
<section className="hero">
  <h1 className="hero__title">Моя страница</h1>
</section>
```

```css
.hero { padding-block: 4rem; }
.hero__title { font-size: clamp(2rem, 1rem + 4vw, 4.5rem); font-weight: 700; }
@media (min-width: 48rem) {
  .hero { padding-block: 6rem; }
}
```

## Справочные источники

- [MDN: HTML и доступность](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML).
- [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS).
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp).
- [MDN: min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width).
- [MDN: изображения](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img).
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

В браузере проверяй ширину окна, длинные тексты, переход клавишей Tab
и переключение системных настроек темы и движения.

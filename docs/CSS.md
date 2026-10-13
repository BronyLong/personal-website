# CSS — подробная методичка

От первых селекторов до адаптивных макетов, анимаций и организации стилей.
Примеры используют обычный CSS без внешнего фреймворка.
Разметка и атрибуты разобраны в отдельной [методичке HTML](HTML.md).

## Маршрут изучения

1. Подключение, селекторы, каскад и box model.
2. Размеры, текст, цвета и нормальный поток.
3. Flexbox, Grid и позиционирование.
4. Адаптивность, состояния, формы и изображения.
5. Переходы, анимации и предпочтения пользователя.
6. Организация CSS, отладка и сквозной пример.

В текущем проекте CSS подключается импортом из `src/main.tsx`.
Начни с `src/styles.css`; в компонентах указывай `className="имя-класса"`.
Примеры в отдельных разделах показывают независимые приёмы: не копируй все правила
одновременно без проверки имён и возможных переопределений.
Современные дополнительные возможности проверяй в целевых браузерах;
раздел о progressive enhancement показывает, как сохранять базовое поведение.

## Содержание

- [Маршрут изучения](#маршрут-изучения)
- [Что делает CSS](#что-делает-css)
- [Подключение и организация файлов](#подключение-и-организация-файлов)
- [Селекторы](#селекторы)
- [Псевдоклассы и псевдоэлементы](#псевдоклассы-и-псевдоэлементы)
- [Каскад — как выбирается значение](#каскад--как-выбирается-значение)
- [Специфичность и функциональные селекторы](#специфичность-и-функциональные-селекторы)
- [Наследование и специальные значения](#наследование-и-специальные-значения)
- [Слои каскада](#слои-каскада)
- [Box model и box-sizing](#box-model-и-box-sizing)
- [Отступы и схлопывание margin](#отступы-и-схлопывание-margin)
- [Единицы измерения](#единицы-измерения)
- [Размеры, ограничения и intrinsic sizing](#размеры-ограничения-и-intrinsic-sizing)
- [Математика и логические свойства](#математика-и-логические-свойства)
- [CSS-переменные и тема](#css-переменные-и-тема)
- [Цвета, фоны и изображения фона](#цвета-фоны-и-изображения-фона)
- [Типографика и шрифты](#типографика-и-шрифты)
- [Нормальный поток и display](#нормальный-поток-и-display)
- [Flexbox — контейнер и оси](#flexbox--контейнер-и-оси)
- [Flexbox — размеры элементов](#flexbox--размеры-элементов)
- [Grid — строки и колонки](#grid--строки-и-колонки)
- [Автоматические сетки и области](#автоматические-сетки-и-области)
- [Центрирование](#центрирование)
- [Позиционирование](#позиционирование)
- [Контексты наложения и z-index](#контексты-наложения-и-z-index)
- [Переполнение и скрытие](#переполнение-и-скрытие)
- [Адаптивность через media queries](#адаптивность-через-media-queries)
- [Container queries](#container-queries)
- [Изображения и соотношение сторон](#изображения-и-соотношение-сторон)
- [Кнопки, ссылки и поля формы](#кнопки-ссылки-и-поля-формы)
- [Трансформации и визуальные эффекты](#трансформации-и-визуальные-эффекты)
- [Переходы между состояниями](#переходы-между-состояниями)
- [Keyframes и анимации](#keyframes-и-анимации)
- [Движение при прокрутке](#движение-при-прокрутке)
- [Предпочтения пользователя и тёмная тема](#предпочтения-пользователя-и-тёмная-тема)
- [Progressive enhancement и supports](#progressive-enhancement-и-supports)
- [Нативная вложенность CSS](#нативная-вложенность-css)
- [Организация классов и CSS Modules](#организация-классов-и-css-modules)
- [Производительность и работа отрисовки](#производительность-и-работа-отрисовки)
- [Стили для печати](#стили-для-печати)
- [Порядок отладки CSS](#порядок-отладки-css)
- [Стили для сквозного примера](#стили-для-сквозного-примера)
- [Упражнения и проверка понимания](#упражнения-и-проверка-понимания)
- [Справочник свойств по задачам](#справочник-свойств-по-задачам)
- [Источники и дальнейшее чтение](#источники-и-дальнейшее-чтение)

## Что делает CSS

CSS выбирает элементы и назначает им значения свойств.
Браузер сопоставляет правила, разрешает конфликты, вычисляет значения,
строит макет и рисует результат. Наличие декларации в файле ещё не означает, что она победила.

```css
.project-card {
  padding: 24px;
  border-radius: 16px;
  background: white;
}
```

`.project-card` — селектор; фигурные скобки — блок деклараций.
`padding` — свойство; `24px` — значение; точка с запятой отделяет декларации.
Комментарии пишут `/* так */`. Единицы для ненулевой длины обычно обязательны.
Неверное значение отдельного свойства обычно игнорируется; ошибка структуры
может повлиять на разбор большого фрагмента файла.

## Подключение и организация файлов

Для отдельной HTML-страницы:

```html
<link rel="stylesheet" href="styles.css">
```

В React-проекте уже есть:

```tsx
import './styles.css';
```

Это фрагмент подключения в `main.tsx`, а не самостоятельный компонент.
Глобальные стили действуют на весь документ независимо от файла, из которого импортированы.
Отдельный CSS-файл компонента удобен организационно, но обычный импорт не изолирует селекторы.
Inline-стиль полезен для значения, вычисленного во время работы:

```tsx
<div className="progress-bar" style={{ width: '60%' }} />
```

Для переиспользуемого оформления удобнее классы; для темы — CSS-переменные.
Пути `url()` в CSS разрешаются относительно файла стилей/результата обработки,
а не произвольного React-компонента. Файлы в `public/` обычно доступны от корня сайта.

## Селекторы

| Селектор | Выбирает |
| --- | --- |
| `p` | Все p |
| `.card` | Элементы с классом card |
| `#projects` | Элемент с таким id |
| `*` | Любой элемент |
| `.card p` | Все подходящие p внутри card на любой глубине |
| `.card > p` | Только непосредственных детей p |
| `h2 + p` | p сразу после h2 с тем же родителем |
| `h2 ~ p` | Подходящие последующие соседние p |
| `[disabled]` | Элементы с атрибутом |
| `[data-state="open"]` | Элементы с конкретным значением атрибута |
| `h1.title` | h1, у которого есть класс title |
| `h1 .title` | Потомок h1 с классом title |
| `.card, .panel` | Объединение двух независимых выборок |

```css
.project-card > h3 { margin-bottom: 8px; }
.project-card a { color: #6d28d9; }
.project-card[data-featured="true"] { border-color: #6d28d9; }
```

Пробел — часть селектора, а не украшение. Старайся привязывать оформление
к устойчивому классу, если оно не должно зависеть от всей цепочки вложенности.
[MDN: селекторы](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors).

## Псевдоклассы и псевдоэлементы

Псевдокласс выбирает состояние/положение; псевдоэлемент — определённую часть отображения.

| Запись | Назначение |
| --- | --- |
| `:hover` | Наведение |
| `:focus` | Фокус |
| `:focus-visible` | Фокус, для которого браузер считает нужным видимое выделение |
| `:focus-within` | Фокус на самом элементе или его потомке |
| `:active` | Активация, например во время нажатия |
| `:checked` | Выбранное состояние checkbox/radio |
| `:disabled` / `:enabled` | Недоступное/доступное состояние элемента |
| `:first-child` / `:last-child` | Положение среди детей |
| `:nth-child(2n)` | Каждый второй ребёнок |
| `:not(.featured)` | Исключение |
| `::before` / `::after` | Создаваемые части до/после содержимого |
| `::marker` | Маркер списка |
| `::placeholder` | Подсказка поля |
| `::selection` | Выделенный текст |

```css
.nav-link:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.item + .item { border-top: 1px solid #e2e8f0; }
.status::before { content: ''; display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #16a34a; margin-right: 8px; }
```

`content` нужен для обычного отображения before/after. Важный смысловой текст
лучше хранить в HTML, а созданные части использовать для оформления.
`nth-child` считает всех детей; `nth-of-type` — элементы конкретного типа.
[Псевдоклассы](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes),
[псевдоэлементы](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements).

## Каскад — как выбирается значение

Каскад сравнивает применимые декларации, а не просто выбирает «самый длинный селектор».
Сначала учитываются происхождение и важность, затем слой; специфичность сравнивают
внутри соответствующей ступени. При равенстве может учитываться близость `@scope`,
а затем порядок объявления.

Для обычных авторских правил одного слоя:

```css
.title { color: #334155; }
.hero .title { color: #6d28d9; }
.title { color: #0f172a; }
```

У `.hero .title` выше специфичность, поэтому для подходящего элемента он победит,
несмотря на последующее более простое правило. Между двумя `.title` выигрывает последнее.
Имя класса в HTML не задаёт порядок применения: `class="a b"` и `class="b a"`
не переставляют правила в файле.

Inline-стиль имеет особое место среди авторских правил; `!important` меняет уровень приоритета.
Пользовательские important-стили и активные CSS-переходы могут иметь ещё более высокий приоритет.
Анимации также занимают отдельное место в каскаде. Для повседневной отладки
сначала найди победившее правило в DevTools, затем меняй причину конфликта.
[W3C: каскад](https://www.w3.org/TR/css-cascade-5/).

## Специфичность и функциональные селекторы

Специфичность удобно читать как тройку `(ID, CLASS, TYPE)`.
Сравнение идёт по столбцам слева направо, а не по десятичному числу.

| Селектор | Специфичность |
| --- | --- |
| `h1` | `(0, 0, 1)` |
| `.title` | `(0, 1, 0)` |
| `.hero .title` | `(0, 2, 0)` |
| `.button:hover` | `(0, 2, 0)` |
| `#home .title` | `(1, 1, 0)` |
| `:where(.hero) h1` | `(0, 0, 1)` |

`*` и комбинаторы не добавляют веса. `:where()` всегда имеет нулевой вес.
`:is()`, `:not()` и `:has()` используют наибольшую специфичность своих аргументов.

```css
:where(h1, h2, h3) { margin: 0; }
.card:has(> img) { padding-top: 0; }
.button:is(:hover, :focus-visible) { background: #4338ca; }
```

`:has()` позволяет условие по связанным элементам, в примере — по непосредственному img.
Селекторы с ID в аргументах могут неожиданно повысить вес всей группы.
[Специфичность](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity),
[:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has).

## Наследование и специальные значения

Текстовые свойства вроде `color` и `font-family` обычно наследуются.
`margin`, `padding` и большинство размеров обычно не наследуются.
Правило, непосредственно заданное ребёнку, может заменить унаследованное значение
без сравнения специфичности с селектором родителя.

| Значение | Что делает |
| --- | --- |
| `inherit` | Берёт вычисленное значение родителя |
| `initial` | Возвращает начальное значение свойства из определения CSS |
| `unset` | Наследует наследуемое свойство, иначе использует initial |
| `revert` | Откатывает вклад текущего происхождения в каскаде |
| `revert-layer` | Откатывает вклад текущего слоя |

```css
body { color: #0f172a; font-family: system-ui, sans-serif; }
button, input, textarea, select { font: inherit; }
.icon { color: inherit; }
```

`initial` не означает «то, что браузер обычно назначает этому HTML-тегу».
Начальное CSS-значение `display` и пользовательский стиль конкретного тега — разные вещи.
Не применяй `all: unset` к интерактивному элементу без восстановления нужного отображения и состояний.
[Наследование](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Inheritance).

## Слои каскада

```css
@layer reset, base, components, utilities;

@layer base {
  a { color: #6d28d9; }
}
@layer components {
  .button { color: white; background: #6d28d9; }
}
@layer utilities {
  .text-muted { color: #64748b; }
}
```

Для обычных деклараций более поздний слой выше более раннего.
Обычные авторские правила вне слоя выше обычных правил в именованных слоях.
Для important-деклараций приоритет слоёв разворачивается: важные правила раннего слоя
выше позднего, а important внутри слоя выше important вне слоёв.
Inline-стили сохраняют особые правила приоритета.
Слои позволяют управлять группами оформления без наращивания специфичности.
[MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer).

## Box model и box-sizing

Блок включает содержимое, padding и border. Margin лежит снаружи рамки.

```css
.box {
  width: 300px;
  padding: 24px;
  border: 2px solid #6d28d9;
  margin: 16px;
}
```

При `content-box` внешняя ширина рамки: `300 + 24×2 + 2×2 = 352px`.
При `border-box` она равна 300 px, а ширина содержимого — 248 px.
Внешние margin не включаются в width в обоих случаях.

```css
*, *::before, *::after { box-sizing: border-box; }
```

Для width 100% padding без border-box может вызвать переполнение.
DevTools показывает каждую область box model и фактические размеры.
[Box model](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction),
[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing).

## Отступы и схлопывание margin

`padding` создаёт внутреннюю область, `margin` отделяет блок от соседей,
`gap` задаёт интервалы в Flexbox/Grid.

```css
.section { padding-block: 64px; }
.stack { display: flex; flex-direction: column; gap: 24px; }
.card { padding: 24px; }
```

Шортхенд `margin: 8px 16px 24px 32px` идёт по часовой стрелке: верх, право, низ, лево.
Два значения: вертикаль и горизонталь. Три: верх, горизонталь, низ.

Вертикальные margin в обычном блочном потоке могут схлопываться.
Два положительных 24 и 16 px в таком случае дают 24, а не 40 px.
Смешанные отрицательные значения меняют расчёт; отрицательный margin не создаёт padding.
У flex/grid-элементов margin между собой не схлопываются.
Для предсказуемых групп удобно использовать gap, для отдельного содержимого — padding.
[Схлопывание margin](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing).

## Единицы измерения

| Единица | От чего зависит | Где удобна |
| --- | --- | --- |
| `px` | CSS-пиксель, не обязательно физический пиксель | Рамки, точные макетные размеры |
| `rem` | Размер шрифта корневого элемента | Шкала текста и отступов |
| `em` | Для font-size — родительский размер; для большинства других длин — текущий шрифт | Размеры внутри компонента |
| `%` | База зависит от свойства и контекста | Относительные размеры |
| `ch` | Метрика символа 0 | Ограничение длины строки |
| `vw` / `vh` | 1% соответствующего размера viewport по правилам единицы | Размеры окна |
| `svh` | Малый размер viewport | Стабильная высота с видимой панелью браузера |
| `lvh` | Большой размер viewport | Высота при убранных панелях |
| `dvh` | Динамическая доступная высота | Высота, реагирующая на изменение панелей |
| `fr` | Доля свободного места в Grid | Сетки |
| `deg` / `ms` / `s` | Угол / время | Повороты и анимации |

`rem` обычно соответствует 16 px при стандартной настройке, но это не обязательная константа.
Проценты у width, height, transform и padding вычисляются по разным правилам.
`height: 100%` не означает автоматически полную высоту окна.
`min-height: 100dvh` оставляет возможность странице вырасти вместе с содержимым.
[Значения и единицы](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units).

## Размеры, ограничения и intrinsic sizing

```css
.container { width: 100%; max-width: 1200px; margin-inline: auto; }
.page { min-height: 100dvh; }
.dialog-panel { width: min(100%, 40rem); }
.label { width: fit-content; }
```

`width` — желаемая ширина; `min-width` и `max-width` ограничивают её.
Минимальное ограничение может оказаться важнее максимального.
`min-content` выражает минимальную ширину при допустимых переносах,
`max-content` — ширину без таких переносов; `fit-content` учитывает доступное пространство.
Фиксированная height может не вместить переведённый текст или увеличенный шрифт.

На viewport 1440 px контейнер 1200 px по центру оставляет по 120 px.
На телефоне добавь поля внешней обёртке:

```css
.section { padding-inline: 16px; }
.section > .container { width: 100%; max-width: 1200px; margin-inline: auto; }
```

Требуется border-box из базового слоя.
[width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width),
[min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width).

## Математика и логические свойства

```css
.title { font-size: clamp(2rem, 1rem + 4vw, 4.5rem); }
.panel { width: min(100%, 60rem); }
.content { min-height: max(20rem, 50dvh); }
.sidebar { width: calc(100% - 32px); }
```

`clamp()` задаёт нижний предел, желаемое значение и верхний предел.
`min()` выбирает меньшее, `max()` — большее.
Пробелы вокруг `+` и `-` в математических выражениях важны для корректного разбора.
Выражение должно соответствовать типу значения свойства.

Логические свойства следуют направлению письма:

```css
.container { margin-inline: auto; padding-inline: 24px; }
.section { padding-block: 64px; }
.accent { border-inline-start: 4px solid #6d28d9; }
```

Для обычного горизонтального русского текста inline соответствует горизонтали,
block — вертикали. Для другого направления/режима письма соответствие меняется.
[clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp),
[логические свойства](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).

## CSS-переменные и тема

```css
:root {
  --color-text: #0f172a;
  --color-surface: #fff;
  --color-brand: #6d28d9;
  --radius-card: 16px;
  --space-section: clamp(3rem, 6vw, 6rem);
}
body { color: var(--color-text); background: var(--color-surface); }
.card { padding: 24px; border-radius: var(--radius-card); }
.button { background: var(--color-brand, #6d28d9); }
```

Custom properties участвуют в каскаде и обычно наследуются.
Имена чувствительны к регистру. `var(--name, fallback)` помогает при отсутствующем
или недопустимом custom property, но не исправляет любое неверное значение конечного свойства.
Например, существующая строка `--space: red` не превращается в корректный padding через fallback.

```css
.theme-dark {
  --color-text: #f8fafc;
  --color-surface: #0f172a;
}
```

Класс темы на предке меняет значения потомков. Для динамического значения в React
можно задать обычный style или typed CSS-переменную; сами компоненты не должны
размножать десятки одинаковых HEX-значений.
[Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties).

## Цвета, фоны и изображения фона

```css
.hero {
  color: #0f172a;
  background: linear-gradient(135deg, #ede9fe, #f8fafc);
}
.overlay { background-color: rgb(15 23 42 / 70%); }
.cover { background-image: url('/images/cover.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; }
```

Форматы цветов включают имена, HEX, rgb(), hsl() и современные пространства вроде oklch().
Альфа у background-color влияет на фон; opacity влияет на весь элемент и его содержимое.
`currentColor` берёт значение color и удобен для рамок и SVG-иконок.
Фон не имеет HTML-alt: содержательное изображение лучше оформлять через img.
Несколько background-слоёв разделяются запятыми; первый рисуется сверху.

```css
.badge { border: 1px solid currentColor; }
.glass { background: rgb(255 255 255 / 85%); backdrop-filter: blur(12px); }
```

Шортхенд background сбрасывает неуказанные его компоненты;
это важно, если ранее задавался background-image.
[Backgrounds](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders),
[цвета](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors).

## Типографика и шрифты

```css
body { font-family: system-ui, sans-serif; line-height: 1.5; }
.title { font-size: clamp(2rem, 1rem + 4vw, 4.5rem); line-height: 1.1; font-weight: 700; letter-spacing: -0.025em; }
.prose { max-width: 65ch; }
.prose p + p { margin-top: 1em; }
a { text-underline-offset: 0.2em; }
```

Безразмерный line-height наследуется как множитель и удобно реагирует на разные размеры текста.
`font-weight` зависит от доступных начертаний шрифта; браузер может синтезировать отсутствующее.
`letter-spacing` у длинного основного текста меняют осторожно.
`white-space`, `overflow-wrap`, `word-break` отвечают за разные аспекты переноса.

```css
@font-face {
  font-family: 'Portfolio';
  src: url('/fonts/portfolio.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Нужен собственный файл шрифта и право его использовать.
`swap` позволяет сначала показать fallback; изменение метрик может сдвинуть макет.
Добавляй только нужные начертания и проверяй кириллицу.
[CSS fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts),
[line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height).

## Нормальный поток и display

Без специального макета блочные элементы обычно идут друг за другом,
а строчное содержимое заполняет строки. Свойство display задаёт участие элемента
в раскладке и внутренний способ размещения потомков.

| Значение | Практическое поведение |
| --- | --- |
| `block` | Блочная внешняя раскладка |
| `inline` | Участие в строке; у обычных строчных элементов вроде span width/height не задают размеры как у блока |
| `inline-block` | Блок внутри строки, которому можно задать размеры |
| `flex` / `inline-flex` | Flexbox внутри блока/строчной области |
| `grid` / `inline-grid` | Grid внутри блока/строчной области |
| `none` | Элемент не создаёт отображаемый бокс и не занимает место |
| `flow-root` | Создаёт отдельный блочный контекст форматирования |
| `contents` | Убирает собственный бокс; требует проверки доступности и оформления |

```css
.button { display: inline-flex; align-items: center; gap: 8px; }
.image { display: block; }
.legacy-content { display: flow-root; }
```

`display: block` у a не превращает его в другой HTML-тег.
Float сегодня полезен для обтекания текста, а основные макеты удобнее делать Flexbox/Grid.
`float: left` можно применять к иллюстрации в статье; `flow-root` помогает контейнеру
учесть плавающие элементы без старых clearfix-псевдоэлементов.
[display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display),
[нормальный поток](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_and_inline_layout_in_normal_flow).

## Flexbox — контейнер и оси

Flexbox удобен для строки навигации, группы кнопок или вертикальной группы.
Основная ось задаётся flex-direction, поперечная перпендикулярна ей.

```css
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.nav-list { display: flex; flex-wrap: wrap; gap: 24px; }
```

| Свойство | Что контролирует |
| --- | --- |
| `flex-direction` | Направление основной оси: row, column и обратные варианты |
| `justify-content` | Распределение свободного места по основной оси |
| `align-items` | Выравнивание детей по поперечной оси |
| `flex-wrap` | Разрешение дополнительных строк/колонок |
| `align-content` | Распределение нескольких линий при наличии свободного места |
| `gap` | Интервалы между элементами/линиями |

При row `justify-content` действует по горизонтали обычного письма;
при column — по вертикали. `align-content` не решает выравнивание одной строки.
Прямые дети контейнера становятся flex-элементами; вложенные внуки автоматически ими не становятся.
[Основы Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts).

## Flexbox — размеры элементов

```css
.toolbar { display: flex; align-items: center; gap: 16px; }
.toolbar__main { flex: 1 1 0; min-width: 0; }
.toolbar__action { flex: 0 0 auto; }
```

`flex-grow` распределяет положительное свободное место,
`flex-shrink` участвует в сжатии с учётом базового размера,
`flex-basis` задаёт базу расчёта основной оси.
`flex: 1 1 0` не отменяет автоматическую минимальную ширину: часто нужен `min-width: 0`.
Шортхенд `flex: 1` в браузерах обычно раскрывается с базой `0%`, что в некоторых
контекстах отличается от абсолютного 0.

```css
.file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.actions { margin-inline-start: auto; }
```

Автоматический margin может забрать свободное место по оси.
`order` и reverse меняют визуальное расположение, но не обязаны менять порядок фокуса/чтения.
Сохраняй понятный порядок DOM.
[flex](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex),
[min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width).

## Grid — строки и колонки

Grid удобен для карточек, двумерной структуры страницы и согласованных колонок.

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
.project-card--wide { grid-column: span 2; }
```

| Запись | Значение |
| --- | --- |
| `repeat(3, 1fr)` | Три одинаковых гибких трека с их автоматическими минимумами |
| `repeat(3, minmax(0, 1fr))` | Три трека, которым разрешено сжиматься до 0 |
| `240px 1fr` | Фиксированная боковая колонка и гибкая основная |
| `minmax(16rem, 1fr)` | Минимум 16rem, затем гибкий рост |
| `grid-column: 1 / 3` | Размещение между линиями 1 и 3 |
| `grid-row: span 2` | Занять два ряда |
| `place-items: center` | Выравнивание детей в ячейках по обеим осям |

Явные треки задаются template-свойствами; дополнительные могут появляться неявно.
`grid-auto-rows` определяет их размер. Длинный контент может расширять трек с автоматическим минимумом.
[Основы Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts).

## Автоматические сетки и области

Адаптивная сетка без отдельных breakpoint для каждой колонки:

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 24px;
}
```

`auto-fit` схлопывает пустые повторяемые треки, позволяя занятым растягиваться.
`auto-fill` сохраняет места для потенциальных треков.
`min(100%, 16rem)` позволяет минимальной колонке поместиться в узком контейнере.

```css
.layout {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  grid-template-areas: 'sidebar content';
  gap: 24px;
}
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
```

Именованная область должна образовывать прямоугольник.
Для общей сетки потомков можно использовать `subgrid`:

```css
.parent-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.aligned-card { display: grid; grid-column: span 2; grid-template-columns: subgrid; }
```

Этот пример требует подходящей структуры: aligned-card — прямой ребёнок parent-grid.
Проверь поддержку и при необходимости оставь базовую собственную сетку.
[grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns).

## Центрирование

| Задача | Решение |
| --- | --- |
| Блок ограниченной ширины | `max-width` и `margin-inline: auto` |
| Текст внутри блока | `text-align: center` |
| Элемент по двум осям | Grid с `place-items: center` |
| Строка детей | Flexbox с подходящими align-items/justify-content |

```css
.center-area { display: grid; min-height: 300px; place-items: center; }
.center-panel { width: min(100%, 40rem); margin-inline: auto; }
```

Для вертикального центрирования нужно свободное место по вертикали.
`align-items: center` у контейнера высотой ровно по содержимому может ничего не изменить.
`vertical-align` полезен для inline/табличных контекстов, но не центрирует любой div.
[Выравнивание](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment).

## Позиционирование

| position | Влияние |
| --- | --- |
| `static` | Обычный поток; inset-смещения не работают как у positioned-элемента |
| `relative` | Сохраняет место, допускает визуальный сдвиг и опору для потомков |
| `absolute` | Убирает элемент из потока, размещает относительно containing block |
| `fixed` | Обычно привязан к viewport; некоторые свойства предков меняют это |
| `sticky` | Сохраняет участие в потоке и удерживается у заданного края при прокрутке |

```css
.card { position: relative; }
.badge { position: absolute; inset-block-start: 16px; inset-inline-end: 16px; }
.site-header { position: sticky; top: 0; z-index: 20; }
```

Containing block для absolute часто создаёт ближайший positioned-предок,
но существуют и другие создающие его свойства. Transform у предка может
изменить опору fixed-элемента. `inset: 0` задаёт все четыре края.
Relative-сдвиг не освобождает исходное место.

Для sticky проверь заданный край, высоту контейнера и overflow предков.
Если контейнер заканчивается, sticky не продолжает удерживаться за его пределами.
[position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).

## Контексты наложения и z-index

Z-index сравнивается внутри контекста наложения.
Потомок с огромным числом не может произвольно обойти соседний контекст своего предка.
Контексты могут создавать позиционирование с z-index, transform, opacity меньше 1,
isolation и другие свойства.

```css
.site-header { position: sticky; top: 0; z-index: 20; }
.decorated-section { isolation: isolate; position: relative; }
.decorated-section::before { content: ''; position: absolute; inset: 0; z-index: -1; background: #ede9fe; }
```

Если модальное окно скрывается под шапкой, изучи контексты предков,
место размещения в DOM и нативный top layer для dialog/popover.
Увеличение числа на потомке не устраняет структурную причину.
[Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context).

## Переполнение и скрытие

```css
.table-scroll { overflow-x: auto; }
.single-line { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.long-text { overflow-wrap: anywhere; }
.scroll-panel { max-height: 60dvh; overflow: auto; }
```

Обрезка требует ограниченной области. `text-overflow` само по себе не создаёт её.
`overflow: hidden` обрезает и может создать scroll container;
`overflow: clip` обрезает без возможности программной прокрутки этой области.
Переполнение по одной оси может повлиять на вычисленное значение другой.

| Способ | Место в макете | Основное последствие |
| --- | --- | --- |
| `display: none` | Не занимает | Обычно исключается из дерева доступности |
| `visibility: hidden` | Сохраняет | Обычно не доступен фокусу/чтению; потомки могут переопределить visibility |
| `opacity: 0` | Сохраняет | Элемент может оставаться кликабельным, фокусируемым и доступным |
| `pointer-events: none` | Сохраняет | Меняет попадание указателя; не отключает клавиатурный фокус |

Согласуй визуальное состояние с HTML-атрибутами и логикой взаимодействия.
[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow),
[text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow).

## Адаптивность через media queries

Начни с правил для узкого экрана. Более широкие варианты добавляй по мере необходимости.
Ориентируйся на содержимое и промежуточные ширины, а не только на модели устройств.

```css
.header-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.projects-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }

@media (min-width: 48rem) {
  .header-inner { flex-direction: row; justify-content: space-between; }
  .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 64rem) {
  .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Width-запрос проверяет viewport, а не ширину конкретной карточки.
`hover: hover` и `pointer: fine` позволяют учитывать возможности устройства ввода.
Ориентация и разрешение — отдельные признаки; сенсорное устройство может иметь и мышь.
`min-width` означает указанную ширину и больше, `max-width` — указанную и меньше.
Range-синтаксис `(width >= 48rem)` — современная альтернативная запись.
В media queries относительные единицы шрифта опираются на начальный размер шрифта
браузера, а не на произвольный font-size, заданный странице. Значение 48rem обычно
соответствует 768 px при стандартном размере 16 px.
[Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using).

## Container queries

Компонент может реагировать на размер своего контейнера, даже когда viewport не меняется.
Это удобно для одной карточки в основной колонке и в боковой панели.

```css
.card-slot { container-type: inline-size; container-name: project; }
.project-preview { display: grid; gap: 16px; }

@container project (min-width: 32rem) {
  .project-preview { grid-template-columns: 12rem minmax(0, 1fr); }
}
```

Структура: card-slot содержит project-preview. Size query влияет на потомков
подходящего query-контейнера; элемент не становится своим собственным таким контейнером.
Container type включает соответствующее containment, что может влиять на sizing.
`cqw` — 1% ширины query-контейнера; выбор контейнера зависит от свойств и контекста.
Базовые правила вне запроса должны оставаться полезными, если query не применяется.
[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).

## Изображения и соотношение сторон

```css
img { display: block; max-width: 100%; height: auto; }
.project-cover { width: 100%; height: auto; aspect-ratio: 3 / 2; object-fit: cover; border-radius: 16px; }
.avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
```

`aspect-ratio` задаёт предпочтительные пропорции бокса.
Если ширина и высота жёстко заданы одновременно, пропорции не заменяют эти размеры.
`object-fit: cover` заполняет область с обрезкой,
`contain` сохраняет всё изображение, но может оставить пустые поля.
`object-position` выбирает положение содержимого внутри области.
HTML-width/height и CSS-геометрия помогают зарезервировать место до загрузки.
[aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio),
[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit).

## Кнопки, ссылки и поля формы

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 12px 24px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: #6d28d9;
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.button:focus-visible { outline: 2px solid #6d28d9; outline-offset: 3px; }
.button:disabled { opacity: 0.5; cursor: not-allowed; }
@media (hover: hover) {
  .button:not(:disabled):hover { background: #5b21b6; }
}
```

Фокус должен быть заметен, состояние disabled должно совпадать с реальным поведением.
Размер 44 px здесь — удобный ориентир этого примера, а не универсальное определение
соответствия всем стандартам доступности.

```css
.field { display: grid; gap: 8px; }
.field input, .field textarea {
  width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1;
  border-radius: 12px; font: inherit; color: inherit; background: white;
}
.field input:focus-visible, .field textarea:focus-visible { outline: 2px solid #6d28d9; outline-offset: 2px; }
.field [aria-invalid='true'] { border-color: #dc2626; }
.field__error { color: #b91c1c; }
```

`:invalid` может сработать до взаимодействия. Ошибку часто показывают после
определённого действия и управляют `aria-invalid` из логики формы.
CSS не заменяет label, отправку формы или серверную проверку.
[focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible).

## Трансформации и визуальные эффекты

```css
.card { transform: translateY(-4px) scale(1.02); }
.tilted { rotate: -3deg; transform-origin: center; }
.muted-image { filter: grayscale(1); }
.soft-shadow { box-shadow: 0 12px 32px rgb(15 23 42 / 12%); }
```

Трансформация меняет визуальное положение, сохраняя исходное место в потоке.
Порядок функций в transform имеет значение; преобразования не всегда коммутируют.
Отдельные свойства translate, rotate и scale позволяют управлять частями независимо.
Если они используются вместе с transform, действует определённый CSS порядок композиции.

`border-radius: 50%` даёт круг при равных ширине и высоте, иначе эллипс.
Filter применяется к отрисованному содержимому; backdrop-filter — к области позади.
Большие размытия и тени могут требовать дополнительной работы отрисовки.
Не назначай `will-change` всем элементам: оно является подсказкой и может увеличить расход ресурсов.
[transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform),
[will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change).

## Переходы между состояниями

```css
.project-card {
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgb(15 23 42 / 12%); }
}
@media (prefers-reduced-motion: reduce) {
  .project-card { transition: none; }
}
```

Transition возникает, когда вычисляемое значение меняется.
Нужны начальное значение, конечное значение и свойство, допускающее подходящее изменение.
Задай transition на базовом элементе, чтобы возврат также был плавным.

| Часть | Пример |
| --- | --- |
| `transition-property` | `transform` |
| `transition-duration` | `300ms` |
| `transition-timing-function` | `ease-out` |
| `transition-delay` | `100ms` |

В шортхенде первое время — duration, второе — delay.
`ease-in` замедляет начало, `ease-out` — конец, `linear` сохраняет равномерный прогресс.
`cubic-bezier()` и `steps()` позволяют другую временную функцию.
Переход всех свойств через `all` может захватить изменения, которые не предполагалось анимировать.
Переход между обычным размером и `auto` требует отдельной поддержки/техники: не рассчитывай,
что любая пара значений плавно интерполируется во всех браузерах.
[Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using).

## Keyframes и анимации

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-copy { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .hero-copy { animation: reveal 700ms ease-out both; }
}
```

| Свойство | Значение |
| --- | --- |
| `animation-name` | Имя keyframes |
| `animation-duration` | Длительность цикла |
| `animation-delay` | Задержка, в том числе отрицательная |
| `animation-iteration-count` | Число повторов или infinite |
| `animation-direction` | normal, reverse, alternate, alternate-reverse |
| `animation-fill-mode` | none, forwards, backwards, both |
| `animation-play-state` | running или paused |
| `animation-timing-function` | Временная функция |

`forwards` сохраняет состояние конца, `backwards` применяет состояние начала до запуска,
`both` сочетает оба. Анимация обычно начинается при применении подходящего оформления;
обычный повторный рендер React не обязан её перезапускать.
Несколько animation разделяют запятыми.

```css
.stagger-item { --delay: 0ms; }
@media (prefers-reduced-motion: no-preference) {
  .stagger-item { animation: reveal 600ms ease-out both; animation-delay: var(--delay); }
  .stagger-item:nth-child(2) { --delay: 100ms; }
  .stagger-item:nth-child(3) { --delay: 200ms; }
}
```

Важное содержимое имеет читаемое базовое состояние. Движение дополняет его,
а отключение анимации не должно скрывать текст.
[Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using).

## Движение при прокрутке

Появление при добавлении в DOM и появление при входе в область просмотра — разные события.
Для однократного запуска часто используют IntersectionObserver в JavaScript
и меняют `data-visible` или класс. До активации механизма содержимое должно быть видимо.
Нужно также учитывать клавиатурный фокус и настройку уменьшения движения.

Современная дополнительная возможность — CSS timeline по видимости:

```css
.scroll-reveal { opacity: 1; transform: none; }
@keyframes scroll-reveal {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@supports (animation-timeline: view()) and (animation-range: entry 0% cover 30%) {
  @media (prefers-reduced-motion: no-preference) {
    .scroll-reveal {
      animation: scroll-reveal 1s linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }
}
```

Поддержка scroll-driven анимаций различается: это progressive enhancement.
`animation-timeline` нужно объявлять после shorthand animation, который может его сбросить.
В этом примере прогресс определяется прокруткой; это не просто секундная анимация после загрузки.
Проверь большие элементы, быстрый скролл, положение фокуса и обратную прокрутку.
[animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).

## Предпочтения пользователя и тёмная тема

```css
:root { --surface: #fff; --text: #0f172a; --border: #e2e8f0; color-scheme: light; }
body { background: var(--surface); color: var(--text); }
@media (prefers-color-scheme: dark) {
  :root { --surface: #0f172a; --text: #f8fafc; --border: #334155; color-scheme: dark; }
}
```

Меняй фон, текст, рамки и состояния согласованно.
`color-scheme` сообщает браузеру подходящую схему для нативных частей интерфейса,
но не перекрашивает всё авторское оформление автоматически.
Ручной переключатель можно привязать к `[data-theme='dark']`;
сохранение выбора и применение до первого показа страницы относятся к логике приложения.

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
@media (forced-colors: active) {
  .button { border: 1px solid ButtonText; }
}
```

Не обнуляй все анимации во всём документе без проверки: некоторые обработчики
могут зависеть от событий animationend/transitionend. Лучше учитывать настройку при выборе эффектов.
Цвет сам по себе не должен быть единственным обозначением ошибки/успеха.
[prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion),
[prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme).

## Progressive enhancement и supports

Сначала задай рабочее базовое оформление, затем добавляй поддерживаемую возможность.

```css
.panel { background: #fff; }
@supports (backdrop-filter: blur(12px)) {
  .panel { background: rgb(255 255 255 / 90%); backdrop-filter: blur(12px); }
}
```

`@supports` проверяет способность разобрать указанное свойство/значение,
но не гарантирует, что весь компонент поведёт себя идеально.
Для селектора существует форма `@supports selector(:has(*))`.
Запросы можно сочетать через `and`, `or`, `not` с корректной группировкой.
Проверяй целевые браузеры, а не только текущий Chrome.
[MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports).

## Нативная вложенность CSS

```css
.project-card {
  padding: 24px;
  border: 1px solid #e2e8f0;

  & > h3 { margin: 0 0 8px; }
  & a { color: #6d28d9; }
  &:focus-within { border-color: #6d28d9; }
}
```

`&` обозначает родительский селектор в контексте вложенности.
Нативная вложенность не является полным синтаксисом Sass: конкатенация
вроде `&__title` не строит BEM-имя в обычном CSS.
Вес некоторых вложенных правил ведёт себя подобно `:is()`; сложный родительский
список с ID может повысить специфичность. Небольшая глубина обычно проще для отладки.
[CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using).

## Организация классов и CSS Modules

Понятные имена связывают оформление с назначением: `site-header`, `project-card`, `field`.
Один распространённый стиль именования:

```css
.project-card { padding: 24px; }
.project-card__title { font-size: 1.25rem; }
.project-card--featured { border: 2px solid #6d28d9; }
```

`__` отделяет часть компонента, `--` — вариант. Это договорённость об именах,
а не функция CSS. Начни с глобального файла и разделяй его, когда структура становится сложнее.

Vite поддерживает CSS Modules. Создай `Header.module.css`:

```css
.root { padding: 24px; background: #0f172a; color: white; }
.title { font-weight: 700; }
```

И импортируй в компонент:

```tsx
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.root}>
      <a href="/" className={styles.title}>Egor Petrov</a>
    </header>
  );
}
```

Это учебная альтернатива текущему глобальному CSS. Module-классы получают обработанные имена,
снижая риск совпадения. Наследование и обычные глобальные правила при этом продолжают действовать.
Не смешивай несколько способов организации без понятной причины.
[Vite: CSS Modules](https://vite.dev/guide/features.html#css-modules).

## Производительность и работа отрисовки

Изменение геометрии может потребовать layout, изменение визуальных свойств — paint,
а некоторые трансформации/прозрачность могут обрабатываться на compositor-уровне.
Это зависит от браузера, слоёв и содержимого: transform не является гарантией «бесплатной» анимации.

Практический порядок:

1. Сначала исправь макет и убери непреднамеренные сдвиги.
2. Зарезервируй место изображениям и загружаемому содержимому.
3. Используй transform/opacity для небольших визуальных движений.
4. Измеряй рывки через Performance и Rendering в DevTools.
5. Добавляй оптимизации к найденной причине, а не ко всем элементам.

`contain` и `content-visibility` могут ограничивать область работы браузера,
но меняют условия размеров/отрисовки. Для пропуска больших секций нужна оценка
их высоты и проверка поведения поиска, фокуса и прокрутки.
Для небольшой страницы не усложняй CSS такими механизмами без измерений.
[Производительность CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS),
[content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility).

## Стили для печати

```css
@media print {
  body { color: #000; background: #fff; }
  .site-header, .skip-link, .button { display: none; }
  .project-card { box-shadow: none; break-inside: avoid; }
  a { color: inherit; }
}
@page { margin: 15mm; }
```

Печать — отдельный сценарий. Убери лишние интерактивные элементы,
сохрани смысловое содержимое и проверь PDF-предпросмотр.
`break-inside` помогает избегать разделения небольших карточек,
но не делает невозможное: блок больше листа всё равно требует решения.
[Print styles](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing).

## Порядок отладки CSS

1. Найди элемент в Elements и убедись, что класс действительно есть.
2. Найди декларацию в Styles. Отсутствует — проверь файл, импорт и совпадение селектора.
3. Зачёркнута — найди победившее правило, слой и специфичность.
4. Подсвечена как ошибочная — проверь имя свойства, значение и единицы.
5. В Computed посмотри итоговое значение и размеры box model.
6. Проверь контекст: родительский display, размеры, overflow и позиционирование.
7. Временно отключай правила по одному, чтобы найти минимальную причину.

Изменения в DevTools временные. Подтверждённое решение перенеси в исходный файл.
Для проблемы с hover/focus используй принудительное состояние элемента.
Для Flexbox/Grid включи соответствующие overlay-подсказки.

| Симптом | Частая причина |
| --- | --- |
| width 100% вызывает прокрутку | padding/border без border-box, минимальная ширина ребёнка |
| justify-content ничего не меняет | Нет свободного места или неверная ось |
| align-items не центрирует вертикально | При column это другая ось; контейнер не выше содержимого |
| Заголовок растягивает колонку | Автоматический минимум, длинное слово, отсутствующий min-width: 0 |
| z-index не помогает | Контекст наложения предка |
| sticky не работает | Край не задан, контейнер слишком короткий, overflow предка |
| Тень исчезла | Обрезка overflow у предка |
| transition не запускается | Значение не изменилось или не подходит для интерполяции |
| Стиль пропал после background | Shorthand сбросил отдельный компонент |
| Отступ больше ожидаемого | Пользовательские стили браузера, margin, line-height |
| CSS меняется, экран нет | Неверный файл/порт, кеш, ошибка загрузки в Network |

## Стили для сквозного примера

Это полный `styles.css` для страницы из HTML-методички.
Код самодостаточен: шрифты системные, изображения и библиотеки не нужны.
Для проекта переноси нужные части осознанно, учитывая существующие одноимённые классы.

```css
:root {
  color-scheme: light;
  --surface: #fff;
  --surface-soft: #f8fafc;
  --text: #0f172a;
  --muted: #475569;
  --border: #e2e8f0;
  --brand: #6d28d9;
  --brand-hover: #5b21b6;
}

*, *::before, *::after { box-sizing: border-box; }
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  margin: 0;
  background: var(--surface);
  color: var(--text);
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}
h1, h2, h3, p, ul { margin: 0; }
button, input, textarea, select { font: inherit; }
a { color: var(--brand); text-underline-offset: 0.2em; }
a:focus-visible, summary:focus-visible { outline: 2px solid var(--brand); outline-offset: 4px; }
main { flex: 1; }

.container { width: min(1200px, calc(100% - 32px)); margin-inline: auto; }
.section { padding-block: clamp(3rem, 6vw, 6rem); scroll-margin-top: 8rem; }
.section-title { margin-bottom: 24px; font-size: clamp(1.75rem, 1rem + 2vw, 2.5rem); }
.site-header { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--border); background: var(--surface); }
.header-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; padding-block: 16px; }
.brand { color: var(--text); font-size: 1.25rem; font-weight: 700; text-decoration: none; }
.nav-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; padding: 0; list-style: none; }
.nav-list a { color: var(--text); text-decoration: none; }
.hero { background: var(--surface-soft); }
.eyebrow { color: var(--brand); font-weight: 600; }
.hero-title { max-width: 18ch; margin-top: 16px; font-size: clamp(2rem, 1rem + 4vw, 4.5rem); line-height: 1.1; letter-spacing: -0.025em; }
.lead { max-width: 55ch; margin-top: 24px; color: var(--muted); font-size: 1.125rem; }
.button { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; margin-top: 24px; padding: 12px 24px; border: 1px solid transparent; border-radius: 12px; background: var(--brand); color: #fff; font-weight: 600; text-decoration: none; }
.projects-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.project-card { display: flex; flex-direction: column; gap: 16px; padding: 24px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
.project-card h3 { font-size: 1.25rem; }
.project-card p { color: var(--muted); }
.project-card a { margin-top: auto; }
.prose { max-width: min(1200px, calc(100% - 32px)); }
.prose p { max-width: 65ch; }
.prose details { margin-top: 24px; }
summary { cursor: pointer; font-weight: 600; }
details p { margin-top: 16px; }
address { font-style: normal; }
.site-footer { padding-block: 24px; border-top: 1px solid var(--border); color: var(--muted); }
.skip-link { position: fixed; z-index: 100; top: 12px; left: 16px; padding: 12px 16px; border-radius: 8px; background: var(--surface); color: var(--text); transform: translateY(-200%); }
.skip-link:focus { transform: translateY(0); }

@media (min-width: 48rem) {
  .header-inner { flex-direction: row; justify-content: space-between; }
  .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 64rem) {
  .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (hover: hover) {
  .nav-list a:hover { color: var(--brand); }
  .button:hover { background: var(--brand-hover); }
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
  .button { transition: background-color 200ms ease-out; }
  .project-card { transition: transform 300ms ease-out; }
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .project-card:hover { transform: translateY(-4px); }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --surface: #0f172a;
    --surface-soft: #172033;
    --text: #f8fafc;
    --muted: #cbd5e1;
    --border: #334155;
    --brand: #c4b5fd;
    --brand-hover: #ddd6fe;
  }
  .button { color: #0f172a; }
}
```

На 320 px сетка содержит одну колонку, от 768 px — две, от 1024 px — три.
На 1440 px контейнер ограничен 1200 px. Шапка перестраивается в строку от 768 px.
У карточек ссылка прижимается вниз через flex и auto-margin;
содержимое может увеличивать высоту карточки.

## Упражнения и проверка понимания

1. **Box model:** задай width 300px, padding 24px, border 2px и переключи box-sizing.
   Ожидаемые ширины рамки — 352 и 300 px.
2. **Контейнер:** создай max-width 1200px и поля 16px. Проверь окна 320, 768, 1440 px.
3. **Flexbox:** перестрой шапку из column в row через media query.
4. **Grid:** получи одну/две/три колонки; затем попробуй auto-fit без breakpoint.
5. **Переполнение:** вставь длинное имя файла. Исправь его через min-width: 0 и truncate-приём.
6. **Каскад:** создай два конкурирующих правила, предскажи победителя и проверь Computed.
7. **Тема:** вынеси повторяющиеся цвета в переменные и добавь системную тёмную схему.
8. **Фокус:** пройди ссылки и кнопки Tab; верни заметный outline, если убирал браузерный.
9. **Переход:** добавь сдвиг карточки при hover и плавный возврат.
10. **Анимация:** сделай появление заголовка и проверь reduced-motion.
11. **Container query:** покажи одну карточку в широком и узком контейнере на одном viewport.
12. **Печать:** сохрани страницу в PDF; убери навигацию и проверь разрывы карточек.

### Ответы на частые вопросы

- **Почему класс не работает?** Проверь загрузку CSS, селектор, значение, каскад и контекст layout.
- **Почему max-width не центрирует?** Он ограничивает размер; центрирование задаётся отдельно.
- **Почему меню vertical при flex?** Проверь flex-direction, wrap и фактическую доступную ширину.
- **Почему gap не виден?** Проверь display и наличие нескольких прямых детей.
- **Почему opacity 0 не скрыла кнопку от Tab?** Прозрачность не отключает интерактивность.
- **Можно ли вставить CSS прямо в className?** className содержит имена классов; декларации идут в CSS или style.
- **Где менять длительность анимации?** В animation-duration/animation; transition-duration относится к переходу.
- **Как добавить компоненту свой CSS?** Назови класс, укажи его в JSX и создай селектор в stylesheet.

## Справочник свойств по задачам

| Задача | Основные свойства |
| --- | --- |
| Размеры | width, height, min/max-width, min/max-height, aspect-ratio |
| Отступы | padding, margin, gap, логические inline/block-варианты |
| Текст | font-family/size/weight, line-height, letter-spacing, text-align/decoration |
| Перенос | white-space, overflow-wrap, word-break, text-overflow |
| Цвет | color, background-color, opacity |
| Оформление | border, border-radius, box-shadow, outline |
| Flexbox | flex-direction/wrap, justify-content, align-items/content, flex, order |
| Grid | grid-template-columns/rows/areas, grid-column/row, grid-auto-rows/flow |
| Положение | position, inset, top/right/bottom/left, z-index |
| Переполнение | overflow-x/y, overflow, overscroll-behavior |
| Изображения | object-fit, object-position, background-size/position |
| Движение | transform, translate, rotate, scale, transition, animation |
| Состояния | cursor, pointer-events, visibility, display |
| Тема | custom properties, color-scheme |

## Источники и дальнейшее чтение

- [MDN: справочник CSS](https://developer.mozilla.org/en-US/docs/Web/CSS).
- [W3C: каскад CSS](https://www.w3.org/TR/css-cascade-5/).
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts).
- [MDN: Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts).
- [MDN: media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using).
- [MDN: анимации](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using).
- [Методичка HTML](HTML.md).
- [Практические приёмы проекта](HTML-CSS-PATTERNS.md).

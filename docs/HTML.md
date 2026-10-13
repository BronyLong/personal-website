# HTML — подробная методичка

Для изучения с нуля, работы над личным сайтом и возвращения к отдельным темам.
Примеры используют современный HTML. Раздел о JSX объясняет применение в этом React-проекте.
Актуальные определения элементов находятся в [HTML Living Standard](https://html.spec.whatwg.org/multipage/).
Оформление подробно разобрано в отдельной [методичке CSS](CSS.md).

## Как пользоваться методичкой

Читай по этапам: устройство документа → семантика и текст → ссылки и изображения
→ формы → доступность → JSX → итоговый проект. Разделы с таблицами работают как справочник.
Каждый новый пример сначала набери вручную, затем измени один атрибут и посмотри результат.
Для обычного HTML достаточно файла `index.html` и браузера. Для этого проекта запусти `npm run dev`.

В проекте:

| Файл | Что в нём меняют |
| --- | --- |
| `index.html` | Язык, кодировку, название вкладки, метаданные документа |
| `src/App.tsx` | Общую структуру страницы и набор компонентов |
| `src/components/*.tsx` | Разметку отдельных частей, например шапки |
| `src/styles.css` | Внешний вид; он относится к CSS |

Полные HTML-документы ниже предназначены для отдельной учебной страницы.
Внутрь `App.tsx` переносят содержимое страницы, переводя атрибуты в JSX,
а существующие `html`, `head` и `body` оставляют в `index.html`.

## Содержание

- [Как пользоваться методичкой](#как-пользоваться-методичкой)
- [Роль HTML и работа браузера](#роль-html-и-работа-браузера)
- [Синтаксис элементов и атрибутов](#синтаксис-элементов-и-атрибутов)
- [Правила вложенности и восстановление ошибок](#правила-вложенности-и-восстановление-ошибок)
- [Полный каркас документа](#полный-каркас-документа)
- [Метаданные и подключение ресурсов](#метаданные-и-подключение-ресурсов)
- [Глобальные атрибуты](#глобальные-атрибуты)
- [Семантический каркас страницы](#семантический-каркас-страницы)
- [Заголовки и текст](#заголовки-и-текст)
- [Списки, цитаты и код](#списки-цитаты-и-код)
- [Ссылки, пути и якоря](#ссылки-пути-и-якоря)
- [Изображения и подписи](#изображения-и-подписи)
- [Адаптивные изображения](#адаптивные-изображения)
- [Видео, аудио и встроенный контент](#видео-аудио-и-встроенный-контент)
- [Таблицы данных](#таблицы-данных)
- [Формы и отправка данных](#формы-и-отправка-данных)
- [Типы input и основные ограничения](#типы-input-и-основные-ограничения)
- [Подписи, подсказки и группировка формы](#подписи-подсказки-и-группировка-формы)
- [Валидация и состояния формы](#валидация-и-состояния-формы)
- [Нативные интерактивные элементы](#нативные-интерактивные-элементы)
- [SVG, canvas и дополнительные элементы](#svg-canvas-и-дополнительные-элементы)
- [Доступность разметки](#доступность-разметки)
- [Спецсимволы и текстовые данные](#спецсимволы-и-текстовые-данные)
- [HTML в React и TypeScript](#html-в-react-и-typescript)
- [Пример поля со состоянием React](#пример-поля-со-состоянием-react)
- [Сквозной пример страницы](#сквозной-пример-страницы)
- [Диагностика типичных ошибок](#диагностика-типичных-ошибок)
- [Упражнения и критерии результата](#упражнения-и-критерии-результата)
- [Справочные источники](#справочные-источники)

## Роль HTML и работа браузера

HTML описывает структуру и смысл содержимого. CSS задаёт оформление,
JavaScript — поведение, React помогает собирать интерфейс из компонентов.
Один и тот же документ можно оформить по-разному, сохранив смысловую структуру.

При загрузке браузер разбирает текст HTML и создаёт DOM — дерево объектов.
Затем применяет CSS, рассчитывает размеры и положение, рисует результат.
Показанная страница — результат обработки, а не буквальная копия исходного текста.
Elements в DevTools показывает текущее дерево DOM; View Source — исходный ответ сервера.
JavaScript может изменить DOM после загрузки.

```html
<article>
  <h2>Личный сайт</h2>
  <p>Портфолио с интерактивными проектами.</p>
</article>
```

В этом дереве `article` — родитель, `h2` и `p` — дети и соседи.
Внутри них находятся текстовые узлы. Вложенность имеет значение для HTML и CSS-селекторов.

## Синтаксис элементов и атрибутов

```html
<a class="project-link" href="/projects">Мои проекты</a>
```

`a` — имя элемента; первый тег открывает его, второй закрывает.
`class` и `href` — атрибуты. Текст между тегами — содержимое.
Значения атрибутов удобно всегда заключать в кавычки.
Имена стандартных HTML-тегов принято писать строчными буквами.

| Понятие | Пример | Смысл |
| --- | --- | --- |
| Парный элемент | `<p>Текст</p>` | Содержимое находится между тегами |
| Пустой элемент | `<img src="photo.webp" alt="Портрет">` | У него нет закрывающего тега |
| Атрибут со значением | `lang="ru"` | Передаёт настройку |
| Булев атрибут | `required` | Сам факт наличия включает настройку |
| Комментарий | `<!-- Навигация -->` | Не отображается как текст страницы |

Пустые элементы HTML: `area`, `base`, `br`, `col`, `embed`, `hr`, `img`,
`input`, `link`, `meta`, `source`, `track`, `wbr`.
Запись `<img />` допустима в HTML, но слеш не делает произвольный элемент самозакрывающимся.
Например, для `div` нужно написать `</div>`. В JSX все пустые элементы закрывают через `/>`.

Булев атрибут `disabled="false"` всё равно отключает элемент.
Чтобы включить его, в HTML убирают атрибут, в JSX передают `disabled={false}`.
Комментарии видны в исходном коде: они не подходят для хранения секретов.

[Синтаксис HTML](https://html.spec.whatwg.org/multipage/syntax.html),
[булевы атрибуты](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes).

## Правила вложенности и восстановление ошибок

Допустимое содержимое определяется конкретным элементом.
Различие «блочный/строчный» описывает обычное CSS-отображение, но не заменяет правила HTML.
Изменение `display` не меняет допустимую вложенность.

- В `p` помещают текстовое, фразовое содержимое; `section` и другой `p` туда не вкладывают.
- Нельзя вкладывать `button` в `button` и ссылку `a` в другую ссылку.
- Кликабельная карточка-ссылка не должна содержать независимую кнопку.
- В списке обычные пункты помещают в `li`, а в таблице используют предусмотренные строки и ячейки.
- `id` должен быть уникальным в пределах документа.

Неверная идея: `<p>Описание<div>Блок</div></p>`.
HTML-парсер может автоматически закрыть `p` раньше, чем ожидает автор.
Правильное разделение:

```html
<div class="description">
  <p>Описание</p>
  <div>Отдельный блок</div>
</div>
```

Браузер старается показать даже ошибочную страницу. Поэтому «видно на экране»
не означает «разметка корректна». Проверяй дерево DOM и сообщения React о вложенности.
[Модели содержимого](https://html.spec.whatwg.org/multipage/dom.html#content-models).

## Полный каркас документа

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Егор Петров — портфолио</title>
    <meta name="description" content="Проекты, опыт и контакты разработчика Егора Петрова.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>Шапка</header>
    <main>
      <h1>Портфолио</h1>
      <p>Привет! Я создаю интерфейсы.</p>
    </main>
    <footer>Контакты и дополнительная информация</footer>
  </body>
</html>
```

| Часть | Назначение |
| --- | --- |
| `<!doctype html>` | Выбирает стандартный режим отображения |
| `html lang="ru"` | Указывает основной язык, в том числе для произношения скринридером |
| `head` | Метаданные, подключение ресурсов |
| `charset` | Кодировка; указывай её в начале `head` |
| `viewport` | Делает ширину мобильного окна соответствующей устройству |
| `title` | Название вкладки и документа |
| `body` | Видимое и интерактивное содержимое |

Существующий `body` этого React-проекта уже содержит `#root`.
Компонент приложения помещает интерфейс внутрь него: создавать ещё один `body` не нужно.
[MDN: head](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head).

## Метаданные и подключение ресурсов

Для каждой самостоятельной страницы выбирай описательный `title` и описание.
`meta description` может использоваться в результатах поиска, но поисковик может выбрать другой текст.
Метаданные для превью ссылки зависят от сервисов, например Open Graph:

```html
<meta property="og:title" content="Егор Петров — портфолио">
<meta property="og:description" content="Интерфейсы, проекты и контакты.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/">
<meta property="og:image" content="https://example.com/social-cover.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

Замени учебный домен и добавь настоящие изображения. Абсолютные URL удобны для внешних превью.
Глобальный атрибут `title` у элемента — подсказка, а тег `<title>` — название документа.
Подсказка `title` не заменяет видимую подпись или доступное имя.

Подключение обычного CSS: `<link rel="stylesheet" href="styles.css">`.
В проекте CSS импортируется из `src/main.tsx`; отдельно подключать тот же файл ещё раз не требуется.

```html
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>
```

`defer` у внешнего классического скрипта позволяет выполнить его после разбора документа,
сохраняя порядок таких скриптов. `async` выполняет скрипт, когда он готов; порядок не гарантируется.
Модули по умолчанию ждут завершения разбора документа. Эти примеры — альтернативы:
их не нужно копировать одновременно для одного приложения.
[MDN: script](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script),
[Open Graph](https://ogp.me/).

## Глобальные атрибуты

| Атрибут | Пример | Применение |
| --- | --- | --- |
| `id` | `id="projects"` | Якорь, связь элементов, поиск конкретного узла |
| `class` | `class="card card--featured"` | Несколько CSS-классов через пробел |
| `lang` | `lang="en"` | Язык отдельного фрагмента |
| `dir` | `dir="rtl"` | Направление текста |
| `data-*` | `data-state="open"` | Собственное состояние для CSS/JavaScript |
| `hidden` | `hidden` | Элемент обычно не отображается; поведение зависит также от CSS |
| `tabindex` | `tabindex="-1"` | Возможность программно переводить фокус |
| `style` | `style="--accent: #6d28d9"` | Локальные значения, например CSS-переменные |
| `inert` | `inert` | Делает поддерево неинтерактивным и исключает его из дерева доступности |
| `contenteditable` | `contenteditable="true"` | Позволяет редактировать содержимое; это не готовая форма |

`tabindex="0"` включает элемент в обычный порядок Tab; `-1` исключает из него,
но допускает программный фокус. Положительные значения создают отдельный порядок
и обычно усложняют навигацию. Нативная кнопка уже умеет получать фокус.
`aria-hidden="true"` само по себе не отключает фокусируемые потомки.

```html
<section id="projects" class="section" data-state="ready">
  <h2>Проекты</h2>
  <p lang="en">Available for collaboration.</p>
</section>
```

[Глобальные атрибуты](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes),
[inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert).

## Семантический каркас страницы

| Элемент | Когда выбирать |
| --- | --- |
| `header` | Вводная часть страницы или раздела |
| `nav` | Существенная группа навигационных ссылок |
| `main` | Основное содержимое документа |
| `section` | Тематический раздел, обычно с заголовком |
| `article` | Самостоятельная публикация или карточка, имеющая смысл отдельно |
| `aside` | Связанное, но дополнительное содержимое |
| `footer` | Завершающая информация страницы или раздела |
| `address` | Контактная информация автора/организации, связанной с документом или статьёй |
| `div` | Универсальная группировка без дополнительной семантики |
| `span` | Универсальная текстовая группировка |

У страницы обычно один видимый основной `main`.
Шапка `article` тоже может быть `header`, но не становится от этого глобальной шапкой сайта.
`aside` не обязан отображаться справа: положение задаёт CSS.
Обёртку, нужную только для ограничения ширины, удобно делать `div`.

```html
<main>
  <section aria-labelledby="projects-title">
    <h2 id="projects-title">Проекты</h2>
    <article>
      <h3>Каталог работ</h3>
      <p>Поиск и фильтрация портфолио.</p>
    </article>
  </section>
</main>
```

[Справочник элементов](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements).

## Заголовки и текст

Уровень заголовка выбирай по структуре, размер — через CSS.
Для страницы с портфолио: `h1` — название страницы, `h2` — раздел,
`h3` — проект внутри раздела. Последовательная иерархия помогает навигации.

| Элемент | Смысл |
| --- | --- |
| `p` | Абзац |
| `strong` | Важность, серьёзность или срочность |
| `em` | Смысловое ударение |
| `b` / `i` | Особые текстовые случаи без значения strong/em |
| `small` | Примечание, мелкий сопроводительный текст |
| `mark` | Фрагмент, выделенный по контексту, например совпадение поиска |
| `br` | Содержательный перенос строки, например в стихотворении |
| `hr` | Тематическое разделение |
| `sub` / `sup` | Нижний/верхний индекс |
| `abbr` | Аббревиатура |
| `time` | Дата или время с машинным представлением |

```html
<h1>Портфолио</h1>
<p>Я создаю <strong>доступные интерфейсы</strong> и <em>особенно</em> люблю анимации.</p>
<p>Опубликовано <time datetime="2026-10-13">13 октября 2026 года</time>.</p>
```

Для внешних отступов используй CSS, а не несколько `br` или пустых абзацев.
Обычный HTML сворачивает последовательности пробелов; форматирование исходника
не гарантирует такие же интервалы на экране.
[Заголовки](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements).

## Списки, цитаты и код

`ul` — перечисление без значимого порядка, `ol` — последовательность,
`dl` — пары термин/описание. Вложенный список размещают внутри соответствующего `li`.

```html
<ol start="1">
  <li>Собрать разметку</li>
  <li>Добавить оформление
    <ul>
      <li>Сетка</li>
      <li>Типографика</li>
    </ul>
  </li>
  <li>Проверить адаптивность</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>Структура документа.</dd>
  <dt>CSS</dt>
  <dd>Оформление документа.</dd>
</dl>
```

`ol reversed` задаёт обратную нумерацию, `li value="5"` меняет номер конкретного пункта.
Маркеры и их положение оформляются `list-style-type` и `list-style-position` в CSS.

```html
<blockquote>
  <p>Простота требует внимательного выбора деталей.</p>
</blockquote>
<p><cite>Название произведения или источника</cite></p>
<pre><code>&lt;h1&gt;Привет!&lt;/h1&gt;</code></pre>
<p>Нажми <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
```

`pre` сохраняет пробелы и переносы, `code` отмечает код, `kbd` — ввод пользователя,
`samp` — пример вывода программы. `cite` обозначает название произведения, а не произвольное имя автора.
[ol](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol),
[dl](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl),
[pre](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre).

## Ссылки, пути и якоря

| Запись | Куда ведёт |
| --- | --- |
| `https://example.com/work` | Абсолютный внешний URL |
| `/projects` | Путь от корня текущего сайта |
| `projects.html` | Путь относительно текущего документа/базового URL |
| `../index.html` | На уровень выше |
| `#contacts` | К элементу с таким id в текущем документе |
| `mailto:hello@example.com` | В почтовый обработчик |
| `tel:+79991234567` | В обработчик телефонных ссылок |

```html
<a href="#contacts">Связаться со мной</a>
<a href="https://example.com" target="_blank" rel="noopener">
  Сайт проекта — новая вкладка
</a>
<a href="/files/resume.pdf" download>Скачать резюме PDF</a>
<section id="contacts"><h2>Контакты</h2></section>
```

`target="_blank"` обычно открывает новый контекст; полезно обозначить это пользователю.
В современных браузерах `_blank` у ссылки обычно уже подразумевает `noopener`;
явная запись показывает намерение. `noreferrer` дополнительно меняет передачу referrer.
`download` — подсказка для загрузки, а фактическое поведение зависит от URL и ответа сервера.
Фраза «Скачать резюме PDF» понятнее набора одинаковых «Подробнее» без контекста.

В Vite файл `public/files/resume.pdf` доступен как `/files/resume.pdf`.
Файлы в `src` обычно импортируют средствами сборки.
[MDN: a](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a).

## Изображения и подписи

```html
<figure>
  <img src="/images/project.webp" width="1200" height="800"
       alt="Экран каталога с фильтрами по категориям"
       loading="lazy" decoding="async">
  <figcaption>Каталог проектов, версия для компьютера.</figcaption>
</figure>
```

`src` — ресурс; `alt` — текстовая альтернатива; `width` и `height`
помогают заранее определить пропорции. CSS может изменить отображаемый размер.
Для декоративного изображения используй `alt=""`.
Для изображения-ссылки альтернативный текст должен объяснять назначение ссылки.
Фотографию описывают по её роли в контексте, а не перечисляют каждый видимый предмет.

`loading="lazy"` подходит для содержимого ниже первого экрана.
Главное изображение первого экрана обычно загружают сразу.
`fetchpriority="high"` может повысить приоритет важного изображения; не назначай его всем ресурсам.
Имена файлов и реальные размеры в примерах нужно заменить своими.
[MDN: img](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img).

## Адаптивные изображения

`srcset` предлагает браузеру несколько файлов, `sizes` описывает предполагаемую
отображаемую ширину. Браузер выбирает ресурс с учётом окна, плотности пикселей и своих условий.

```html
<img
  src="/images/project-800.webp"
  srcset="/images/project-400.webp 400w,
          /images/project-800.webp 800w,
          /images/project-1200.webp 1200w"
  sizes="(min-width: 64rem) 560px, (min-width: 48rem) 50vw, 100vw"
  width="1200" height="800"
  alt="Интерфейс проекта">
```

Значения `400w`, `800w`, `1200w` должны соответствовать реальным ширинам файлов.
`sizes` согласуют с CSS-макетом; сам атрибут не задаёт ширину элемента.
Для вариантов по плотности используют `1x`, `2x`, не смешивая их с `w` в одном наборе.

`picture` позволяет выбирать формат или другую композицию для разных экранов:

```html
<picture>
  <source media="(max-width: 40rem)" srcset="/images/portrait-mobile.webp">
  <source type="image/avif" srcset="/images/portrait.avif">
  <img src="/images/portrait.jpg" width="1200" height="800" alt="Портрет автора">
</picture>
```

Браузер рассматривает подходящие `source` по порядку; `img` остаётся обязательным
базовым элементом с альтернативным текстом. Нужны все указанные учебные файлы.
[Адаптивные изображения](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images).

## Видео, аудио и встроенный контент

```html
<video controls preload="metadata" poster="/images/demo-cover.webp" width="1280" height="720">
  <source src="/media/demo.webm" type="video/webm">
  <source src="/media/demo.mp4" type="video/mp4">
  <track kind="captions" src="/media/demo-ru.vtt" srclang="ru" label="Русский" default>
  <p><a href="/media/demo.mp4">Скачать видео</a></p>
</video>
```

`controls` добавляет управление; `poster` — обложку; `preload` даёт подсказку загрузки.
Субтитры требуют реального файла WebVTT. Для важной информации предусмотрен текстовый вариант.
Автовоспроизведение со звуком часто ограничивается браузером; оно также может мешать пользователю.
Видео-фон обычно делают `muted playsinline`, но решение должно учитывать возможность остановки.

```html
<audio controls src="/media/interview.mp3">
  <a href="/media/interview.mp3">Скачать интервью</a>
</audio>
<iframe src="https://example.com/embed" title="Демонстрация проекта" loading="lazy"></iframe>
```

У `iframe` нужно осмысленное `title`. Для стороннего контента отдельно выбирают
разрешения `allow`, ограничения `sandbox` и `referrerpolicy` под требования интеграции.
Произвольный `sandbox` без нужных разрешений может отключить функцию виджета.
[video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video),
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe).

## Таблицы данных

Таблица подходит для данных, сравниваемых по строкам и колонкам.
Для размещения блоков страницы используют CSS-макет.

```html
<table>
  <caption>Планы разработки</caption>
  <thead>
    <tr><th scope="col">Этап</th><th scope="col">Срок</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Разметка</th><td>2 дня</td></tr>
    <tr><th scope="row">Оформление</th><td>3 дня</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Всего</th><td>5 дней</td></tr>
  </tfoot>
</table>
```

`caption` называет таблицу; `th` — заголовочную ячейку; `td` — ячейку данных.
`scope="col"` и `scope="row"` показывают связь заголовков с данными.
`colspan` и `rowspan` объединяют ячейки; сложные объединения требуют особенно ясной структуры.
Для широкой таблицы можно добавить обёртку с горизонтальной прокруткой в CSS.
[MDN: table](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table).

## Формы и отправка данных

Форма объединяет поля для отправки. `action` задаёт обработчик,
`method` — способ запроса. В демонстрационных примерах обработчик нужно реализовать отдельно.

```html
<form action="/api/contact" method="post">
  <label for="contact-email">Email</label>
  <input id="contact-email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Отправить</button>
</form>
```

`id` связывает поле с подписью; `name` задаёт имя отправляемого значения.
Поле без `name` обычно не входит в набор отправляемых данных.
По умолчанию у формы используется GET, а у обычной кнопки внутри формы — отправка,
поэтому назначение `method` и `type` удобно писать явно.

| Настройка | Применение |
| --- | --- |
| `method="get"` | Поиск и фильтры; значения попадают в URL |
| `method="post"` | Передача данных в теле запроса; сам по себе POST не обеспечивает шифрование |
| `enctype="multipart/form-data"` | Передача файлов через обычную POST-форму |
| `autocomplete` | Подсказки для автозаполнения |
| `novalidate` | Отключение стандартной проверки при отправке |

Для реальной отправки необходим сервер или сервис обработки и HTTPS.
`fetch()`/React могут перехватить отправку через `preventDefault()`;
это уже поведение на JavaScript, а не функция CSS.
[form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form),
[отправка форм](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data).

## Типы input и основные ограничения

| Тип | Назначение |
| --- | --- |
| `text` | Обычная строка |
| `email` | Email и подходящая клавиатура |
| `password` | Маскированное отображение |
| `search` | Поисковый запрос |
| `tel` | Телефон; универсальный формат автоматически не проверяется |
| `url` | URL |
| `number` | Числовое значение, которому нужны числовые операции |
| `date` / `time` | Дата / время |
| `datetime-local` | Локальная дата и время без часового пояса |
| `checkbox` | Независимый выбор |
| `radio` | Один вариант из группы |
| `file` | Выбор файла |
| `range` | Число в диапазоне через ползунок |
| `color` | Выбор цвета |
| `hidden` | Скрытое отправляемое значение; его можно изменить на клиенте |
| `submit` / `reset` / `button` | Управление формой; обычно удобнее `<button>` |

```html
<label for="quantity">Количество</label>
<input id="quantity" name="quantity" type="number" min="1" max="10" step="1" value="1">
<label for="username">Имя</label>
<input id="username" name="username" type="text" minlength="2" maxlength="40" required>
```

Для номера телефона, индекса или номера карты обычно подходит строка:
ведущие нули и формат являются частью данных. `inputmode="numeric"`
может подсказать цифровую клавиатуру строковому полю.
`required`, `min`, `max`, `step`, `minlength`, `maxlength`, `pattern`
применяются только к подходящим типам. `accept` ограничивает интерфейс выбора файла,
но не является проверкой содержимого на сервере.
[MDN: input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input).

## Подписи, подсказки и группировка формы

Подпись должна быть видимой и связанной с полем. `placeholder` может показывать пример,
но исчезает после ввода. Подсказка связывается через `aria-describedby`.

```html
<label for="phone">Телефон</label>
<input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phone-help">
<p id="phone-help">Укажите код страны и номер.</p>

<fieldset>
  <legend>Предпочтительный способ связи</legend>
  <label><input type="radio" name="contact-method" value="email" checked> Email</label>
  <label><input type="radio" name="contact-method" value="phone"> Телефон</label>
</fieldset>
```

Radio с одинаковым `name` образуют группу; `value` определяет отправляемый вариант.
У checkbox/radio без явного `value` при выборе обычно отправляется `on`.
Невыбранный checkbox обычно не отправляет пару имя/значение.
`fieldset` группирует связанные поля, `legend` называет группу.

```html
<label for="topic">Тема</label>
<select id="topic" name="topic" required>
  <option value="">Выберите тему</option>
  <option value="project">Новый проект</option>
  <option value="question">Вопрос</option>
</select>
<label for="message">Сообщение</label>
<textarea id="message" name="message" rows="5" required></textarea>
```

Значение `textarea` в обычном HTML задаётся текстом между тегами.
В JSX для начального значения используется `defaultValue`.
[label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label),
[fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset),
[textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea).

## Валидация и состояния формы

HTML-проверка помогает найти ошибки ввода до отправки.
Она не заменяет проверку сервером: клиентский код и атрибуты можно изменить.
Сначала определи момент проверки: ввод, потеря фокуса или попытка отправить форму.
Не объявляй все пустые поля ошибочными сразу после открытия страницы.

```html
<label for="error-email">Email</label>
<input id="error-email" name="email" type="email" value="неправильный адрес"
       aria-invalid="true" aria-describedby="email-error">
<p id="email-error">Введите email в формате name@example.com.</p>
```

Это снимок состояния после проверки. В приложении атрибут и сообщение управляются логикой.
После исправления ошибки убирают соответствующее состояние и связь с сообщением.
`aria-invalid` описывает результат проверки, а не запускает её.

| Состояние | Поведение |
| --- | --- |
| `disabled` | Обычно не получает фокус и не отправляется |
| `readonly` | У поддерживающих его полей запрещает редактирование; значение обычно отправляется |
| `aria-disabled="true"` | Описывает недоступность; действие и фокус автоматически не отключает |
| `required` | Значение обязательно в рамках стандартной проверки |

Во время отправки показывай текстовый статус. Для обновлений по результату действия
может подойти отдельный `role="status"`; срочное сообщение требует другого подхода.
[Проверка на клиенте](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation),
[aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid).

## Нативные интерактивные элементы

Раскрываемый текст может работать без собственной JavaScript-логики:

```html
<details>
  <summary>Какие технологии использую?</summary>
  <p>HTML, CSS, React и TypeScript.</p>
</details>
```

`open` открывает details изначально. `summary` — переключатель; не помещай туда
независимые элементы действий без проверки взаимодействия и доступности.

Диалог получает нативное модальное поведение через `showModal()`:

```html
<button type="button" id="open-contact">Открыть контакты</button>
<dialog id="contact-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Контакты</h2>
  <p>hello@example.com</p>
  <form method="dialog">
    <button type="submit">Закрыть</button>
  </form>
</dialog>
```

```js
const opener = document.querySelector('#open-contact');
const dialog = document.querySelector('#contact-dialog');
opener?.addEventListener('click', () => dialog.showModal());
```

Скрипт предназначен для обычной учебной страницы и запускается после создания DOM.
В React диалогом управляют через ref и обработчик события.
`open` просто показывает dialog; это не то же самое, что `showModal()`.
Проверь начальный фокус, Escape и возврат фокуса после закрытия.
[details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details),
[dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).

## SVG, canvas и дополнительные элементы

SVG описывает векторную графику. Встроенное SVG можно оформить CSS.
Если графика имеет самостоятельный смысл, дай ей доступное имя:

```html
<svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="check-title">
  <title id="check-title">Успешно</title>
  <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" stroke-width="2"></path>
</svg>
```

У повторяющихся иконок должны быть разные id. Декоративной иконке рядом
с видимым текстом можно задать `aria-hidden="true"`.
Canvas — область рисования через JavaScript; нарисованный текст автоматически не становится HTML-содержимым.

| Элемент | Случай применения |
| --- | --- |
| `progress` | Ход выполнения задачи |
| `meter` | Известная измеряемая величина в диапазоне |
| `output` | Результат вычисления |
| `template` | Фрагмент для последующего создания узлов через JavaScript |
| `slot` | Точка размещения содержимого в Web Components |
| `wbr` | Возможное место переноса длинной строки |
| `bdi` | Изоляция направления неизвестного текста |

```html
<label for="upload-progress">Загрузка</label>
<progress id="upload-progress" max="100" value="60">60%</progress>
```

`progress` без `value` обозначает неопределённый прогресс.
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG),
[progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress).

## Доступность разметки

У каждого интерактивного элемента должно быть понятное доступное имя.
Для кнопки это обычно видимый текст; для поля — связанный label.
ARIA дополняет нативную семантику, когда встроенных возможностей недостаточно.

```html
<a href="#main-content" class="skip-link">Перейти к содержимому</a>
<main id="main-content" tabindex="-1">
  <h1>Портфолио</h1>
</main>
```

Skip-link обычно скрывают визуально до фокуса средствами CSS.
Проверь страницу клавишами Tab, Shift+Tab, Enter, Space и Escape там, где он нужен.
Визуальный порядок контента должен быть согласован с порядком DOM и фокуса.

| Задача | Подход |
| --- | --- |
| Кнопка с одним значком | Видимый/визуально скрытый текст или `aria-label` |
| Несколько nav | Различимые названия через `aria-label`/`aria-labelledby` |
| Раскрытие панели | `aria-expanded` и связь `aria-controls`, согласованные с состоянием |
| Новый результат операции | Подходящий статус, не внезапная перестановка фокуса |
| Скрытый закрытый блок | Согласовать отображение, дерево доступности и фокус |

`role="button"` на div не добавляет все клавиатурные возможности кнопки.
`aria-hidden` не подходит для элемента, который остаётся фокусируемым.
Текстовая альтернатива, подпись формы и явный фокус решают разные задачи.
[HTML и доступность](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML),
[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

## Спецсимволы и текстовые данные

| Запись | Результат |
| --- | --- |
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&amp;` | `&` |
| `&quot;` | Двойная кавычка |
| `&nbsp;` | Неразрывный пробел |
| `&copy;` | © |

```html
<p>Элемент &lt;header&gt; обозначает шапку.</p>
<p>HTML &amp; CSS</p>
```

Пользовательские данные должны вставляться как текст или через подходящую обработку,
а не произвольно превращаться в HTML. В React обычный `{text}` экранируется.
`dangerouslySetInnerHTML` требует отдельной обработки доверия и очистки содержимого.
Неразрывный пробел используй для смысловой связи, а не для построения макета.
[Символьные ссылки](https://html.spec.whatwg.org/multipage/named-characters.html).

## HTML в React и TypeScript

JSX — синтаксис описания элементов в JavaScript/TypeScript.
Он похож на HTML, но имеет собственные правила. Компоненты называют с заглавной буквы.

| HTML | JSX |
| --- | --- |
| `class="card"` | `className="card"` |
| `for="email"` | `htmlFor="email"` |
| `tabindex="0"` | `tabIndex={0}` |
| `autocomplete="email"` | `autoComplete="email"` |
| `srcset="..."` | `srcSet="..."` |
| `stroke-width="2"` | `strokeWidth={2}` |
| `aria-label`, `data-state` | Остаются через дефис |
| Пустой `<input>` | `<input />` |
| Начальное значение input | `defaultValue`, или `value` вместе с обработчиком |

```tsx
export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <a href="/">Egor Petrov</a>
        <nav aria-label="Основная навигация">
          <a href="#projects">Проекты</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </div>
    </header>
  );
}
```

`export default` позволяет импортировать `Header` без фигурных скобок.
В JSX возвращают один корневой элемент или фрагмент `<>...</>`.
Комментарий внутри JSX пишут как `{/* комментарий */}`.
`key` у элементов списка помогает React сопоставлять их между обновлениями.
[Правила JSX](https://react.dev/learn/writing-markup-with-jsx).

## Пример поля со состоянием React

```tsx
import { useId, useState } from 'react';

export default function EmailField() {
  const id = useId();
  const [email, setEmail] = useState('');

  return (
    <div className="field">
      <label htmlFor={id}>Email</label>
      <input
        id={id}
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <p>Введено: {email || 'пока ничего'}</p>
    </div>
  );
}
```

Состояние — источник значения управляемого поля. Обработчик записывает введённый текст.
`useId` помогает связать label и input без конфликтов между экземплярами компонента.
Этот пример демонстрирует ввод; он не выполняет отправку и проверку на сервере.
[React: input](https://react.dev/reference/react-dom/components/input),
[useId](https://react.dev/reference/react/useId).

## Сквозной пример страницы

Сохрани как отдельный учебный `index.html`. Полный подходящий CSS находится
в разделе «Стили для сквозного примера» методички CSS.
Картинки здесь заменены текстовым содержимым, поэтому дополнительных файлов не нужно.

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Егор Петров — портфолио</title>
    <meta name="description" content="Личный сайт разработчика: проекты и контакты.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <a class="skip-link" href="#main-content">Перейти к содержимому</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#home">Egor Petrov</a>
        <nav aria-label="Основная навигация">
          <ul class="nav-list">
            <li><a href="#projects">Проекты</a></li>
            <li><a href="#about">Обо мне</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main id="main-content" tabindex="-1">
      <section id="home" class="section hero" aria-labelledby="hero-title">
        <div class="container">
          <p class="eyebrow">Разработка интерфейсов</p>
          <h1 id="hero-title" class="hero-title">Создаю понятные цифровые продукты</h1>
          <p class="lead">HTML, CSS, React и внимание к деталям.</p>
          <a class="button" href="#projects">Посмотреть проекты</a>
        </div>
      </section>
      <section id="projects" class="section" aria-labelledby="projects-title">
        <div class="container">
          <h2 id="projects-title" class="section-title">Проекты</h2>
          <div class="projects-grid">
            <article class="project-card">
              <h3>Личный сайт</h3>
              <p>Адаптивное портфолио с доступной навигацией.</p>
              <a href="#contacts">Обсудить похожую задачу</a>
            </article>
            <article class="project-card">
              <h3>Каталог</h3>
              <p>Понятная структура и удобный поиск.</p>
              <a href="#contacts">Узнать подробности</a>
            </article>
            <article class="project-card">
              <h3>Интерактивная страница</h3>
              <p>Плавные переходы и небольшие анимации.</p>
              <a href="#contacts">Связаться со мной</a>
            </article>
          </div>
        </div>
      </section>
      <section id="about" class="section" aria-labelledby="about-title">
        <div class="container prose">
          <h2 id="about-title" class="section-title">Обо мне</h2>
          <p>Я разрабатываю интерфейсы и изучаю современные возможности веба.</p>
          <details>
            <summary>Как работаю над проектом?</summary>
            <p>Сначала структура и содержание, затем оформление и взаимодействие.</p>
          </details>
        </div>
      </section>
      <section id="contacts" class="section" aria-labelledby="contacts-title">
        <div class="container">
          <h2 id="contacts-title" class="section-title">Контакты</h2>
          <address><a href="mailto:hello@example.com">hello@example.com</a></address>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="container"><p>© 2026 Егор Петров</p></div>
    </footer>
  </body>
</html>
```

В реальном сайте замени имя, почту и тексты. У проекта пока нет отдельных страниц:
ссылки в карточках честно ведут к контактам. Когда появятся страницы работ, измени `href`.

## Диагностика типичных ошибок

| Симптом | Что проверить |
| --- | --- |
| Вместо картинки пустое место | Путь, ответ Network, регистр имени, существование файла |
| Якорь не работает | Совпадение `href="#..."` и уникального `id` |
| Нажатие кнопки перезагружает страницу | Не отправляет ли она форму; нужен ли `type="button"` |
| Поле не связано с подписью | Совпадение `for`/`htmlFor` и `id` |
| Значение отсутствует в запросе формы | `name`, disabled, выбранность checkbox/radio |
| DOM отличается от написанного | Недопустимая вложенность и исправления парсера |
| JSX не компилируется | Закрытие тегов, один корень, кавычки, фигурные скобки |
| Список React ведёт себя странно | Устойчивые уникальные `key` |
| Скринридер читает непонятную кнопку | Доступное имя, скрытие, нативный тег |
| На телефоне всё уменьшено | Наличие корректного viewport |

Используй Elements, Console, Network и дерево доступности в DevTools.
Для обычных документов полезен [Nu HTML Checker](https://validator.w3.org/nu/).
Он проверяет HTML, а не исходный TSX: JSX сначала превращается в элементы/документ.
Проверка разметки и проверка доступности — отдельные задачи.

## Упражнения и критерии результата

1. **Каркас:** создай title, viewport, header, main, footer. В DOM один body и один основной main.
2. **Структура:** разбей текст на h1/h2/h3 и абзацы. Уровни соответствуют смыслу.
3. **Навигация:** добавь три якоря. Каждый ведёт к существующему уникальному id.
4. **Проекты:** создай три article. Название каждой карточки имеет правильный уровень заголовка.
5. **Изображение:** добавь width, height и alt. Реши, является ли картинка содержательной.
6. **Форма:** добавь email и сообщение. Поля имеют label, id и name; кнопки имеют type.
7. **Ошибка:** покажи состояние ошибочного email, затем убери его после исправления.
8. **Таблица:** сделай сравнение трёх проектов с caption и заголовками строк/колонок.
9. **Доступность:** пройди всё клавиатурой. У каждой остановки понятное имя и видимый фокус.
10. **React:** вынеси шапку в компонент и создай два независимых экземпляра EmailField.

### Ответы на контрольные вопросы

- **Зачем id и name одновременно?** id связывает узлы, name задаёт ключ отправляемых данных.
- **Почему div внутри p ломает структуру?** Модель содержимого p этого не допускает; парсер исправляет дерево.
- **Ссылка или кнопка?** Переход к ресурсу — ссылка; действие — кнопка.
- **Можно ли оформить h2 как маленький текст?** Да: уровень — смысл, CSS — размер.
- **Почему placeholder не заменяет label?** Он является примером/подсказкой и исчезает при вводе.
- **Что делает aria-invalid?** Передаёт состояние ошибки; проверку выполняет другая логика.
- **Нужно ли добавлять второй body в App?** Нет, он уже есть в index.html.

## Справочные источники

- [HTML Living Standard](https://html.spec.whatwg.org/multipage/).
- [MDN: справочник HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).
- [MDN: элементы](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements).
- [MDN: формы](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms).
- [React: JSX](https://react.dev/learn/writing-markup-with-jsx).
- [Методичка CSS](CSS.md).
- [Практические приёмы этого проекта](HTML-CSS-PATTERNS.md).

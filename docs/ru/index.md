---
layout: home

hero:
  name: confluence.js
  text: Типобезопасный клиент Confluence Cloud API
  tagline: Обе версии REST API в одном пакете, валидация через Zod, tree-shaking, только ESM.
  image:
    src: /logo.svg
    alt: confluence.js
  actions:
    - theme: brand
      text: Начать
      link: /ru/guide/getting-started
    - theme: alt
      text: Справочник API
      link: /ru/api/
    - theme: alt
      text: GitHub
      link: https://github.com/MrRefactoring/confluence.js

features:
  - icon: 🔀
    title: v1 и v2, один клиент
    details: 'v2 — для всего, что развивает Atlassian; v1 — для того, что v2 пока не покрывает. Оба принимают один и тот же host: путь к API принадлежит запросу, а не конфигу.'
  - icon: 🔒
    title: Типы от начала до конца
    details: Каждый эндпоинт, параметр и ответ типизированы. Код генерируется из OpenAPI-спек Atlassian, поэтому типы следуют за API.
  - icon: ✅
    title: Валидация в рантайме
    details: Ответы проверяются схемами Zod 4. Когда Atlassian расходится с собственной спекой, вы узнаёте об этом на границе, а не тремя функциями позже.
  - icon: 🌳
    title: Tree-shaking
    details: Импортируйте клиент целиком или только те вызовы, которые делаете. Точки входа confluence.js/v1, /v2 и /core.
  - icon: 📦
    title: Одна зависимость
    details: Zod, и больше ничего. Нативный fetch, только ESM, Node.js 22+. Ни axios, ни form-data, ни полифилов.
  - icon: 🧪
    title: Проверено на живом API
    details: 493 интеграционных теста против настоящего сайта Confluence Cloud — каждый неймспейс обеих версий.
---

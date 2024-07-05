# Email Inspect

Email Inspect это система, используемая для аудита электронных писем для рассылки.

## Development

Install dependencies and then start in the development mode.

```bash
npm install
npm run dev
```

Navigate to the port that was displayed on the terminal. The app should be running after the development build is finished.

## Build

To generate production version:

```bash
npm run build
```

You can run the newly built app locally with `npm run preview`.

## Features

Этот проект находится на ранней стадии, поэтому функции еще не завершены.

На данный момент он будет отображать в таблице фиктивные данные электронной почты из `fake-data.ts` для имитации ответа API.

В будущем будет реализована нумерации страниц, возможность устанавливать количество элементов, отображаемых на странице, а также синхронизация с сервером и работа с google-таблицами.

Поскольку проверка даты и времени имеет решающее значение в процессе аудита, строки таблицы имеют чередующиеся цвета фона в зависимости от даты, чтобы было легче различать электронные письма, отправленные в разные даты.

Поскольку еще не реализована мобильная версия дизайна, поэтому нельзя гарантировать, что информация будет правильно отображаться на экранах разных размеров.

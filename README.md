# Daybook

A birthday and day-milestone calculator that runs entirely in the browser. See how many days you have lived, when your 10,000th day falls, and which days between birthdays are worth celebrating.

**Live demo:** https://wici-kt.github.io/daybook/

English | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

![Daybook showing days lived, the next day milestone and birthday details](assets/daybook.webp)

## What it does

Enter a birthday and a date to calculate against. Daybook shows the days lived, your age in years, months and days, the weekday you were born, your next birthday, leap days along the way, and one dot for every day of your current year of life. The table below lists day milestones with their calendar dates, your age on each date, and how far away each one is.

Add any day number from 1 to 1,000,000, switch between two counting conventions, filter the table, download every milestone as CSV, and save the next milestone as an all-day calendar event.

## Features

- Download a share image with your days lived, next milestone and countdown in any of the four languages.
- Calendar days lived, age in years/months/days, full weeks and full months, plus hour, minute and second equivalents.
- 29 preset milestones including 100, 1,000 and 10,000 days, plus custom milestones up to 1,000,000.
- Two counting conventions: birth as day 0 (default) or birth as day 1.
- CSV export of all milestones and an `.ics` file for the next one.
- English, Traditional Chinese, Japanese and Korean interface; the choice is remembered on the device.
- Responsive layout, keyboard controls, screen reader labels, reduced-motion and print styles.

## Quick start

No installation, build step or account is needed.

- Open the live site: https://wici-kt.github.io/daybook/
- Or open `index.html` from this folder in a browser.
- Or serve the folder locally: `python3 -m http.server 8080`, then open `http://localhost:8080`.

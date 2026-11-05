# Daybook

A birthday and day-milestone calculator built for GitHub Pages. No build, packages, API keys, or backend required.

## Publish on GitHub Pages

1. Sign in to GitHub and create a new **public** repository named `daybook`.
2. Choose **Add file → Upload files**. Upload `index.html`, `style.css`, `calc.js`, and `app.js` from this folder directly into the repository root. Include `.nojekyll` if your file picker shows hidden files. Commit to `main`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main**, folder **/(root)**, and click **Save**.
6. Wait for deployment. The Pages settings will show your website address, normally `https://YOUR-USERNAME.github.io/daybook/`.

For `https://YOUR-USERNAME.github.io/` without a project path, name the repository `YOUR-USERNAME.github.io` instead.

Upload the files themselves, not the ZIP file or a nested `daybook` folder. All asset paths are relative, so both repository URLs and root URLs work.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Preview

Open `index.html` in a browser. Or from this folder run `python3 -m http.server 8080`, then open `http://localhost:8080`.

## Included

- Calendar days lived and age in years, months, and days.
- Full weeks, full months, and labeled hour/minute/second equivalents.
- Birth weekday, next birthday, leap days, and a dot for each day of the birthday year.
- 29 preset milestones including 100, 1,000, and 10,000 days.
- Custom milestones from 1 to 1,000,000; results through year 9999.
- Inclusive or elapsed counting, status filters, CSV downloads, and an all-day calendar event for the next milestone.
- Optional local birthday storage and a clear-data control.
- Responsive layout, keyboard controls, screen reader labels, reduced-motion support, and print styles.

## Calculation rules

Dates use the proleptic Gregorian calendar. The calculation date must be on or after birth; inputs support years 0001–9998. The days-lived total always measures elapsed calendar days. “Birth = day 1” affects milestone dates only.

Date arithmetic uses UTC day indices to avoid daylight saving errors; today's date is taken from the device's local calendar. Time equivalents are date-based, not a live clock or a measurement from an exact birth time. February 29 anniversaries fall on February 28 in non-leap years. Full months are counted from the original birth date with month-end clamping. Leap days include both endpoints.

The initial birthday is an explicitly labeled example, January 1, 2000. No personal date is stored until the visitor submits their birthday and opts in. “Calculate up to” is not stored. A page left open follows the new local day only if its date was previously today.

## Development

Run the calculation checks with `node tests.cjs`. There are no dependencies.

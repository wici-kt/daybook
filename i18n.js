/*
 * Daybook interface strings.
 *
 * Four locales, no build step and no external requests. Every visible string
 * lives here; app.js only ever reads through t()/unit()/milestoneLabel().
 * Run `node tests-i18n.cjs` after editing: it enforces key parity between
 * locales and checks that placeholders and locale rules stay consistent.
 */
(function (root) {
  'use strict';

  const LANGS = ['en', 'zh-TW', 'ja', 'ko'];
  const LOCALES = { en: 'en-US', 'zh-TW': 'zh-Hant-TW', ja: 'ja-JP', ko: 'ko-KR' };
  const HTML_LANG = { en: 'en', 'zh-TW': 'zh-Hant-TW', ja: 'ja', ko: 'ko' };
  const NATIVE_NAMES = { en: 'English', 'zh-TW': '繁體中文', ja: '日本語', ko: '한국어' };
  const STORAGE_KEY = 'daybook-lang';

  const en = {
    'meta.title': 'Daybook · Every day counts',
    'meta.description': 'Find your age in days, discover your 100th and 1,000th day, and celebrate the milestones between birthdays. A private, free birthday calculator.',
    skip: 'Skip to calculator',
    'nav.label': 'Main navigation',
    'nav.milestones': 'Milestones',
    'nav.about': 'How it works',
    'privacy.badge': 'Your dates stay with you',
    'lang.label': 'Language',

    'intro.eyebrow': 'A little perspective on your time',
    'intro.title': 'There’s more to life<br>than <em>birthdays.</em>',
    'intro.lead': 'You’ve lived thousands of ordinary, extraordinary days.<br>Find your number. Discover the next one worth celebrating.',

    'calc.aria': 'Birthday calculator',
    'field.birth': 'When were you born?',
    'field.asof': 'Calculate up to',
    'btn.today': 'Today',
    'btn.find': 'Find my days',
    'opt.remember': 'Remember my birthday on this device',
    'btn.clear': 'Clear my dates',
    example: 'Example birthday shown. Make it yours.',

    'overview.aria': 'Your days',
    'overview.overline': 'Your life, in days',
    asof: 'As of {date}',
    'days.caption': 'days of being <em>you.</em>',
    'stat.weeks': 'full weeks',
    'stat.months': 'full months',
    'stat.hours': 'hours equivalent*',

    'next.overline': 'Your next day milestone',
    'next.count': 'days to go',
    'next.progressAria': 'Progress to next milestone',
    'btn.calendar': 'Save to calendar',

    'details.aria': 'Birthday details',
    'detail.started': 'It all started on a',
    'detail.nextBirthday': 'Your next birthday',
    'detail.leap': 'Leap days along the way',
    'detail.leapNote': 'February 29s, including your birth date',
    'detail.minutes': 'Minutes equivalent*',

    'year.eyebrow': 'One day at a time',
    'year.title': 'Your current year of life.',
    'legend.done': 'Days completed',
    'legend.todo': 'Still to come',

    'milestones.eyebrow': 'Reasons to celebrate',
    'milestones.title': 'The days that add up.',
    'btn.csv': 'Download all as CSV',
    'filter.aria': 'Filter milestones',
    'filter.all': 'All milestones',
    'filter.upcoming': 'Upcoming',
    'filter.passed': 'Reached',
    'counting.label': 'Count from',
    'counting.elapsed': 'Birth = day 0',
    'counting.inclusive': 'Birth = day 1',
    'counting.note.elapsed': 'Birth is day 0. Your 100-day milestone is exactly 100 calendar days after birth.',
    'counting.note.inclusive': 'Birth is day 1. Your 100th day is 99 days after birth. The days-lived total above still shows elapsed days.',
    'table.caption': 'Day milestones and their dates',
    'table.milestone': 'Milestone',
    'table.date': 'Calendar date',
    'table.age': 'Age on that day',
    'table.delta': 'From selected date',
    empty: 'No milestones in this view. Try adding your own below.',
    'custom.tag': 'custom',

    'custom.label': 'A day of your own',
    'custom.help': 'Lucky number? A goal? Find its date.',
    'custom.inputAria': 'Custom day number',
    'custom.placeholder': 'e.g. 12,345',
    'btn.add': 'Add milestone',

    'about.title': 'A few things about the numbers.',
    'faq.counting.q': 'How are days and milestones counted?',
    'faq.counting.a': 'Days lived is the number of calendar days between your birthday and the selected date. On your birthday, it is 0. In the default mode, the 100-day milestone is your birthday plus 100 days. Choose “Birth = day 1” to find your literal 100th day instead, which is your birthday plus 99 days. The days-lived total always shows elapsed days.',
    'faq.leap.q': 'What about leap years, time zones, and exact birth times?',
    'faq.leap.a': 'Leap years are included. “Today” uses your device’s local date. Calendar arithmetic is independent of daylight saving changes. This calculator does not ask for a birth time, so hours, minutes, and seconds are equivalents of calendar days, not exact elapsed time. A February 29 birthday uses February 28 as its anniversary in non-leap years. Month calculations clamp to the last valid day of a month.',
    'faq.privacy.q': 'Does this website save my birthday?',
    'faq.privacy.a': 'Calculations happen on your device. There are no analytics, external fonts, or accounts. Your birthday is saved in this browser only if you select “Remember my birthday.” Use “Clear my dates” to remove it. Calendar and CSV downloads contain your milestone dates, so share them thoughtfully.',
    'faq.range.q': 'Can I look at a date in the past or future?',
    'faq.range.a': 'Yes. Change “Calculate up to” to explore any date on or after your birthday, through year 9998. The next birthday, countdowns, and milestone statuses all use that date. Future birth dates are allowed for planning. This is a calendar tool, not a prediction of lifespan.',
    'about.footnote': '* Time equivalents use 24 hours per calendar day, 60 minutes per hour, and 60 seconds per minute.',

    'footer.tagline': 'Every ordinary day is part of your story.',
    'footer.back': 'Back to your days',
    noscript: 'Please enable JavaScript to use the birthday calculator. All calculations run locally in your browser.',

    'age.that': 'That’s {age}.',
    'seconds.equivalent': '{n} seconds equivalent*',
    'birthday.today': 'Today!',
    'birthday.away.one': '{n} day away',
    'birthday.away.other': '{n} days away',
    'birthday.detail': '{date} · Turning {age}',
    'year.description': '{done} days completed since your last birthday. {left} days until your next chapter.',
    'year.caption': 'Each dot is a day. {pct}% of this birthday year completed.',
    'next.fallbackTitle': 'A very long story',
    'next.fallbackDate': 'No more milestones in the supported range.',
    'next.fallbackDetail': 'Try an earlier calculation date.',
    'next.progress': '{pct}% of the way from your birthday',
    'status.now': 'On selected date',
    'status.ago.one': '{n} day ago',
    'status.ago.other': '{n} days ago',
    'status.in.one': 'In {n} day',
    'status.in.other': 'In {n} days',

    'milestone.elapsed.one': '{n} day',
    'milestone.elapsed.other': '{n} days',
    'milestone.inclusive': '{ord} day',
    'unit.year.one': '{n} year',
    'unit.year.other': '{n} years',
    'unit.month.one': '{n} month',
    'unit.month.other': '{n} months',
    'unit.day.one': '{n} day',
    'unit.day.other': '{n} days',
    'list.sep': ', ',
    'date.weekday': '{weekday}, {date}',

    'announce.calculated': 'Calculated {n} days lived.',
    'announce.added': 'Added milestone {n}.',
    'announce.cleared': 'Your saved birthday has been removed.',
    'announce.storage': 'Browser storage is unavailable. Your dates still work for this visit.',
    'announce.csv': 'Milestone CSV downloaded.',
    'announce.ics': 'Calendar event downloaded. Open the file in your calendar app.',

    'err.incomplete': 'Enter a complete date.',
    'err.yearRange': 'Use a year from 0001 to 9999.',
    'err.invalidDate': 'Enter a valid calendar date.',
    'err.milestoneRange': 'Choose a whole number from 1 to 1,000,000.',
    'err.milestoneYear': 'This milestone falls after year 9999.',
    'err.throughYear': 'Choose dates through year 9998.',
    'err.beforeBirth': 'The calculation date must be on or after your birthday.',

    'csv.milestone': 'Milestone',
    'csv.convention': 'Counting convention',
    'csv.date': 'Date',
    'csv.age': 'Age',
    'csv.from': 'Days from calculation date',
    'csv.calcDate': 'Calculation date',
    'ics.summary': 'My {label} milestone',
    'ics.description': 'Birthday milestone. Birth is day {n}.'
  };

  const zhTW = {
    'meta.title': 'Daybook · 每一天都算數',
    'meta.description': '算出你活了幾天，發現第 100 天、第 1000 天等重要日子。免費、私密的生日計算器，所有計算都在你的裝置上完成。',
    skip: '跳到計算器',
    'nav.label': '主要導覽',
    'nav.milestones': '里程碑',
    'nav.about': '計算方式',
    'privacy.badge': '日期只留在你的裝置',
    'lang.label': '語言',

    'intro.eyebrow': '換個角度看你的時間',
    'intro.title': '人生裡，<br>不只有<em>生日</em>。',
    'intro.lead': '你已經度過成千上萬個平凡又特別的日子。<br>找出你的數字，發現下一個值得慶祝的日子。',

    'calc.aria': '生日計算器',
    'field.birth': '你的生日是哪一天？',
    'field.asof': '計算到哪一天',
    'btn.today': '今天',
    'btn.find': '看看我活了幾天',
    'opt.remember': '在這部裝置記住我的生日',
    'btn.clear': '清除我的日期',
    example: '目前顯示的是範例生日，換成你的吧。',

    'overview.aria': '你的日子',
    'overview.overline': '你的人生，以天計算',
    asof: '截至 {date}',
    'days.caption': '當<em>自己</em>的日子。',
    'stat.weeks': '整週',
    'stat.months': '整月',
    'stat.hours': '小時（換算）*',

    'next.overline': '下一個日子里程碑',
    'next.count': '天後',
    'next.progressAria': '距離下一個里程碑的進度',
    'btn.calendar': '加入行事曆',

    'details.aria': '生日詳細資料',
    'detail.started': '一切從這天開始',
    'detail.nextBirthday': '下一個生日',
    'detail.leap': '途中經過的閏日',
    'detail.leapNote': '2 月 29 日，包含出生當天',
    'detail.minutes': '分鐘（換算）*',

    'year.eyebrow': '一天一天來',
    'year.title': '你目前這一歲。',
    'legend.done': '已完成的日子',
    'legend.todo': '還在前方',

    'milestones.eyebrow': '值得慶祝的理由',
    'milestones.title': '累積起來的日子。',
    'btn.csv': '全部下載為 CSV',
    'filter.aria': '篩選里程碑',
    'filter.all': '所有里程碑',
    'filter.upcoming': '即將到來',
    'filter.passed': '已達成',
    'counting.label': '計算方式',
    'counting.elapsed': '出生當天 = 第 0 天',
    'counting.inclusive': '出生當天 = 第 1 天',
    'counting.note.elapsed': '出生當天是第 0 天。100 天里程碑正好是出生後 100 個日曆日。',
    'counting.note.inclusive': '出生當天是第 1 天。你的第 100 天是出生後 99 天。上方「活了幾天」仍然顯示已過的天數。',
    'table.caption': '日子里程碑與日期',
    'table.milestone': '里程碑',
    'table.date': '日期',
    'table.age': '當天年齡',
    'table.delta': '距計算日期',
    empty: '這個檢視沒有里程碑，可以在下面加入自己的。',
    'custom.tag': '自訂',

    'custom.label': '屬於你的一天',
    'custom.help': '幸運數字？某個目標？找出它的日期。',
    'custom.inputAria': '自訂天數',
    'custom.placeholder': '例如 12,345',
    'btn.add': '加入里程碑',

    'about.title': '關於這些數字，有幾件事。',
    'faq.counting.q': '天數和里程碑是怎麼算的？',
    'faq.counting.a': '「活了幾天」是你生日到所選日期之間的日曆天數，生日當天是 0。預設計算方式下，100 天里程碑是生日加 100 天。選「出生當天 = 第 1 天」則會找到字面上的第 100 天，也就是生日加 99 天。上方顯示的總天數一律是已過的天數。',
    'faq.leap.q': '閏年、時區和出生時刻怎麼處理？',
    'faq.leap.a': '閏年會計入。「今天」使用你裝置的當地日期。日曆計算不受日光節約時間影響。這個計算器不問出生時刻，所以小時、分鐘、秒都是日曆天數的換算，不是實際經過的時間。2 月 29 日出生的人，在非閏年的生日是 2 月 28 日。月份計算遇到不存在的日期時，會使用該月最後一天。',
    'faq.privacy.q': '這個網站會儲存我的生日嗎？',
    'faq.privacy.a': '所有計算都在你的裝置上完成。沒有分析工具、外部字型或帳號。只有你勾選「在這部裝置記住我的生日」時，生日才會存在這個瀏覽器。按「清除我的日期」可以移除。行事曆和 CSV 下載會包含你的里程碑日期，分享前請留意。',
    'faq.range.q': '可以看過去或未來的日期嗎？',
    'faq.range.a': '可以。把「計算到哪一天」改成生日當天或之後的任何日期，最遠到 9998 年。下一個生日、倒數和里程碑狀態都會依這個日期計算。未來生日也可以用來預先規劃。這是日曆工具，不是壽命預測。',
    'about.footnote': '* 時間換算以每天 24 小時、每小時 60 分鐘、每分鐘 60 秒計算。',

    'footer.tagline': '每個平凡的日子，都是你故事的一部分。',
    'footer.back': '回到你的日子',
    noscript: '請啟用 JavaScript 才能使用生日計算器。所有計算都在你的瀏覽器中完成。',

    'age.that': '也就是 {age}。',
    'seconds.equivalent': '{n} 秒（換算）*',
    'birthday.today': '就是今天！',
    'birthday.away': '還有 {n} 天',
    'birthday.detail': '{date} · 滿 {age} 歲',
    'year.description': '自上次生日以來已完成 {done} 天，距離下一個篇章還有 {left} 天。',
    'year.caption': '每個點代表一天，這一歲已完成 {pct}%。',
    'next.fallbackTitle': '很長很長的故事',
    'next.fallbackDate': '支援範圍內已沒有更多里程碑。',
    'next.fallbackDetail': '試試較早的計算日期。',
    'next.progress': '從生日出發已走了 {pct}%',
    'status.now': '就是這一天',
    'status.ago': '{n} 天前',
    'status.in': '{n} 天後',

    'milestone.elapsed': '{n} 天',
    'milestone.inclusive': '第 {n} 天',
    'unit.year': '{n} 年',
    'unit.month': '{n} 個月',
    'unit.day': '{n} 天',
    'list.sep': ' ',
    'date.weekday': '{date} {weekday}',

    'announce.calculated': '已計算：活了 {n} 天。',
    'announce.added': '已加入里程碑：第 {n} 天。',
    'announce.cleared': '已移除儲存的生日。',
    'announce.storage': '瀏覽器儲存空間無法使用，你的日期在這次瀏覽仍然有效。',
    'announce.csv': '里程碑 CSV 已下載。',
    'announce.ics': '行事曆活動已下載，請用行事曆應用程式開啟。',

    'err.incomplete': '請輸入完整日期。',
    'err.yearRange': '請使用 0001 到 9999 年。',
    'err.invalidDate': '請輸入有效的日曆日期。',
    'err.milestoneRange': '請選擇 1 到 1,000,000 之間的整數。',
    'err.milestoneYear': '這個里程碑超過 9999 年。',
    'err.throughYear': '請選擇 9998 年（含）以前的日期。',
    'err.beforeBirth': '計算日期必須在生日當天或之後。',

    'csv.milestone': '里程碑',
    'csv.convention': '計算方式',
    'csv.date': '日期',
    'csv.age': '年齡',
    'csv.from': '距計算日期（天）',
    'csv.calcDate': '計算日期',
    'ics.summary': '我的里程碑：{label}',
    'ics.description': '生日里程碑。出生當天是第 {n} 天。'
  };

  const ja = {
    'meta.title': 'Daybook · 毎日が積み重なる',
    'meta.description': '生まれてからの日数と、100日・1000日などの記念日がわかる誕生日計算ツール。無料でプライベート、計算はすべて端末の中で行います。',
    skip: '計算ツールへスキップ',
    'nav.label': 'メインナビゲーション',
    'nav.milestones': 'マイルストーン',
    'nav.about': '計算のしくみ',
    'privacy.badge': '日付は端末の中だけに',
    'lang.label': '言語',

    'intro.eyebrow': 'あなたの時間を、少し別の角度から',
    'intro.title': '人生は、<br><em>誕生日</em>だけじゃない。',
    'intro.lead': 'あなたはもう、何千もの何気なくて特別な日を生きてきた。<br>あなたの数字を見つけて、次に祝う日を見つけよう。',

    'calc.aria': '誕生日計算ツール',
    'field.birth': '誕生日はいつですか？',
    'field.asof': 'この日まで計算',
    'btn.today': '今日',
    'btn.find': '日数を計算する',
    'opt.remember': 'この端末に誕生日を記憶する',
    'btn.clear': '日付を消去',
    example: '表示中はサンプルの誕生日です。あなたの日付に変えてみましょう。',

    'overview.aria': 'あなたの日々',
    'overview.overline': 'あなたの人生を、日数で',
    asof: '{date} 時点',
    'days.caption': '<em>あなた</em>でいる日々。',
    'stat.weeks': 'まる1週間',
    'stat.months': 'まる1か月',
    'stat.hours': '時間換算*',

    'next.overline': '次の日のマイルストーン',
    'next.count': '日後',
    'next.progressAria': '次のマイルストーンまでの進捗',
    'btn.calendar': 'カレンダーに保存',

    'details.aria': '誕生日の詳細',
    'detail.started': 'すべてはこの日から',
    'detail.nextBirthday': '次の誕生日',
    'detail.leap': 'これまでのうるう日',
    'detail.leapNote': '誕生日を含む 2 月 29 日',
    'detail.minutes': '分換算*',

    'year.eyebrow': '一日ずつ',
    'year.title': 'いまの1年。',
    'legend.done': '終わった日',
    'legend.todo': 'これからの日',

    'milestones.eyebrow': '祝う理由',
    'milestones.title': '積み重なる日々。',
    'btn.csv': 'すべて CSV でダウンロード',
    'filter.aria': 'マイルストーンを絞り込む',
    'filter.all': 'すべて',
    'filter.upcoming': 'これから',
    'filter.passed': '達成済み',
    'counting.label': '数え方',
    'counting.elapsed': '誕生日 = 0日目',
    'counting.inclusive': '誕生日 = 1日目',
    'counting.note.elapsed': '誕生日は0日目です。100日のマイルストーンは、誕生日からちょうど100日後の日付になります。',
    'counting.note.inclusive': '誕生日は1日目です。100日目は誕生日から99日後になります。上の「生きてきた日数」はこれまでどおり経過日数です。',
    'table.caption': '日のマイルストーンと日付',
    'table.milestone': 'マイルストーン',
    'table.date': '日付',
    'table.age': 'その日の年齢',
    'table.delta': '計算日からの差',
    empty: 'この表示にはマイルストーンがありません。下で追加できます。',
    'custom.tag': 'カスタム',

    'custom.label': 'あなたの日の設定',
    'custom.help': '好きな数字？目標？その日付を見つけよう。',
    'custom.inputAria': 'カスタム日数',
    'custom.placeholder': '例：12,345',
    'btn.add': 'マイルストーンを追加',

    'about.title': '数字について、少しだけ。',
    'faq.counting.q': '日数とマイルストーンはどう数えますか？',
    'faq.counting.a': '「生きてきた日数」は、誕生日から選んだ日付までの暦日数です。誕生日当日は0です。標準の数え方では、100日のマイルストーンは誕生日から100日後です。「誕生日 = 1日目」を選ぶと、文字どおりの100日目（誕生日から99日後）を表示します。上の合計日数は常に経過日数です。',
    'faq.leap.q': 'うるう年、タイムゾーン、出生時刻はどう扱いますか？',
    'faq.leap.a': 'うるう年も含めて数えます。「今日」は端末の現地日付を使います。暦の計算は夏時間の影響を受けません。出生時刻は尋ねないため、時間・分・秒は暦日数の換算であり、実際に経過した時間ではありません。2月29日生まれの人の誕生日は、うるう年でない年には2月28日になります。月の計算はその月の末日に丸めます。',
    'faq.privacy.q': 'このサイトは誕生日を保存しますか？',
    'faq.privacy.a': '計算はすべて端末の中で行われます。アクセス解析、外部フォント、アカウントはありません。「この端末に誕生日を記憶する」を選んだときだけ、このブラウザに誕生日が保存されます。「日付を消去」で削除できます。カレンダーと CSV のダウンロードには記念日の日付が含まれるので、共有にはご注意ください。',
    'faq.range.q': '過去や未来の日付でも計算できますか？',
    'faq.range.a': 'はい。「この日まで計算」を誕生日以降の任意の日付（9998年まで）に変えてください。次の誕生日、カウントダウン、マイルストーンの状態もその日付で計算されます。未来の誕生日も計画用に使えます。これは暦のツールであり、寿命の予測ではありません。',
    'about.footnote': '* 時間の換算は、1日24時間、1時間60分、1分60秒で計算しています。',

    'footer.tagline': '何気ない一日も、あなたの物語の一部。',
    'footer.back': 'あなたの日々に戻る',
    noscript: '誕生日計算ツールを使うには JavaScript を有効にしてください。計算はすべてブラウザの中で行われます。',

    'age.that': 'つまり {age}。',
    'seconds.equivalent': '{n}秒換算*',
    'birthday.today': '今日です！',
    'birthday.away': 'あと{n}日',
    'birthday.detail': '{date} · {age} 歳',
    'year.description': '前回の誕生日から {done} 日が終わり、次の章まであと {left} 日。',
    'year.caption': '1つの点が1日。この1年の {pct}% が終わりました。',
    'next.fallbackTitle': 'とても長い物語',
    'next.fallbackDate': '対応範囲にもうマイルストーンはありません。',
    'next.fallbackDetail': 'もっと早い日付で計算してみてください。',
    'next.progress': '誕生日から {pct}% 進みました',
    'status.now': 'この日',
    'status.ago': '{n}日前',
    'status.in': '{n}日後',

    'milestone.elapsed': '{n}日',
    'milestone.inclusive': '{n}日目',
    'unit.year': '{n}年',
    'unit.month': '{n}か月',
    'unit.day': '{n}日',
    'list.sep': '',
    'date.weekday': '{date}（{weekday}）',

    'announce.calculated': '{n}日生きてきたことを計算しました。',
    'announce.added': 'マイルストーン {n}日目を追加しました。',
    'announce.cleared': '保存した誕生日を削除しました。',
    'announce.storage': 'ブラウザの保存領域を使えません。この訪問中は日付をそのまま使えます。',
    'announce.csv': 'マイルストーンの CSV をダウンロードしました。',
    'announce.ics': 'カレンダーの予定をダウンロードしました。カレンダーアプリで開いてください。',

    'err.incomplete': '日付をすべて入力してください。',
    'err.yearRange': '0001年から9999年の範囲で指定してください。',
    'err.invalidDate': '正しい暦の日付を入力してください。',
    'err.milestoneRange': '1 から 1,000,000 までの整数を選んでください。',
    'err.milestoneYear': 'このマイルストーンは9999年を超えます。',
    'err.throughYear': '9998年までの日付を選んでください。',
    'err.beforeBirth': '計算日は誕生日以降にしてください。',

    'csv.milestone': 'マイルストーン',
    'csv.convention': '数え方',
    'csv.date': '日付',
    'csv.age': '年齢',
    'csv.from': '計算日からの差（日）',
    'csv.calcDate': '計算日',
    'ics.summary': 'わたしのマイルストーン：{label}',
    'ics.description': '誕生日のマイルストーン。誕生日は{n}日目です。'
  };

  const ko = {
    'meta.title': 'Daybook · 하루하루가 쌓여',
    'meta.description': '태어난 뒤 며칠을 살았는지, 100일·1000일 같은 기념일이 언제인지 알려주는 생일 계산기입니다. 무료이고 계산은 모두 기기 안에서 이루어집니다.',
    skip: '계산기로 건너뛰기',
    'nav.label': '주요 메뉴',
    'nav.milestones': '마일스톤',
    'nav.about': '계산 방식',
    'privacy.badge': '날짜는 기기에만 저장됩니다',
    'lang.label': '언어',

    'intro.eyebrow': '당신의 시간을 조금 다른 각도에서',
    'intro.title': '인생에는<br><em>생일</em>만 있는 게 아니니까.',
    'intro.lead': '당신은 이미 수천 개의 평범하고도 특별한 날을 살아왔습니다.<br> 당신의 숫자를 찾고, 다음에 축하할 날을 만나보세요.',

    'calc.aria': '생일 계산기',
    'field.birth': '생일이 언제인가요?',
    'field.asof': '이 날까지 계산',
    'btn.today': '오늘',
    'btn.find': '내 날짜 계산하기',
    'opt.remember': '이 기기에 생일 저장',
    'btn.clear': '내 날짜 지우기',
    example: '예시 생일이 표시되어 있습니다. 내 생일로 바꿔보세요.',

    'overview.aria': '당신의 날들',
    'overview.overline': '당신의 인생, 일수로',
    asof: '{date} 기준',
    'days.caption': '<em>당신</em>으로 살아온 날들.',
    'stat.weeks': '온전한 주',
    'stat.months': '온전한 달',
    'stat.hours': '시간 환산*',

    'next.overline': '다음 날 마일스톤',
    'next.count': '일 남음',
    'next.progressAria': '다음 마일스톤까지의 진행률',
    'btn.calendar': '캘린더에 저장',

    'details.aria': '생일 상세',
    'detail.started': '모든 것은 이 날에서 시작',
    'detail.nextBirthday': '다음 생일',
    'detail.leap': '지나온 윤일',
    'detail.leapNote': '생일 당일을 포함한 2월 29일',
    'detail.minutes': '분 환산*',

    'year.eyebrow': '하루씩',
    'year.title': '지금의 한 해.',
    'legend.done': '지나온 날',
    'legend.todo': '남은 날',

    'milestones.eyebrow': '축하할 이유',
    'milestones.title': '쌓여가는 날들.',
    'btn.csv': '전체 CSV 다운로드',
    'filter.aria': '마일스톤 필터',
    'filter.all': '전체',
    'filter.upcoming': '예정',
    'filter.passed': '달성',
    'counting.label': '세는 방식',
    'counting.elapsed': '출생일 = 0일째',
    'counting.inclusive': '출생일 = 1일째',
    'counting.note.elapsed': '출생일은 0일째입니다. 100일 마일스톤은 출생일에서 정확히 100일 뒤입니다.',
    'counting.note.inclusive': '출생일은 1일째입니다. 100일째는 출생일에서 99일 뒤입니다. 위의 살아온 날수는 항상 지나온 날수입니다.',
    'table.caption': '날 마일스톤과 날짜',
    'table.milestone': '마일스톤',
    'table.date': '날짜',
    'table.age': '그날의 나이',
    'table.delta': '계산일로부터',
    empty: '이 보기에는 마일스톤이 없습니다. 아래에서 직접 추가해 보세요.',
    'custom.tag': '직접 추가',

    'custom.label': '나만의 날',
    'custom.help': '행운의 숫자? 목표? 그 날짜를 찾아보세요.',
    'custom.inputAria': '직접 입력할 일수',
    'custom.placeholder': '예: 12,345',
    'btn.add': '마일스톤 추가',

    'about.title': '숫자에 관한 몇 가지.',
    'faq.counting.q': '날수와 마일스톤은 어떻게 세나요?',
    'faq.counting.a': '살아온 날수는 생일부터 선택한 날짜까지의 달력 날수입니다. 생일 당일은 0입니다. 기본 방식에서 100일 마일스톤은 생일에서 100일 뒤입니다. ‘출생일 = 1일째’를 고르면 말 그대로의 100일째, 즉 생일에서 99일 뒤를 보여줍니다. 위의 총 일수는 항상 지나온 날수입니다.',
    'faq.leap.q': '윤년, 시간대, 출생 시각은 어떻게 처리하나요?',
    'faq.leap.a': '윤년도 포함해 셉니다. ‘오늘’은 기기의 현지 날짜를 사용합니다. 달력 계산은 일광 절약 시간의 영향을 받지 않습니다. 출생 시각은 묻지 않으므로 시간·분·초는 달력 날수의 환산이며 실제로 흐른 시간이 아닙니다. 2월 29일생은 윤년이 아닌 해에 2월 28일을 생일로 씁니다. 개월 계산은 그 달의 마지막 날로 맞춥니다.',
    'faq.privacy.q': '이 사이트는 생일을 저장하나요?',
    'faq.privacy.a': '계산은 모두 기기 안에서 이루어집니다. 분석 도구, 외부 글꼴, 계정이 없습니다. ‘이 기기에 생일 저장’을 선택했을 때만 이 브라우저에 생일이 저장됩니다. ‘내 날짜 지우기’로 삭제할 수 있습니다. 캘린더와 CSV 다운로드에는 기념일 날짜가 들어 있으니 공유에 주의하세요.',
    'faq.range.q': '과거나 미래 날짜로도 볼 수 있나요?',
    'faq.range.a': '네. ‘이 날까지 계산’을 생일 이후 아무 날짜(9998년까지)로 바꾸세요. 다음 생일, 남은 날, 마일스톤 상태도 그 날짜를 기준으로 계산됩니다. 미래 생일도 계획용으로 사용할 수 있습니다. 이것은 달력 도구이며 수명 예측이 아닙니다.',
    'about.footnote': '* 시간 환산은 하루 24시간, 한 시간 60분, 1분 60초로 계산합니다.',

    'footer.tagline': '평범한 하루도 당신 이야기의 일부입니다.',
    'footer.back': '내 날짜로 돌아가기',
    noscript: '생일 계산기를 사용하려면 JavaScript를 켜 주세요. 모든 계산은 브라우저 안에서 이루어집니다.',

    'age.that': '지금까지 {age}.',
    'seconds.equivalent': '{n}초 환산*',
    'birthday.today': '바로 오늘!',
    'birthday.away': '{n}일 남음',
    'birthday.detail': '{date} · {age}세',
    'year.description': '지난 생일 이후 {done}일이 지났고, 다음 장까지 {left}일 남았습니다.',
    'year.caption': '점 하나가 하루입니다. 이번 한 해의 {pct}%를 지났습니다.',
    'next.fallbackTitle': '아주 긴 이야기',
    'next.fallbackDate': '지원 범위에 더 이상 마일스톤이 없습니다.',
    'next.fallbackDetail': '더 이른 계산 날짜를 사용해 보세요.',
    'next.progress': '생일에서 {pct}% 지나왔습니다',
    'status.now': '이 날',
    'status.ago': '{n}일 전',
    'status.in': '{n}일 후',

    'milestone.elapsed': '{n}일',
    'milestone.inclusive': '{n}일째',
    'unit.year': '{n}년',
    'unit.month': '{n}개월',
    'unit.day': '{n}일',
    'list.sep': ' ',
    'date.weekday': '{date} {weekday}',

    'announce.calculated': '{n}일을 살아온 것으로 계산했습니다.',
    'announce.added': '마일스톤 {n}일째를 추가했습니다.',
    'announce.cleared': '저장된 생일을 삭제했습니다.',
    'announce.storage': '브라우저 저장 공간을 쓸 수 없습니다. 이번 방문 동안에는 날짜가 그대로 작동합니다.',
    'announce.csv': '마일스톤 CSV를 다운로드했습니다.',
    'announce.ics': '캘린더 일정을 다운로드했습니다. 캘린더 앱에서 열어 주세요.',

    'err.incomplete': '날짜를 모두 입력해 주세요.',
    'err.yearRange': '0001년부터 9999년 사이로 입력해 주세요.',
    'err.invalidDate': '올바른 달력 날짜를 입력해 주세요.',
    'err.milestoneRange': '1부터 1,000,000까지의 정수를 선택해 주세요.',
    'err.milestoneYear': '이 마일스톤은 9999년을 넘습니다.',
    'err.throughYear': '9998년까지의 날짜를 선택해 주세요.',
    'err.beforeBirth': '계산 날짜는 생일 당일이나 그 이후여야 합니다.',

    'csv.milestone': '마일스톤',
    'csv.convention': '세는 방식',
    'csv.date': '날짜',
    'csv.age': '나이',
    'csv.from': '계산일로부터(일)',
    'csv.calcDate': '계산 날짜',
    'ics.summary': '나의 마일스톤: {label}',
    'ics.description': '생일 마일스톤. 출생일은 {n}일째입니다.'
  };

  Object.assign(en, {
  "share.button": "Create share image",
  "share.title": "Your days, ready to share",
  "share.help": "Preview your current result, then download the image.",
  "share.download": "Download image",
  "share.close": "Close",
  "share.loading": "Creating your image…",
  "share.error": "The image could not be created. Please try again.",
  "share.saved": "Image downloaded.",
  "share.lived": "Days lived",
  "share.next": "My next milestone",
  "share.none": "More days to celebrate",
  "share.alt": "{days} days lived. {milestone}. {date}. {countdown}.",
  "share.note": "1200 × 1500 · Image generated on your device"
});
  Object.assign(zhTW, {
  "share.button": "製作分享圖片",
  "share.title": "把你的日子分享出去",
  "share.help": "預覽目前的計算結果，再下載圖片。",
  "share.download": "下載圖片",
  "share.close": "關閉",
  "share.loading": "正在製作圖片…",
  "share.error": "無法製作圖片，請再試一次。",
  "share.saved": "圖片已下載。",
  "share.lived": "已活天數",
  "share.next": "我的下一個里程碑",
  "share.none": "還有更多值得慶祝的日子",
  "share.alt": "已活 {days} 天。{milestone}。{date}。{countdown}。",
  "share.note": "1200 × 1500 · 圖片在你的裝置上產生"
});
  Object.assign(ja, {
  "share.button": "シェア画像を作成",
  "share.title": "これまでの日々をシェア",
  "share.help": "現在の計算結果を確認して、画像をダウンロードできます。",
  "share.download": "画像をダウンロード",
  "share.close": "閉じる",
  "share.loading": "画像を作成しています…",
  "share.error": "画像を作成できませんでした。もう一度お試しください。",
  "share.saved": "画像をダウンロードしました。",
  "share.lived": "生まれてからの日数",
  "share.next": "次のマイルストーン",
  "share.none": "これからも記念日は続く",
  "share.alt": "生まれてから {days} 日。{milestone}。{date}。{countdown}。",
  "share.note": "1200 × 1500 · 画像は端末内で作成されます"
});
  Object.assign(ko, {
  "share.button": "공유 이미지 만들기",
  "share.title": "지금까지의 날들을 공유해요",
  "share.help": "현재 계산 결과를 확인한 뒤 이미지를 다운로드하세요.",
  "share.download": "이미지 다운로드",
  "share.close": "닫기",
  "share.loading": "이미지를 만들고 있어요…",
  "share.error": "이미지를 만들지 못했어요. 다시 시도해 주세요.",
  "share.saved": "이미지를 다운로드했어요.",
  "share.lived": "지금까지 살아온 날",
  "share.next": "다음 마일스톤",
  "share.none": "앞으로도 기념할 날은 계속돼요",
  "share.alt": "지금까지 {days}일. {milestone}. {date}. {countdown}.",
  "share.note": "1200 × 1500 · 이미지는 이 기기에서 생성됩니다"
});

  const DICT = { en, 'zh-TW': zhTW, ja, ko };

  let current = 'en';
  let onChange = null;
  const numberFormats = new Map();
  const dateFormats = new Map();
  const weekdayFormats = new Map();

  function normalize(tag) {
    if (!tag || typeof tag !== 'string') return null;
    const lower = tag.toLowerCase();
    if (lower.startsWith('zh')) return 'zh-TW';
    if (lower.startsWith('ja')) return 'ja';
    if (lower.startsWith('ko')) return 'ko';
    if (lower.startsWith('en')) return 'en';
    return null;
  }

  function resolveLang(saved, languages) {
    const fromStore = normalize(saved);
    if (fromStore) return fromStore;
    for (const tag of languages || []) {
      const match = normalize(tag);
      if (match) return match;
    }
    return 'en';
  }

  function numberFormat() {
    const locale = LOCALES[current];
    if (!numberFormats.has(locale)) numberFormats.set(locale, new Intl.NumberFormat(locale));
    return numberFormats.get(locale);
  }

  function dateFormat() {
    const locale = LOCALES[current];
    if (!dateFormats.has(locale)) {
      dateFormats.set(locale, new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }));
    }
    return dateFormats.get(locale);
  }

  function weekdayFormat() {
    const locale = LOCALES[current];
    if (!weekdayFormats.has(locale)) {
      weekdayFormats.set(locale, new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }));
    }
    return weekdayFormats.get(locale);
  }

  function formatNumber(n) {
    return numberFormat().format(n);
  }

  function formatDecimal(n, digits) {
    return new Intl.NumberFormat(LOCALES[current], { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);
  }

  function formatDate(date) {
    return dateFormat().format(date);
  }

  function formatWeekday(date) {
    return weekdayFormat().format(date);
  }

  function ordinal(n) {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
    return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'}`;
  }

  function translate(dict, key, params) {
    let value = dict[key];
    if (params && typeof params.n === 'number') {
      const category = new Intl.PluralRules(LOCALES[current]).select(params.n);
      const pluralKey = `${key}.${category}`;
      if (dict[pluralKey] !== undefined) value = dict[pluralKey];
      else if (dict[`${key}.other`] !== undefined) value = dict[`${key}.other`];
    }
    if (value === undefined) value = en[key];
    if (value === undefined) return key;
    if (!params) return value;
    const formatted = Object.assign({}, params);
    if (typeof formatted.n === 'number') formatted.n = formatNumber(formatted.n);
    return value.replace(/\{(\w+)\}/g, (match, name) => (formatted[name] === undefined ? match : String(formatted[name])));
  }

  function t(key, params) {
    return translate(DICT[current], key, params);
  }

  function unit(n, kind) {
    return t(`unit.${kind}`, { n });
  }

  function milestoneLabel(n, inclusive) {
    return inclusive
      ? t('milestone.inclusive', { n, ord: ordinal(n) })
      : t('milestone.elapsed', { n });
  }

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode: keep the session choice only */ }
  }

  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function apply() {
    if (typeof document !== 'undefined') document.documentElement.lang = HTML_LANG[current];
    if (onChange) onChange(current);
  }

  function setLang(lang, persist) {
    const next = normalize(lang) || 'en';
    if (!LANGS.includes(next)) return current;
    current = next;
    if (persist !== false) save(current);
    apply();
    return current;
  }

  function init(options) {
    onChange = options && options.onChange ? options.onChange : null;
    const languages = typeof navigator !== 'undefined'
      ? (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])
      : [];
    current = resolveLang(readSaved(), languages);
    if (typeof document !== 'undefined') document.documentElement.lang = HTML_LANG[current];
    if (onChange) onChange(current);
    return current;
  }

  const api = {
    LANGS, LOCALES, HTML_LANG, NATIVE_NAMES, STORAGE_KEY,
    DICT, normalize, resolveLang,
    lang: () => current,
    htmlLang: () => HTML_LANG[current],
    locale: () => LOCALES[current],
    t, unit, milestoneLabel, ordinal,
    formatNumber, formatDecimal, formatDate, formatWeekday,
    init, setLang, save, readSaved
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DaybookI18n = api;
})(typeof window !== 'undefined' ? window : globalThis);

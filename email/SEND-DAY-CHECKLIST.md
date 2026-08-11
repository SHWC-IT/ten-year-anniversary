# Send day checklist

Follow this top to bottom. Every step says what to do and what "good" looks like before moving on.

For how the flow is built, see [POWER-AUTOMATE.md](POWER-AUTOMATE.md). You do not need it open to
send.

**The send:** 212 emails to 209 inboxes, from `info@theshepherdshouse.church`, about 11 minutes of
run time.

Three of those inboxes are shared by two family members each, so they receive two personalized
emails. That is intended.

---

## Part A: one-time setup

Do this once. Roughly 30 minutes, mostly waiting on admin settings.

- [ ] **A1.** Generate the send list:

      python3 email/tools/build-list.py

      Good looks like: `rows written 212`, `unique inboxes 209`, `reconciled OK`.
      It writes `SEND - 10 Year Anniversary.xlsx` next to your membership lists. Your original
      workbook is not modified.

- [ ] **A2.** Upload `SEND - 10 Year Anniversary.xlsx` to SharePoint, into a folder such as
      `/Shared Documents/Anniversary Email/`. Write the path down, Step B needs it.

- [ ] **A3.** Open it in Excel for the web and click any cell in the data. The ribbon should show
      **Table Design**, and the table name should read `Contacts`. If you do not see Table Design,
      the flow will not be able to read the file and something went wrong in A1.

- [ ] **A4.** Upload `email/anniversary-invite.html` to the same folder.

- [ ] **A5.** Grant **Send As** on `info@theshepherdshouse.church` to whichever account will own
      the flow. Exchange admin center, Mailboxes, select the shared mailbox, Delegation, Send As.

- [ ] **A6.** Verify A5 worked: in Outlook web, send yourself one ordinary message From the shared
      mailbox. Good looks like the From reading `Shepherd's House Worship Center` with **no**
      "on behalf of" anywhere. If you see "on behalf of", you were granted Send on Behalf rather
      than Send As. Go back to A5.

- [ ] **A7.** Confirm **DKIM is enabled** for `theshepherdshouse.church` in the Microsoft Defender
      portal, under Email authentication settings. It is off by default on custom domains. Also
      confirm SPF includes `spf.protection.outlook.com`.

      This is the highest-value step in this whole document. 189 of your 209 inboxes are Gmail,
      Liberty, or Yahoo, and all three lean on these signals to decide inbox versus spam.

- [ ] **A8.** Build the flow following `POWER-AUTOMATE.md`, then save it without running.

---

## Part B: test to yourself

Nothing here touches a single member. Repeat it as often as you like.

- [ ] **B1.** Close the workbook everywhere, including the Excel desktop app. The Excel connector
      fails on a locked file. If you see a file named `~$SEND - 10 Year Anniversary.xlsx` next to
      it, it is still open somewhere.

- [ ] **B2.** Run the flow with:

      TestMode    = Yes
      TestAddress = your own address
      MaxToSend   = 3

- [ ] **B3.** Good looks like: the run is all green, and 3 emails arrive in your inbox.

- [ ] **B4.** **Prove the test was inert.** Open the workbook and confirm every `Status` still
      reads `Ready` and every `SentAt` is still empty. If anything flipped to `Sent`, the
      Condition in flow step 5f is inverted, and you must fix it before Part C.

- [ ] **B5.** Rendering pass. Open one of the three emails in each of these:

      - [ ] Outlook desktop on Windows, the strictest renderer, it uses Word's engine
      - [ ] Outlook on the web
      - [ ] Gmail in a browser
      - [ ] Mail on an iPhone

      In each, check specifically:

      - [ ] The greeting reads a real name, not `{{FirstName}}`
      - [ ] **Register Now** is a solid gold filled rectangle, not plain blue text
      - [ ] The background is still deep navy, not inverted to white or grey by dark mode
      - [ ] The three service rows line up, date on the left, details on the right
      - [ ] Nothing needs sideways scrolling on the phone

- [ ] **B6.** Click every link and confirm each lands where it should:

      - [ ] Register Now, and the plain link under it, both go to the registration page
      - [ ] Where to Stay, Give, Full Program
      - [ ] The unsubscribe link opens a pre-filled email
      - [ ] The footer email and website links

- [ ] **B7.** **Test with images blocked**, which is Outlook's default for external senders. In
      Outlook, right click the image area and choose not to download pictures, or just read what
      shows before you allow images. Good looks like the gold alt text plus the SHEPHERD'S HOUSE
      lockup underneath, so the header still identifies the church with no image at all.

- [ ] **B8.** Read the whole email once as a member would. Copy mistakes are much cheaper to fix
      now than after 212 people have it.

---

## Part C: seed batch

The first live send. Ten people who will tell you the truth.

- [ ] **C1.** In the workbook, set `Status` to `Hold` for everyone except about 10 staff or family.
      Fastest way: sort by `Status`, select all data rows, type `Hold`, then change your 10 back to
      `Ready`.

- [ ] **C2.** Make sure at least one of the ten is a **liberty.edu** address. 66 recipients sit
      behind that institution's filter, and it is the most likely place for a quarantine.

- [ ] **C3.** Save and close the workbook.

- [ ] **C4.** Run the flow with:

      TestMode    = No
      TestAddress = (ignored)
      MaxToSend   = 10

- [ ] **C5.** Good looks like: those 10 rows now read `Sent` with a timestamp, and the run is all
      green.

- [ ] **C6.** Check the Sent Items of `info@theshepherdshouse.church`. The messages should be
      there, sent as the shared mailbox.

- [ ] **C7.** Ask two of the ten, ideally including the Liberty address, to confirm the email
      arrived **and** that it was not in spam or quarantine.

- [ ] **C8.** If anything landed in spam, stop. Revisit A7 before sending to the rest.

---

## Part D: the full send

- [ ] **D1.** Set the held rows back to `Ready`. Find and replace `Hold` with `Ready` in the
      `Status` column does it in one pass.

- [ ] **D2.** Confirm the counts before you commit: about **201** rows now read `Ready`, and the 10
      from Part C still read `Sent`. Those 10 will not be mailed again.

- [ ] **D3.** Save and close the workbook.

- [ ] **D4.** Timing, if you have the choice: Tuesday through Thursday morning reads as less
      promotional than a weekend blast, and lands while people are at a computer.

- [ ] **D5.** Run the flow with:

      TestMode    = No
      TestAddress = (ignored)
      MaxToSend   = 250

- [ ] **D6.** Leave the run open and watch it. Expect about 11 minutes. It is pacing itself at 3
      seconds per email on purpose, so slow is correct.

- [ ] **D7.** If it fails partway through, just run it again with the same settings. Only `Ready`
      rows are picked up, so it resumes exactly where it stopped. Nobody gets a second copy.

---

## Part E: after the send

- [ ] **E1.** Read the summary email for the count it picked up.

- [ ] **E2.** Filter the workbook for `Status` = `Error` and read `LastError`. Typos and dead
      mailboxes show up here. Fix any that are obviously wrong, set them back to `Ready`, and
      re-run.

- [ ] **E3.** Watch `info@theshepherdshouse.church` over the next few days for:

      - **Unsubscribe replies**, set that row's `Status` to `Unsubscribed`
      - **Hard bounces**, set that row's `Status` to `Bounced`

      Keep the rows. The `Status eq 'Ready'` filter excludes them from every future send
      automatically, and you keep the record of why.

- [ ] **E4.** Registrations are the actual scoreboard. Check the Elvanto form against the 212 sent
      and you will know whether the invitation worked.

- [ ] **E5.** The **345 members on the PHONE list have no email address** and were not reached by
      any of this. They need a call or a text. That is more than half your membership, so it is
      worth planning properly rather than treating it as a footnote.

---

## If you need to stop mid-send

Turn the flow off in Power Automate, or cancel the running instance. Rows already mailed read
`Sent`, everyone else is still `Ready`. Fix whatever went wrong and re-run when ready. The
spreadsheet is the record of exactly how far it got.

# Pledge form

The pledge form is built in Elvanto and embedded in a modal on `giving.html`.
Everything Elvanto needs from us lives in this folder.

## Turning the button on

The "Make a pledge" button stays hidden until the form URL is filled in. Open
`giving.js`, find `PLEDGE_FORM_URL` near the top, and paste the Elvanto embed
URL between the quotes. Nothing else needs to change.

## Elvanto form colors

Paste these into the form's appearance settings. Background and Form
Background are deliberately the same value, the midpoint of the modal's navy
gradient, so there is no visible seam where the iframe starts.

| Setting | Hex |
| --- | --- |
| Background | `#0E172B` |
| Form Background | `#0E172B` |
| Form Text | `#F0ECDF` |
| Form Label | `#A9B2C6` |
| Form Help Text | `#8C97AE` |
| Title Text | `#ECD29A` |
| Heading Text | `#C9A356` |
| Submit Button | `#C9A356` |
| Submit Button Text | `#0D1322` |

Every one of these clears WCAG AA against the navy background. The modal
already shows a gold "Make your pledge." headline, so the form's own title can
be left blank.

## After Submission

Choose **Display a custom success message** and paste `success-message.html`.

Merge fields do not run in the success message, so that file names no names
and no amounts. A tag there renders on screen as raw braces.

It also makes no promise of a confirmation email, because the email does not
send reliably. This screen is the confirmation the giver can count on, and the
email is a bonus when it arrives.

That keeps the confirmation inside the modal, which is what we want. The
**Redirect to a URL** option is a poor fit here: `netlify.toml` sends
`X-Frame-Options: SAMEORIGIN`, so our pages are blocked from rendering inside
Elvanto's frame. `pledge-complete.html` still exists at the site root as a
standalone thank you page if it is ever useful, but the form should not
redirect to it.

## Confirmation email

`confirmation-email.html` is the template for the email Elvanto sends after a
pledge. It is a different file from `success-message.html`, which belongs in
the form's After Submission setting, not in the email.

Neither file carries merge fields any more. They did not come through, so both
thank the giver without naming them or quoting the amount back, rather than
risking raw braces landing in front of someone. If merge fields start working,
the email's greeting and a summary box above the button are the two places
worth adding them.

If Elvanto's email editor rejects a full document, paste only the outer
`<table>` and everything inside it, dropping the doctype, `<html>`, `<head>`
and `<body>` wrapper. That outer table is what paints the navy across the full
width of the reading pane, with the 600px card centred inside it.

## Links

The "Give Toward Your Pledge" button in both templates goes straight to the
one time Square checkout, `https://square.link/u/NKMTbdVA`, the same link
`giving.js` opens for a one time gift. Sending people back to `/giving` would
just make them pick a frequency again. Other links point at
`https://ten.theshepherdshouse.church`, extensionless, the way Netlify serves
the site.

If the one time Square link is ever reissued, it lives in three places: `LINKS`
in `giving.js`, and the button in each of these two templates.

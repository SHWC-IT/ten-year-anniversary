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

That keeps the confirmation inside the modal, which is what we want. The
**Redirect to a URL** option is a poor fit here: `netlify.toml` sends
`X-Frame-Options: SAMEORIGIN`, so our pages are blocked from rendering inside
Elvanto's frame. `pledge-complete.html` still exists at the site root as a
standalone thank you page if it is ever useful, but the form should not
redirect to it.

## Confirmation email

`confirmation-email.html` is the template for the email Elvanto sends after a
pledge. Replace the `{{...}}` placeholders with Elvanto's merge fields for the
matching questions on the form. If a question does not exist, delete that whole
table row rather than leaving it blank.

Links in both templates point at `https://ten.theshepherdshouse.church`,
extensionless, the way Netlify serves the site.

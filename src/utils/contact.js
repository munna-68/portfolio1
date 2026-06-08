/*
  Email integration abstraction.

  The form on /contact calls sendContactEmail(payload). Right now this
  returns a resolved promise so the UI flow can be built and tested
  end-to-end without a backend.

  To wire a real provider, replace the body of sendContactEmail with one
  of the following:

    1. Formspree / Web3Forms (simplest — no server):
         await fetch('https://formspree.io/f/YOUR_FORM_ID', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
           body: JSON.stringify(payload),
         })

    2. EmailJS (browser-only):
         await emailjs.send('service_id', 'template_id', payload, 'public_key')

    3. Your own serverless endpoint:
         await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })

  The function should:
    - throw an Error with a friendly message on failure
    - resolve with an object like { ok: true } on success
*/

export async function sendContactEmail(payload) {
  const res = await fetch('https://formsubmit.co/ajax/mahamudmunna8@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to send. Please try again.')
  return { ok: true }
}

export function validateContactForm(values) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.subject || values.subject.trim().length < 2) {
    errors.subject = 'Please add a short subject.'
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'A few more words will help — at least 10 characters.'
  }
  return errors
}

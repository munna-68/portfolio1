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

const SUBMIT_LATENCY_MS = 900

export async function sendContactEmail(payload) {
  // TODO: replace this stub with a real email provider call.
  // See the file header for drop-in options (Formspree, EmailJS, custom API).
  // eslint-disable-next-line no-console
  console.info('[contact] payload (stub):', payload)

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      // Validation gate — keep the demo honest about the contract.
      if (!payload?.email || !payload?.message) {
        reject(new Error('Missing required fields.'))
        return
      }
      // Simulated network failure toggle (kept off by default; flip for QA).
      if (payload?.__simulateFailure) {
        reject(new Error('Network error. Please try again.'))
        return
      }
      resolve({ ok: true })
    }, SUBMIT_LATENCY_MS)
  })
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

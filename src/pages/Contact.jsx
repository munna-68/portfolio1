import { useRef, useState } from 'react'
import { TransitionLink } from '../components/LiquidTransition'
import { usePageEntrance } from '../hooks/usePageEntrance'
import {
  sendContactEmail,
  validateContactForm,
} from '../utils/contact'

const CHANNELS = [
  {
    label: 'Email',
    value: 'mahamudmunna8@gmail.com',
    href: 'mailto:mahamudmunna8@gmail.com',
  },
  {
    label: 'GitHub',
    value: '@munna-68',
    href: 'https://github.com/munna-68',
  },
  {
    label: 'Facebook',
    value: 'munna-68',
    href: 'https://www.facebook.com/share/17ur3qWUwx/',
  },
  {
    label: 'Instagram',
    value: '@mahamud13954',
    href: 'https://www.instagram.com/mahamud13954?igsh=dm1jNGV0d3cwdGNo',
  },
]

const INITIAL_VALUES = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ArrowOut({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 17L17 7M9 7h8v8"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg
      className="arrow w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  )
}

function Field({ id, label, error, children }) {
  return (
    <label htmlFor={id} className="block group">
      <span className="flex items-baseline justify-between mb-2">
        <span className="label-eyebrow text-ink/55">{label}</span>
        {error ? (
          <span className="label-eyebrow text-accent">{error}</span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

function inputCls(hasError) {
  return [
    'field-input',
    'py-3 md:py-4 text-[16px] md:text-[17px]',
    hasError ? 'field-input--error' : '',
  ].join(' ')
}

export default function Contact() {
  const rootRef = useRef(null)
  usePageEntrance(rootRef)

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  // status: 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateContactForm(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    try {
      // TODO: replace stub in src/utils/contact.js with a real provider
      // (Formspree, EmailJS, or a custom serverless endpoint).
      await sendContactEmail({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      })
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err?.message ||
          'Something went wrong. Please try again, or email me directly.'
      )
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrorMessage('')
    setErrors({})
    setValues(INITIAL_VALUES)
  }

  return (
    <main
      ref={rootRef}
      className="relative pt-40 md:pt-44 pb-24 px-[5vw] md:px-[8vw]"
    >
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-16 md:mb-24">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-ink/50 mb-6">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">Contact — open</span>
              </span>
            </p>
            <h1 className="font-serif text-[12vw] md:text-[4.5rem] lg:text-[6rem] font-medium tracking-[-0.04em] leading-[0.96] text-ink max-w-[14ch]">
              <span className="text-line-mask">
                <span className="text-char-slide">
                  Let’s make something
                  <span className="text-accent italic font-normal"> </span>
                </span>
              </span>
              <br />
              <span className="text-line-mask">
                <span className="text-char-slide">
                  <span className="text-ink/45">considered</span>
                  <span className="text-accent italic font-normal">.</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="md:col-span-5">
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink/70 max-w-md">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  Available for select freelance work through 2026. New
                  projects, quiet questions, or just a hello — the inbox is
                  always open.
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Two columns: channels + form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Channels */}
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="label-eyebrow text-ink/50">Channels</span>
                <span className="flex-1 h-px bg-ink/10" />
              </div>

              <ul className="border-t border-ink/10">
                {CHANNELS.map((c) => (
                  <li
                    key={c.label}
                    className="border-b border-ink/10 py-5 md:py-6"
                  >
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex items-baseline justify-between gap-4 transition-colors duration-300"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="label-eyebrow text-ink/45 block mb-1">
                          {c.label}
                        </span>
                        <span className="block text-[15px] md:text-[16px] text-ink truncate group-hover:text-accent transition-colors duration-300">
                          {c.value}
                        </span>
                      </span>
                      <span className="shrink-0 text-ink/40 group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowOut size={14} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <section className="md:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="label-eyebrow text-ink/50">Send a message</span>
              <span className="flex-1 h-px bg-ink/10" />
            </div>

            {status === 'success' ? (
              <SuccessState onReset={resetForm} />
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-7 md:gap-9"
                aria-busy={status === 'submitting'}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-9">
                  <Field id="name" label="Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={onChange}
                      disabled={status === 'submitting'}
                      className={inputCls(Boolean(errors.name))}
                      placeholder="Your name"
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={onChange}
                      disabled={status === 'submitting'}
                      className={inputCls(Boolean(errors.email))}
                      placeholder="you@domain.com"
                    />
                  </Field>
                </div>

                <Field id="subject" label="Subject" error={errors.subject}>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={onChange}
                    disabled={status === 'submitting'}
                    className={inputCls(Boolean(errors.subject))}
                    placeholder="A short summary"
                  />
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={onChange}
                    disabled={status === 'submitting'}
                    className={inputCls(Boolean(errors.message))}
                    placeholder="Tell me a little about the project, timeline, and what good looks like."
                  />
                </Field>

                {status === 'error' && errorMessage ? (
                  <p
                    role="alert"
                    className="text-[14px] text-accent leading-relaxed"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <p className="text-[12.5px] text-ink/45 max-w-sm leading-relaxed">
                    By submitting, you agree to be contacted by email about
                    your enquiry. No newsletters, no list.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={[
                      'pill-link-solid pointer-events-auto whitespace-nowrap',
                      status === 'submitting'
                        ? 'opacity-60 cursor-wait'
                        : '',
                    ].join(' ')}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                    <ArrowRight />
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>

        <footer className="max-w-8xl mx-auto w-full mt-24 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="label-eyebrow text-ink/45">
            © 2026 Munna · @munna-68
          </p>
          <TransitionLink to="/" className="pill-link">
            Back to work <ArrowRight />
          </TransitionLink>
        </footer>
      </div>
    </main>
  )
}

function SuccessState({ onReset }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-ink/10 rounded-3xl p-8 md:p-12 bg-paper/40 flex flex-col gap-6 max-w-2xl"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="w-2.5 h-2.5 rounded-full bg-accent"
          style={{ boxShadow: '0 0 0 4px rgba(139,126,168,0.18)' }}
        />
        <span className="label-eyebrow text-ink/55">Sent — thank you</span>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
        Message sent successfully
        <span className="text-accent italic font-normal">.</span>
      </h2>
      <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink/70 max-w-lg">
        I read everything that comes through. You’ll hear back within two
        working days, usually sooner.
      </p>
      <div>
        <button type="button" onClick={onReset} className="pill-link">
          Send another <ArrowRight />
        </button>
      </div>
    </div>
  )
}

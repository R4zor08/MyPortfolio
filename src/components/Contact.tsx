import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  AtSign,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SiGithub, SiFacebook, SiInstagram } from 'react-icons/si';
import type { IconType } from 'react-icons';

const contactDetails = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Philippines',
    href: undefined,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ryanllanto44@gmail.com',
    href: 'mailto:ryanllanto44@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+63 945 347 5555',
    href: 'tel:+639453475555',
  },
];

const socialLinks: { icon: IconType; href: string; label: string }[] = [
  { icon: SiGithub, href: 'https://github.com/R4zor08', label: 'GitHub' },
  { icon: SiFacebook, href: 'https://www.facebook.com/Ryeeeee505', label: 'Facebook' },
  { icon: SiInstagram, href: 'https://www.instagram.com/r4zorrrz/', label: 'Instagram' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

    if (!accessKey) {
      setStatus('error');
      setErrorMessage('Form is not configured. Missing access key.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          from_name: 'Razor Portfolio',
        }),
      });

      const result = (await res.json()) as { success?: boolean; message?: string };

      if (res.ok && result.success) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section
      id="contact"
      className="section-padding relative z-20 isolate bg-[#0b0614] overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-full opacity-15 mix-blend-screen -translate-y-1/2">
          <img src="/1.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5">
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl -ml-10 -mb-10" />

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-xl font-heading font-bold text-white">
                    Ryan C. Llanto
                  </h3>
                  <p className="text-purple-400 text-sm font-medium">
                    Web & App Developer
                  </p>
                </div>

                <div className="space-y-3">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors shrink-0">
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-gray-300 hover:text-purple-300 transition-colors text-sm break-all">
                            {value}
                          </a>
                        ) : (
                          <span className="text-gray-300 text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/8">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-3">
                    Follow Me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-11 h-11 rounded-xl glass-card border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                        <Icon size={17} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="font-heading font-bold text-xl text-white mb-1">Send a Message</h3>
              <p className="text-gray-500 text-sm mb-7">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        disabled={status === 'loading'}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 focus:bg-purple-500/5 transition-all disabled:opacity-60"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Email Address
                    </label>
                    <div className="relative">
                      <AtSign
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        disabled={status === 'loading'}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 focus:bg-purple-500/5 transition-all disabled:opacity-60"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                    />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 focus:bg-purple-500/5 transition-all disabled:opacity-60"
                      placeholder="Project Collaboration"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 focus:bg-purple-500/5 transition-all resize-none disabled:opacity-60"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === 'success' && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <p>Message sent! I&apos;ll get back to you soon.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{errorMessage || 'Failed to send. Please try again.'}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-semibold text-sm text-white bg-gradient-glow flex justify-center items-center gap-2 hover:-translate-y-0.5 transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {status === 'loading' ? (
                    <>
                      Sending…
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

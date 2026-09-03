import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Code2,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Menu,
  MessageCircle,
  MoveRight,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logoImage from '@assets/future-minds-robotics-logo-clean.png';
import workshopImage from '../attached_assets/robotics-workshop.jpg';

const queryClient = new QueryClient();

type ModalKind = 'volunteer' | 'contact' | null;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-logo">
      <img src={logoImage} alt="Future Minds Robotics — Team 62281" className="h-14 w-14 shrink-0 rounded-xl border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] object-contain p-1 shadow-[4px_4px_0_hsl(var(--foreground))]" />
      <span className="leading-none">
        <span className="font-display block text-[15px] font-bold tracking-tight">FUTURE MINDS</span>
        <span className="font-mono-custom mt-1 block text-[9px] tracking-[.16em] text-[hsl(var(--muted-foreground))]">ROBOTICS / 62281</span>
      </span>
    </a>
  );
}

function RobotIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]" aria-label="Illustration of a cheerful competition robot">
      <div className="hero-orbit absolute inset-[8%] rounded-full border border-dashed border-[hsl(var(--primary)/.35)]" />
      <div className="hero-orbit absolute inset-[17%] rounded-full border border-[hsl(var(--secondary)/.65)]" style={{ animationDelay: '-5s' }} />
      <span className="float-slow absolute left-[8%] top-[24%] h-4 w-4 rounded-sm bg-[hsl(var(--accent))] shadow-[3px_3px_0_hsl(var(--foreground))]" />
      <span className="float-slower absolute right-[12%] top-[13%] h-6 w-6 rotate-12 rounded-full border-4 border-[hsl(var(--secondary))]" />
      <span className="float-slow absolute bottom-[18%] left-[17%] h-5 w-5 rotate-45 bg-[hsl(var(--primary))]" />
      <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg]">
        <div className="absolute -bottom-7 left-[8%] h-5 w-[84%] rounded-full bg-[hsl(var(--foreground)/.3)] blur-md" />
        <div className="relative rounded-[2.2rem] border-[5px] border-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] p-3 shadow-[10px_10px_0_hsl(var(--foreground))]">
          <div className="flex h-28 items-center justify-center rounded-[1.5rem] border-[3px] border-[hsl(var(--foreground))] bg-[hsl(var(--card))]">
            <div className="flex gap-5">
              <span className="relative h-10 w-10 rounded-full border-[4px] border-[hsl(var(--foreground))] bg-[hsl(var(--primary))] after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[hsl(var(--card))]" />
              <span className="relative h-10 w-10 rounded-full border-[4px] border-[hsl(var(--foreground))] bg-[hsl(var(--primary))] after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[hsl(var(--card))]" />
            </div>
          </div>
          <div className="mx-auto mt-2 h-5 w-3/5 rounded-b-lg border-x-[3px] border-b-[3px] border-[hsl(var(--foreground))] bg-[hsl(var(--accent))]" />
        </div>
        <div className="mx-auto flex w-3/4 justify-between px-1">
          <span className="h-12 w-7 rounded-b-xl border-x-[4px] border-b-[4px] border-[hsl(var(--foreground))] bg-[hsl(var(--primary))]" />
          <span className="h-12 w-7 rounded-b-xl border-x-[4px] border-b-[4px] border-[hsl(var(--foreground))] bg-[hsl(var(--primary))]" />
        </div>
        <div className="absolute -top-16 left-1/2 h-16 w-2 -translate-x-1/2 bg-[hsl(var(--foreground))]" />
        <div className="absolute -top-[5.25rem] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[hsl(var(--foreground))] bg-[hsl(var(--accent))]" />
      </div>
      <div className="absolute bottom-[9%] right-[2%] rounded-xl border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] px-3 py-2 font-mono-custom text-[10px] font-medium shadow-[4px_4px_0_hsl(var(--foreground))]">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />RUN: CURIOUS
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: ReactNode; body?: string; light?: boolean }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${light ? 'text-[hsl(var(--card))]' : ''}`}>
      <p className={`eyebrow mb-5 ${light ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--primary))]'}`}>{eyebrow}</p>
      <h2 className="font-display max-w-3xl text-balance text-4xl font-bold leading-[.98] tracking-[-.05em] sm:text-6xl">{title}</h2>
      {body && <p className={`mt-6 max-w-xl text-lg leading-relaxed ${light ? 'text-[hsl(var(--card)/.7)]' : 'text-[hsl(var(--muted-foreground))]'}`}>{body}</p>}
    </div>
  );
}

function ContactModal({ kind, onClose }: { kind: Exclude<ModalKind, null>; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  const title = kind === 'volunteer' ? 'Bring your good questions.' : 'Say hello to the team.';
  const intro = kind === 'volunteer' ? 'Tell us what you’re excited to share. We’ll follow up with a small, friendly next step.' : 'We read every note. Families, teachers, neighbors, and curious humans are all welcome.';
  if (sent) {
    return (
      <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--foreground)/.7)] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="noisy relative w-full max-w-lg overflow-hidden rounded-[2rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] p-8 shadow-[10px_10px_0_hsl(var(--foreground))] sm:p-12">
          <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5" aria-label="Close message" data-testid="button-close-success"><X size={17} /> Close</button>
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))]"><Send size={24} /></div>
          <h2 id="modal-title" className="font-display text-4xl font-bold tracking-[-.05em]">Message in the air.</h2>
          <p className="mt-4 text-lg leading-relaxed">Thanks, {name || 'friend'}. Your note is ready to send. We’ll be in touch soon.</p>
          <button type="button" onClick={onClose} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-5 py-3 font-semibold text-[hsl(var(--card))] transition-transform hover:-translate-y-0.5" data-testid="button-done-contact">Back to website <ArrowUpRight size={17} /></button>
        </div>
      </div>
    );
  }
  return (
    <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[hsl(var(--foreground)/.7)] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="noisy relative my-5 w-full max-w-xl overflow-hidden rounded-[2rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] p-6 shadow-[10px_10px_0_hsl(var(--foreground))] sm:p-10">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5" aria-label="Close contact form" data-testid="button-close-contact"><X size={17} /> Close</button>
        <p className="eyebrow text-[hsl(var(--primary))]">OPEN CHANNEL / 01</p>
        <h2 id="modal-title" className="font-display mt-4 pr-10 text-4xl font-bold tracking-[-.05em]">{title}</h2>
        <p className="mt-3 max-w-md leading-relaxed text-[hsl(var(--muted-foreground))]">{intro}</p>
         <div className="mt-6 rounded-2xl border-2 border-[hsl(var(--border))] bg-[hsl(var(--muted)/.55)] p-4">
           <p className="font-mono-custom text-[10px] tracking-[.12em] text-[hsl(var(--primary))]">CONTACT THE CEO</p>
           <p className="mt-2 font-semibold">Hassan Zaanoun</p>
           <div className="mt-2 flex flex-col gap-1 text-sm">
             <a href="mailto:hzaanoun23@gmail.com" className="underline decoration-[hsl(var(--primary)/.45)] underline-offset-4 hover:text-[hsl(var(--primary))]">hzaanoun23@gmail.com</a>
             <a href="tel:+16403576683" className="underline decoration-[hsl(var(--primary)/.45)] underline-offset-4 hover:text-[hsl(var(--primary))]">+1 640 357 6683</a>
           </div>
         </div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-8 space-y-4">
          <label className="block text-sm font-semibold">Your name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 block w-full rounded-xl border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder="What should we call you?" data-testid="input-contact-name" /></label>
          <label className="block text-sm font-semibold">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 block w-full rounded-xl border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder="you@example.com" data-testid="input-contact-email" /></label>
          <label className="block text-sm font-semibold">A few words<textarea required value={message} onChange={(event) => setMessage(event.target.value)} className="mt-2 block min-h-28 w-full resize-y rounded-xl border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder={kind === 'volunteer' ? 'I’d love to help by...' : 'I’m curious about...'} data-testid="input-contact-message" /></label>
          <button type="submit" className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 font-semibold text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--foreground))] transition-transform hover:-translate-y-0.5" data-testid="button-submit-contact">Send the note <Send size={17} className="transition-transform group-hover:translate-x-1" /></button>
           <button type="button" onClick={onClose} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[hsl(var(--foreground))] px-5 py-3 font-semibold transition-colors hover:bg-[hsl(var(--muted))]" data-testid="button-back-to-website">Back to website <ArrowUpRight size={17} /></button>
        </form>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalKind>(null);
  const storyRef = useReveal();
  const experienceRef = useReveal();
  const teamRef = useReveal();
  const supportRef = useReveal();
  const closeMenu = () => setMenuOpen(false);
  const openModal = (kind: Exclude<ModalKind, null>) => { setModal(kind); setMenuOpen(false); };
  return (
    <div className="site-shell min-h-[100dvh] bg-[hsl(var(--background))]" id="top">
      <header className="absolute left-0 right-0 top-0 z-40">
        <nav className="section-wrap flex h-20 items-center justify-between" aria-label="Main navigation">
          <Logo />
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#why" className="nav-link" data-testid="link-nav-why">Why it matters</a>
            <a href="#experience" className="nav-link" data-testid="link-nav-experience">The experience</a>
            <a href="#team" className="nav-link" data-testid="link-nav-team">Team 62281</a>
            <a href="https://hcb.hackclub.com/donations/start/futureminds-robotics" target="_blank" rel="noreferrer" className="nav-link" data-testid="link-nav-donate">Donate</a>
            <button onClick={() => openModal('volunteer')} className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-4 py-2.5 text-[hsl(var(--card))] transition-transform hover:-translate-y-0.5" data-testid="button-nav-join">Get involved <ArrowUpRight size={15} /></button>
          </div>
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-xl border-2 border-[hsl(var(--foreground))] p-2.5 md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </nav>
        {menuOpen && <div className="section-wrap rounded-2xl border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] p-4 shadow-[5px_5px_0_hsl(var(--foreground))] md:hidden">
          <div className="grid gap-1">
            <a href="#why" onClick={closeMenu} className="rounded-xl px-4 py-3 font-semibold hover:bg-[hsl(var(--muted))]" data-testid="link-mobile-why">Why it matters</a>
            <a href="#experience" onClick={closeMenu} className="rounded-xl px-4 py-3 font-semibold hover:bg-[hsl(var(--muted))]" data-testid="link-mobile-experience">The experience</a>
            <a href="#team" onClick={closeMenu} className="rounded-xl px-4 py-3 font-semibold hover:bg-[hsl(var(--muted))]" data-testid="link-mobile-team">Team 62281</a>
             <a href="https://hcb.hackclub.com/donations/start/futureminds-robotics" target="_blank" rel="noreferrer" className="rounded-xl px-4 py-3 font-semibold hover:bg-[hsl(var(--muted))]" data-testid="link-mobile-donate">Donate</a>
            <button onClick={() => openModal('volunteer')} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 font-semibold text-[hsl(var(--primary-foreground))]" data-testid="button-mobile-join">Get involved <ArrowUpRight size={15} /></button>
          </div>
        </div>}
      </header>

      <main>
        <section className="noisy relative overflow-hidden bg-[hsl(var(--secondary))] pb-16 pt-32 sm:pb-20 sm:pt-40" aria-labelledby="hero-title">
          <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full border border-[hsl(var(--foreground)/.12)]" />
          <div className="absolute -right-20 top-20 h-[450px] w-[450px] rounded-full border border-[hsl(var(--foreground)/.12)]" />
          <div className="section-wrap relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-4">
            <div className="max-w-2xl">
              <div className="mb-7 flex items-center gap-3 font-mono-custom text-[10px] font-medium tracking-[.12em]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />A STUDENT-LED NONPROFIT · EST. 2023</div>
              <h1 id="hero-title" className="font-display text-balance text-[clamp(3.7rem,9vw,7.8rem)] font-bold leading-[.86] tracking-[-.08em]">Make room<br /><span className="text-[hsl(var(--primary))]">for wonder.</span></h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[hsl(var(--foreground)/.78)] sm:text-xl">Future Minds Robotics is where high school mentors help grades 4–8 turn “what if?” into working code, clever machines, and the confidence to keep going.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#experience" className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-5 py-3.5 font-semibold text-[hsl(var(--card))] shadow-[4px_4px_0_hsl(var(--primary))] transition-transform hover:-translate-y-1" data-testid="link-hero-experience">See the experience <MoveRight size={18} className="transition-transform group-hover:translate-x-1" /></a>
                <button onClick={() => openModal('volunteer')} className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--foreground))] px-5 py-3 font-semibold transition-colors hover:bg-[hsl(var(--foreground)/.1)]" data-testid="button-hero-volunteer">Join the build <ArrowUpRight size={17} /></button>
              </div>
              <div className="mt-12 flex items-center gap-3 font-mono-custom text-[10px] tracking-[.08em] text-[hsl(var(--foreground)/.65)]"><span className="flex -space-x-2">{['M', 'A', 'J', 'K'].map((letter, index) => <span key={letter} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[hsl(var(--secondary))] text-xs font-bold ${index % 2 ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent))]'}`}>{letter}</span>)}</span><span>BUILT BY STUDENTS<br />FOR CURIOUS MINDS</span></div>
            </div>
            <RobotIllustration />
          </div>
          <div className="mt-10 border-y-2 border-[hsl(var(--foreground)/.15)] py-4">
            <div className="flex w-max animate-[marquee_24s_linear_infinite] gap-10 font-mono-custom text-[10px] tracking-[.16em] text-[hsl(var(--foreground)/.7)]"><span>BUILD · TEST · REPEAT</span><span>✦</span><span>ASK BETTER QUESTIONS</span><span>✦</span><span>BUILD · TEST · REPEAT</span><span>✦</span><span>ASK BETTER QUESTIONS</span><span>✦</span><span>BUILD · TEST · REPEAT</span></div>
          </div>
        </section>

        <section id="why" className="paper-grid relative py-24 sm:py-32" aria-labelledby="why-title">
          <div className="section-wrap grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <SectionHeading eyebrow="01 / The point" title={<>Confidence is a <span className="text-[hsl(var(--primary))]">buildable</span> skill.</>} body="We make the first step into STEM feel less like a test and more like an invitation. A student gets to be the person with the answer — then the person who helps someone else find theirs." />
            <div ref={storyRef} className="reveal grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] shadow-[6px_6px_0_hsl(var(--foreground))] sm:translate-y-10">
                <Lightbulb size={27} strokeWidth={1.7} />
                <p className="mt-16 font-display text-3xl font-bold leading-none tracking-[-.05em]">Curiosity<br />gets a kit.</p>
                <p className="mt-4 text-sm leading-relaxed opacity-80">Every session starts with a question worth chasing.</p>
              </div>
              <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] p-7 shadow-[6px_6px_0_hsl(var(--foreground))]">
                <UsersRound size={27} strokeWidth={1.7} />
                <p className="mt-16 font-display text-3xl font-bold leading-none tracking-[-.05em]">Peers<br />open doors.</p>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Our mentors remember what it felt like to start from zero.</p>
              </div>
              <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--accent))] p-7 shadow-[6px_6px_0_hsl(var(--foreground))] sm:col-span-2 sm:flex sm:items-end sm:justify-between">
                <div><Wrench size={27} strokeWidth={1.7} /><p className="mt-10 font-display text-3xl font-bold leading-none tracking-[-.05em]">A finished robot<br />is never the finish line.</p></div>
                <p className="mt-5 max-w-xs text-sm leading-relaxed sm:mt-0">The real win is learning how to notice, adapt, explain, and try again.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-[hsl(var(--foreground))] py-24 text-[hsl(var(--card))] sm:py-32" aria-labelledby="experience-title">
          <div className="section-wrap">
            <SectionHeading light eyebrow="02 / Inside the workshop" title={<>A little structure.<br /><span className="text-[hsl(var(--secondary))]">A lot of room.</span></>} body="Our FIRST LEGO League Challenge season is a hands-on loop of imagining, making, and sharing. There is a role for the builder, the storyteller, the debugger, and the student who is still deciding." />
            <div ref={experienceRef} className="reveal mt-16 grid gap-3 lg:grid-cols-12">
              {[
                { number: '01', icon: <BookOpen size={22} />, title: 'Find the question', text: 'Start with a real-world problem and a room full of “why?”', className: 'lg:col-span-4' },
                { number: '02', icon: <Code2 size={22} />, title: 'Make it move', text: 'Learn code, motors, sensors, and the joy of a first successful run.', className: 'lg:col-span-4 lg:mt-14' },
                { number: '03', icon: <MessageCircle size={22} />, title: 'Tell the story', text: 'Practice explaining a big idea so someone else can see it too.', className: 'lg:col-span-4 lg:mt-28' },
              ].map((item) => <article key={item.number} className={`group relative overflow-hidden rounded-[1.7rem] border border-[hsl(var(--card)/.2)] bg-[hsl(var(--card)/.07)] p-7 transition-transform hover:-translate-y-2 ${item.className}`}><div className="flex items-center justify-between text-[hsl(var(--secondary))]"><span className="font-mono-custom text-xs">{item.number} / 03</span>{item.icon}</div><div className="mt-24"><h3 className="font-display text-3xl font-bold tracking-[-.04em]">{item.title}</h3><p className="mt-3 leading-relaxed text-[hsl(var(--card)/.6)]">{item.text}</p></div><ChevronRight className="absolute bottom-7 right-7 opacity-0 transition-opacity group-hover:opacity-100" size={20} /></article>)}
            </div>
            <div className="mt-14 flex flex-col items-start justify-between gap-7 border-t border-[hsl(var(--card)/.18)] pt-7 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--card)/.6)]"><span className="font-mono-custom text-[hsl(var(--secondary))]">OUR PROMISE / </span>No prior coding experience needed. We bring the parts, the patience, and a place to start.</p>
              <button onClick={() => openModal('contact')} className="group inline-flex items-center gap-2 font-semibold text-[hsl(var(--secondary))]" data-testid="button-ask-question">Ask a question <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[hsl(var(--accent))] py-24 sm:py-32" aria-labelledby="photo-title">
          <div className="section-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div ref={teamRef} className="reveal relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] shadow-[8px_8px_0_hsl(var(--foreground))] lg:order-1">
              <img src={workshopImage} alt="Students collaborating around a competition robot in a workshop" className="h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] px-3 py-2 font-mono-custom text-[10px]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />SATURDAY, 10:42 AM</div>
              <button onClick={() => openModal('contact')} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--card))] transition-transform hover:scale-105" aria-label="Ask about visiting a workshop" data-testid="button-photo-contact"><Play size={17} fill="currentColor" /></button>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading eyebrow="03 / The feeling" title={<>The best part is the <span className="text-[hsl(var(--primary))]">middle.</span></>} body="Somewhere between the first wobbly prototype and the final high-five, a student realizes: I can figure things out. That moment belongs to everyone." />
              <div className="mt-10 grid grid-cols-2 gap-6 border-t-2 border-[hsl(var(--foreground)/.2)] pt-6">
                <div><p className="font-display text-4xl font-bold tracking-[-.06em]">4–8</p><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.1em]">Grades we teach</p></div>
                <div><p className="font-display text-4xl font-bold tracking-[-.06em]">62281</p><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.1em]">Our FLL team</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="paper-grid py-24 sm:py-32" aria-labelledby="team-title">
          <div className="section-wrap">
            <SectionHeading eyebrow="04 / Meet the makers" title={<>Team 62281 is<br /><span className="text-[hsl(var(--primary))]">still becoming.</span></>} body="We’re a crew of high school students who like hard problems, loud brainstorming, and making the table a little bigger for the next person." />
            <div className="mt-14 grid gap-5 md:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] p-7 shadow-[6px_6px_0_hsl(var(--foreground))] sm:p-10">
                 <div className="flex items-start justify-between"><Trophy size={28} /><span className="font-mono-custom text-[10px] tracking-[.14em]">FIRST LEGO LEAGUE / TEAM 62281</span></div>
                <p className="mt-24 max-w-lg font-display text-4xl font-bold leading-[.95] tracking-[-.06em] sm:text-6xl">We build<br />with the door open.</p>
                <div className="mt-10 flex items-center justify-between border-t border-[hsl(var(--foreground)/.2)] pt-5 text-sm"><span>Competition team</span><span className="font-mono-custom">TEAM 62281</span></div>
                 <div className="mt-7 border-t border-[hsl(var(--foreground)/.2)] pt-6">
                   <p className="font-mono-custom text-[10px] tracking-[.14em]">AWARDS / THREE SEASONS</p>
                   <div className="mt-4 grid gap-4 sm:grid-cols-3">
                     <div><p className="font-display text-2xl font-bold tracking-[-.05em]">2023</p><p className="mt-1 text-xs leading-snug">Engineering Excellence Award</p></div>
                     <div><p className="font-display text-2xl font-bold tracking-[-.05em]">2024</p><p className="mt-1 text-xs leading-snug">Breakthrough Award</p></div>
                     <div><p className="font-display text-2xl font-bold tracking-[-.05em]">2025</p><p className="mt-1 text-xs leading-snug">Judges Award</p></div>
                   </div>
                 </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
                <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] shadow-[6px_6px_0_hsl(var(--foreground))]"><Cpu size={27} /><p className="mt-12 font-display text-2xl font-bold tracking-[-.04em]">Engineering<br />is a team sport.</p><p className="mt-3 text-sm opacity-75">Different brains make better machines.</p></div>
                <div className="rounded-[1.7rem] border-2 border-[hsl(var(--foreground))] bg-[hsl(var(--card))] p-7 shadow-[6px_6px_0_hsl(var(--foreground))]"><ShieldCheck size={27} /><p className="mt-12 font-display text-2xl font-bold tracking-[-.04em]">Kindness<br />is a skill too.</p><p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">We notice who hasn’t spoken yet.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="get-involved" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--primary-foreground))] sm:py-32" aria-labelledby="involved-title">
          <div className="section-wrap">
            <div ref={supportRef} className="reveal grid items-end gap-12 lg:grid-cols-[1fr_.75fr]">
              <div><p className="eyebrow mb-5 text-[hsl(var(--secondary))]">05 / Make the circle bigger</p><h2 id="involved-title" className="font-display max-w-3xl text-balance text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl">There’s more than one way to join the build.</h2></div>
              <p className="max-w-md text-lg leading-relaxed opacity-80">The work gets better when families, educators, mentors, and neighbors bring their own kind of magic.</p>
            </div>
            <div className="mt-16 grid gap-4 md:grid-cols-3">
              <button onClick={() => openModal('volunteer')} className="group text-left rounded-[1.7rem] border-2 border-[hsl(var(--primary-foreground)/.3)] p-7 transition-colors hover:bg-[hsl(var(--primary-foreground)/.1)]" data-testid="button-involved-volunteer"><HeartHandshake size={27} /><h3 className="mt-20 font-display text-3xl font-bold tracking-[-.05em]">Volunteer</h3><p className="mt-3 text-sm leading-relaxed opacity-70">Share a skill, lend a hand, or help a young builder feel seen.</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))]">Start a conversation <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></button>
               <a href="https://hcb.hackclub.com/donations/start/futureminds-robotics" target="_blank" rel="noreferrer" className="group text-left rounded-[1.7rem] border-2 border-[hsl(var(--primary-foreground)/.3)] p-7 transition-colors hover:bg-[hsl(var(--primary-foreground)/.1)]" data-testid="link-involved-support"><Sparkles size={27} /><h3 className="mt-20 font-display text-3xl font-bold tracking-[-.05em]">Donate</h3><p className="mt-3 text-sm leading-relaxed opacity-70">Help us keep the kits stocked and the invitation wide open.</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))]">Support the team <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></a>
              <button onClick={() => openModal('contact')} className="group text-left rounded-[1.7rem] border-2 border-[hsl(var(--primary-foreground)/.3)] p-7 transition-colors hover:bg-[hsl(var(--primary-foreground)/.1)]" data-testid="button-involved-connect"><MessageCircle size={27} /><h3 className="mt-20 font-display text-3xl font-bold tracking-[-.05em]">Connect</h3><p className="mt-3 text-sm leading-relaxed opacity-70">Bring us to your school, club, library, or community table.</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))]">Say hello <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></button>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--secondary))] py-20 sm:py-28" aria-labelledby="closing-title">
          <div className="section-wrap text-center">
            <p className="eyebrow mb-6">One small question</p>
            <h2 id="closing-title" className="font-display mx-auto max-w-4xl text-balance text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl">What could you make<br />if someone said <span className="text-[hsl(var(--primary))]">try?</span></h2>
            <button onClick={() => openModal('contact')} className="mt-10 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-6 py-4 font-semibold text-[hsl(var(--card))] shadow-[5px_5px_0_hsl(var(--primary))] transition-transform hover:-translate-y-1" data-testid="button-closing-contact">Open a channel <Send size={17} /></button>
          </div>
        </section>
      </main>

      <footer className="bg-[hsl(var(--foreground))] py-10 text-[hsl(var(--card))]">
        <div className="section-wrap flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
           <div><Logo /><p className="mt-5 max-w-xs text-sm leading-relaxed text-[hsl(var(--card)/.55)]">A student-led nonprofit making space for curious minds, one robot at a time.</p></div>
           <div className="flex flex-col items-start gap-5 sm:items-end">
             <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[hsl(var(--card)/.7)]"><a href="#why" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-why">Why it matters</a><a href="#experience" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-experience">Experience</a><a href="#team" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-team">Team 62281</a><a href="https://hcb.hackclub.com/donations/start/futureminds-robotics" target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-donate">Donate</a><button onClick={() => openModal('contact')} className="hover:text-[hsl(var(--secondary))]" data-testid="button-footer-contact">Contact</button></div>
             <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[hsl(var(--card)/.55)]"><a href="mailto:hzaanoun23@gmail.com" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-email">hzaanoun23@gmail.com</a><a href="tel:+16403576683" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-phone">+1 640 357 6683</a></div>
           </div>
        </div>
        <div className="section-wrap mt-10 flex flex-col justify-between gap-2 border-t border-[hsl(var(--card)/.15)] pt-5 font-mono-custom text-[9px] tracking-[.12em] text-[hsl(var(--card)/.4)] sm:flex-row"><span>© 2025 FUTURE MINDS ROBOTICS</span><span>BUILT WITH CURIOSITY / TEAM 62281</span></div>
      </footer>
      {modal && <ContactModal kind={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
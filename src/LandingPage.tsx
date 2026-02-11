import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  Code2,
  ArrowRight,
  Send,
  Menu,
  X,
  Brain,
  Layers,
  RefreshCw,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SlackLogo,
  GitHubLogo,
  NotionLogo,
  JiraLogo,
  ZapierLogo,
  SalesforceLogo,
  VercelLogo,
  LinearLogo,
  ResendLogo,
  SupabaseLogo,
  PlanetScaleLogo,
  RailwayLogo,
} from "@/components/BrandLogos";
import { Link } from "react-router";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook (React 19 compiler-safe)                        */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const setNodeRef = useCallback(
    (node: T | null) => {
      if (observerInstance.current) {
        observerInstance.current.disconnect();
        observerInstance.current = null;
      }
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        },
        { threshold }
      );
      observer.observe(node);
      observerInstance.current = observer;
    },
    [threshold]
  );

  return [setNodeRef, isVisible] as const;
}

/* ------------------------------------------------------------------ */
/*  Streaming text animation hook                                      */
/* ------------------------------------------------------------------ */

function useStreamingText(
  text: string,
  speed = 24,
  startDelay = 600,
  enabled = true
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed("");
    setDone(false);

    let intervalId: ReturnType<typeof setInterval>;
    const delayTimer = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const conversation = [
  {
    role: "user" as const,
    text: "Summarize the key takeaways from yesterday's product sync",
  },
  {
    role: "ai" as const,
    text: "Here are the 3 key takeaways from yesterday\u2019s product sync:\n\n1. Launch timeline moved to March 15 \u2014 engineering confirmed the API layer is ready.\n2. Design team will deliver the updated onboarding flow by Friday.\n3. Support flagged 12 tickets related to SSO \u2014 prioritized for next sprint.\n\nWould you like me to create follow-up tasks for each item?",
  },
];

const features = [
  {
    icon: Brain,
    title: "Contextual Understanding",
    description:
      "Maintains conversation context across sessions. Understands nuance, intent, and follow-ups naturally.",
  },
  {
    icon: Zap,
    title: "Real-time Streaming",
    description:
      "Responses stream token-by-token with sub-100ms latency. No waiting for complete generation.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade Security",
    description:
      "SOC 2 Type II certified. End-to-end encryption, data residency controls, and zero retention policy.",
  },
  {
    icon: Layers,
    title: "Multi-model Routing",
    description:
      "Automatically routes queries to the optimal model \u2014 fast models for simple tasks, powerful ones for complex reasoning.",
  },
  {
    icon: Code2,
    title: "Developer-first API",
    description:
      "RESTful & WebSocket APIs with SDKs for Python, TypeScript, Go, and Rust. Deploy in minutes.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description:
      "Fine-tune on your data with RLHF. The model improves with every interaction across your organization.",
  },
];

/* integrations & trustedBy data */

const integrations = [
  { name: "Slack", logo: SlackLogo, color: "#4A154B" },
  { name: "GitHub", logo: GitHubLogo, color: "#181717" },
  { name: "Notion", logo: NotionLogo, color: "#000000" },
  { name: "Jira", logo: JiraLogo, color: "#0052CC" },
  { name: "Zapier", logo: ZapierLogo, color: "#FF4F00" },
  { name: "Salesforce", logo: SalesforceLogo, color: "#00A1E0" },
];

const trustedBy = [
  { name: "Vercel", logo: VercelLogo, color: "#000000" },
  { name: "Linear", logo: LinearLogo, color: "#5E6AD2" },
  { name: "Resend", logo: ResendLogo, color: "#000000" },
  { name: "Supabase", logo: SupabaseLogo, color: "#3FCF8E" },
  { name: "PlanetScale", logo: PlanetScaleLogo, color: "#000000" },
  { name: "Railway", logo: RailwayLogo, color: "#0B0D0E" },
];

/* ------------------------------------------------------------------ */
/*  Streaming Chat Preview Component                                   */
/* ------------------------------------------------------------------ */

function ChatPreview() {
  const [phase, setPhase] = useState<"typing" | "streaming" | "done">(
    "typing"
  );

  const aiResponse = useStreamingText(conversation[1].text, 18, 1800, true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("streaming"), 1800);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (aiResponse.done) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
    }
  }, [aiResponse.done]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/50">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-neutral-100 bg-neutral-50 px-5 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-neutral-300" />
            <div className="size-3 rounded-full bg-neutral-300" />
            <div className="size-3 rounded-full bg-neutral-300" />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <Bot className="size-4 text-violet-500" />
            ChatFlow AI
          </div>
        </div>

        {/* Messages */}
        <div className="flex min-h-[340px] flex-col gap-4 p-5 sm:p-6">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
              {conversation[0].text}
            </div>
          </div>

          {/* AI response */}
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3 text-sm leading-relaxed text-neutral-700">
              {phase === "typing" && (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:0ms]" />
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:150ms]" />
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]" />
                </span>
              )}
              {phase !== "typing" && (
                <span className="whitespace-pre-wrap">
                  {aiResponse.displayed}
                  {!aiResponse.done && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-violet-500" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5">
            <span className="flex-1 text-sm text-neutral-400">
              Ask anything...
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700">
              <Send className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Landing Page                                                  */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [heroRef, heroVisible] = useInView<HTMLElement>();
  const [featuresRef, featuresVisible] = useInView<HTMLElement>();
  const [integrationsRef, integrationsVisible] = useInView<HTMLElement>();
  const [pricingRef, pricingVisible] = useInView<HTMLElement>();
  const [faqsRef, faqsVisible] = useInView<HTMLElement>();
  const [ctaRef, ctaVisible] = useInView<HTMLElement>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FAF5FF] text-[#1E1B4B] antialiased">
      {/* ---- Navbar ---- */}
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl border border-neutral-200/60 bg-white/80 shadow-sm shadow-neutral-200/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-3">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600">
              <Bot className="size-5 text-white" />
            </div>
            <span className="text-neutral-900">
              Chat<span className="text-violet-600">Flow</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Integrations", "Pricing", "FAQs"].map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase()}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-neutral-600 hover:text-neutral-900"
            >
              Sign in
            </Button>
              </Link>
            <Button
              size="sm"
              className="cursor-pointer rounded-lg bg-violet-600 px-4 text-white shadow-sm shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-md hover:shadow-violet-200"
            >
              Try Now
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="text-neutral-500 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-neutral-100 bg-white/95 px-5 pb-6 pt-4 md:hidden rounded-b-2xl">
            <div className="flex flex-col gap-3">
              {["Features", "Integrations", "Pricing", "FAQs"].map((link) => (
                <a
                  key={link}
                  href={"#" + link.toLowerCase()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  {link}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                  <Link to="/login">
                <Button variant="outline" className="w-full cursor-pointer">
                  Sign in
                </Button>
                  </Link>
                <Button className="w-full cursor-pointer rounded-lg bg-violet-600 text-white hover:bg-violet-700">
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ---- Hero ---- */}
      <header
        id="hero"
        ref={heroRef}
        className={
          "relative flex flex-col items-center px-4 pt-32 pb-16 sm:pt-40 sm:pb-24 transition-all duration-1000 " +
          (heroVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0")
        }
      >
        {/* Subtle gradient bg */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/60 blur-[100px]" />
          <div className="absolute top-20 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-100/40 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm shadow-violet-100">
            <Sparkles className="size-4" />
            Now with GPT-4o &amp; Claude 4 support
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#1E1B4B] sm:text-5xl lg:text-6xl">
            AI that actually{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              understands
            </span>{" "}
            your work
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-500">
            ChatFlow is the conversational AI platform built for teams. Ask
            questions, automate workflows, and get instant answers — all in one
            place.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-violet-200/60 transition-all hover:from-violet-700 hover:to-purple-700 hover:shadow-xl hover:shadow-violet-300/50"
            >
              Try Now — It's Free
              <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer rounded-xl border-neutral-200 px-8 py-6 text-base font-semibold text-neutral-600 transition-all hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
            >
              View Documentation
            </Button>
          </div>

          <p className="mt-4 text-xs text-neutral-400">
            No credit card required · 10k free tokens · Setup in 30 seconds
          </p>
        </div>

        {/* Chat Preview */}
        <div className="relative z-10 mt-14 w-full max-w-2xl px-4">
          <ChatPreview />
        </div>
      </header>

      {/* ---- Features ---- */}
      <section
        id="features"
        ref={featuresRef}
        className={
          "relative py-20 sm:py-28 transition-all duration-1000 " +
          (featuresVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0")
        }
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for serious AI workflows
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              Everything you need to deploy conversational AI at scale, with
              enterprise controls from day one.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative cursor-pointer rounded-2xl border border-neutral-100 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-violet-50 p-2.5 text-violet-600 transition-colors group-hover:bg-violet-100">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Integrations ---- */}
      <section
        id="integrations"
        ref={integrationsRef}
        className={
          "relative border-y border-neutral-100 bg-white/60 py-20 sm:py-24 transition-all duration-1000 " +
          (integrationsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0")
        }
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              Integrations
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Connects to your stack
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              Plug ChatFlow into the tools your team already uses. One API call
              and you're live.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {integrations.map((integration) => {
              const Logo = integration.logo;
              return (
                <div
                  key={integration.name}
                  className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50"
                >
                  <div className="relative flex size-12 items-center justify-center rounded-xl bg-neutral-50 transition-colors duration-200 group-hover:bg-white">
                    <Logo
                      className="size-7 text-neutral-400 transition-all duration-200 group-hover:opacity-0"
                      aria-hidden
                    />
                    <Logo
                      className="absolute size-7 opacity-0 transition-all duration-200 group-hover:opacity-100"
                      style={{ color: integration.color }}
                      aria-hidden
                    />
                  </div>
                  <span className="text-sm font-semibold text-neutral-500 transition-colors duration-200 group-hover:text-neutral-900">
                    {integration.name}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-400">
            + 50 more integrations available via API &amp; webhooks
          </p>
        </div>
      </section>

      {/* ---- Social proof strip ---- */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Trusted by forward-thinking teams
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trustedBy.map((company) => {
              const Logo = company.logo;
              return (
                <div
                  key={company.name}
                  className="group relative flex cursor-pointer items-center gap-2.5 transition-all duration-200"
                  title={company.name}
                >
                  <Logo
                    className="h-5 w-auto text-neutral-300 transition-colors duration-200 group-hover:text-transparent"
                    aria-hidden
                  />
                  <Logo
                    className="absolute left-0 h-5 w-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: company.color }}
                    aria-hidden
                  />
                  <span className="text-sm font-bold tracking-tight text-neutral-300 transition-colors duration-200 group-hover:text-neutral-700">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section className="border-y border-neutral-100 bg-white/60 py-14 sm:py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {[
            { value: "10M+", label: "Messages processed daily" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "<80ms", label: "Avg. first-token latency" },
            { value: "2,400+", label: "Teams using ChatFlow" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-violet-600 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Pricing ---- */}
      <section
        id="pricing"
        ref={pricingRef}
        className={
          "relative py-20 sm:py-28 transition-all duration-1000 " +
          (pricingVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0")
        }
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {/* Free */}
            <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-200 hover:shadow-lg hover:shadow-violet-50">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Free</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-900">$0</span>
                <span className="text-sm text-neutral-500">/month</span>
              </div>
              <p className="mt-3 text-sm text-neutral-500">Perfect for trying out ChatFlow and personal projects.</p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "10,000 tokens per month",
                  "1 workspace",
                  "GPT-4o mini access",
                  "Community support",
                  "Basic analytics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer rounded-xl border-neutral-200 py-5 text-sm font-semibold transition-all hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
                >
                  Get Started Free
                </Button>
              </div>
            </div>

            {/* Pro — highlighted */}
            <div className="relative flex flex-col rounded-2xl border-2 border-violet-500 bg-white p-8 shadow-xl shadow-violet-100/40">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-bold text-white">
                Most Popular
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">Pro</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-900">$29</span>
                <span className="text-sm text-neutral-500">/month</span>
              </div>
              <p className="mt-3 text-sm text-neutral-500">For growing teams that need more power and flexibility.</p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "500,000 tokens per month",
                  "Unlimited workspaces",
                  "GPT-4o & Claude 4 access",
                  "Priority support",
                  "Advanced analytics",
                  "Custom integrations",
                  "Team collaboration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-5 text-sm font-semibold text-white shadow-md shadow-violet-200/60 transition-all hover:from-violet-700 hover:to-purple-700 hover:shadow-lg hover:shadow-violet-300/50">
                  Start Free Trial
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-200 hover:shadow-lg hover:shadow-violet-50">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Enterprise</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-900">Custom</span>
              </div>
              <p className="mt-3 text-sm text-neutral-500">For organizations that need enterprise-grade controls.</p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "Unlimited tokens",
                  "Unlimited workspaces",
                  "All model access + fine-tuning",
                  "Dedicated support & SLA",
                  "SSO & SCIM provisioning",
                  "Data residency controls",
                  "Custom model deployment",
                  "Audit logs & compliance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer rounded-xl border-neutral-200 py-5 text-sm font-semibold transition-all hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQs ---- */}
      <section
        id="faqs"
        ref={faqsRef}
        className={
          "relative border-y border-neutral-100 bg-white/60 py-20 sm:py-28 transition-all duration-1000 " +
          (faqsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0")
        }
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              FAQs
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              Everything you need to know about ChatFlow.
            </p>
          </div>

          <div className="mt-12 flex flex-col divide-y divide-neutral-200">
            {[
              {
                q: "What models does ChatFlow support?",
                a: "ChatFlow supports GPT-4o, GPT-4o mini, Claude 4, and Claude 3.5 Sonnet out of the box. Enterprise plans can also bring their own fine-tuned models or deploy custom models via our API.",
              },
              {
                q: "How does the token-based pricing work?",
                a: "Tokens are the basic unit of text processing. On average, 1 token \u2248 4 characters of English text. Both input and output tokens count toward your usage. Unused tokens do not roll over to the next month.",
              },
              {
                q: "Can I use ChatFlow with my existing tools?",
                a: "Yes! ChatFlow integrates with Slack, GitHub, Notion, Jira, Zapier, Salesforce, and 50+ other tools via our REST API, WebSocket API, and native webhooks. Setup typically takes under 5 minutes.",
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. ChatFlow is SOC 2 Type II certified with end-to-end encryption, zero data retention by default, and optional data residency controls. Enterprise plans include SSO, SCIM, and audit logs.",
              },
              {
                q: "What happens if I exceed my token limit?",
                a: "On the Free plan, you\u2019ll be notified and can upgrade anytime. On Pro, you can purchase additional token packs at $10 per 100k tokens. Enterprise plans have unlimited tokens.",
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes! The Free plan is free forever with 10,000 tokens per month. The Pro plan includes a 14-day free trial with full access to all features \u2014 no credit card required.",
              },
            ].map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base font-semibold text-neutral-900">{faq.q}</span>
                  <ChevronDown
                    className={
                      "size-5 shrink-0 text-neutral-400 transition-transform duration-200 " +
                      (openFaq === i ? "rotate-180" : "")
                    }
                  />
                </button>
                <div
                  className={
                    "grid transition-all duration-200 " +
                    (openFaq === i
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-neutral-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section
        ref={ctaRef}
        className={
          "relative py-24 sm:py-32 transition-all duration-1000 " +
          (ctaVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0")
        }
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/50 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-violet-200/60 bg-gradient-to-b from-violet-50 to-white p-10 shadow-xl shadow-violet-100/40 sm:p-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
              <Zap className="size-4" />
              10,000 free tokens to start
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start building with ChatFlow today
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-neutral-500">
              Deploy your first AI assistant in under a minute. No
              infrastructure to manage, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-10 py-6 text-base font-semibold text-white shadow-lg shadow-violet-200/60 transition-all hover:from-violet-700 hover:to-purple-700 hover:shadow-xl hover:shadow-violet-300/50"
              >
                Try Now — Free
                <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer rounded-xl border-neutral-200 px-8 py-6 text-base font-semibold text-neutral-600 transition-all hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-neutral-200/60 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a
              href="#"
              className="flex items-center gap-2 text-base font-bold"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-violet-600">
                <Bot className="size-4 text-white" />
              </div>
              <span className="text-neutral-900">
                Chat<span className="text-violet-600">Flow</span>
              </span>
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy", "Terms", "Security", "Status", "Blog", "Docs"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="cursor-pointer text-sm text-neutral-400 transition-colors duration-200 hover:text-violet-600"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} ChatFlow
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

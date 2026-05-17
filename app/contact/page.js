import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

export const metadata = {
  title: "Contact Us | DetectFaceShape.shop",
  description:
    "Have questions or need assistance? Contact the DetectFaceShape team for support, inquiries, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden select-none pb-12">
      {/* High tech technical grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />

      {/* Radiant ambient glow */}
      <div className="absolute top-[-10%] left-[5%] w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200/60 dark:border-slate-900/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <span className="font-bold font-mono tracking-wider text-sm uppercase text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
            DetectFaceShape<span className="text-blue-400">.shop</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <section className="z-10 flex-grow flex flex-col items-center px-6 py-12 sm:py-20 max-w-3xl mx-auto w-full">
        
        {/* Title Content */}
        <div className="space-y-4 text-center w-full mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider font-mono text-blue-500 dark:text-blue-400 uppercase shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Support & Inquiries
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help! Reach out to our team at DetectFaceShape and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Content Body */}
        <div className="w-full space-y-10">
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Get In Touch</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you have questions about our AI-powered face shape detection tool, need technical support, or want to provide feedback, we'd love to hear from you. Our team is committed to providing you with the best experience possible.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-slate-900/50 border-l-4 border-blue-500 rounded-r-xl p-6 shadow-sm border border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              For general inquiries, technical support, or partnership opportunities, please contact us directly via email:
            </p>
            <a href="mailto:rtanmay588@gmail.com" className="inline-flex items-center gap-2 text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              rtanmay588@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Response Time</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please mention 'URGENT' in your email subject line.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">What We Can Help With</h3>
              <ul className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
                <li>Technical support and troubleshooting</li>
                <li>Questions about face shape analysis</li>
                <li>Feature requests and suggestions</li>
                <li>Privacy and security concerns</li>
                <li>Partnership and collaboration</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="z-10 mt-auto border-t border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} DetectFaceShape.shop — All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-blue-500 transition-colors font-mono uppercase tracking-wider">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

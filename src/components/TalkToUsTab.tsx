import React, { useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  RefreshCw, 
  Send, 
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export const TalkToUsTab: React.FC = () => {
  const PAGE_URL = 'https://ascentjobs.app/talk-to-us';
  const PAGE_IDENTIFIER = 'ascentjobs-talk-to-us';

  const reloadDisqus = () => {
    if (typeof (window as any).DISQUS !== 'undefined') {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page.url = PAGE_URL;
            this.page.identifier = PAGE_IDENTIFIER;
            this.page.title = 'AscentJobs - Talk to Us';
          },
        });
      } catch (err) {
        console.warn('Disqus reset notice:', err);
      }
    }
  };

  useEffect(() => {
    // 1. Configure the global disqus_config with real fixed values
    (window as any).disqus_config = function (this: any) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
      this.page.title = 'AscentJobs - Talk to Us';
    };

    // 2. Check if DISQUS object is already loaded in window
    if (typeof (window as any).DISQUS !== 'undefined') {
      // Reload the thread in this newly mounted DOM container
      reloadDisqus();
    } else {
      // Check if embed.js script has already been added to DOM
      const existingScript = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
      if (!existingScript) {
        const d = document;
        const s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://keith-poh.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        (d.head || d.body).appendChild(s);
      } else {
        // Script tag was added, listen for load in case it was in-flight
        existingScript.addEventListener('load', reloadDisqus);
        return () => {
          existingScript.removeEventListener('load', reloadDisqus);
        };
      }
    }

    // 3. Ensure count script is also loaded
    if (!document.getElementById('dsq-count-scr')) {
      const cs = document.createElement('script');
      cs.id = 'dsq-count-scr';
      cs.src = '//keith-poh.disqus.com/count.js';
      cs.async = true;
      (document.head || document.body).appendChild(cs);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0952c4] text-xs font-bold border border-blue-100">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Community & Feedback Channel
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              Talk to Us
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              We love hearing from candidates, hiring leaders, and engineers using AscentJobs. Share your feedback on our CV matching algorithm, report an issue, request new platform capabilities, or ask our career intelligence team anything.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reloadDisqus}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              title="Refresh discussion comments"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Refresh Thread
            </button>
          </div>
        </div>

        {/* Support & Discussion Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
              <Sparkles className="w-4 h-4 text-[#0952c4]" />
              <span>Matching Feedback</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Tell us how accurately our AI evaluated your CV and JD requirements or suggest new skills to track.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Feature Requests</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Request new job alert sources, additional cloud drive integrations, or certification roadmaps.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Career Advice</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Connect with fellow candidates negotiating executive compensation packages and technical leadership roles.
            </p>
          </div>
        </div>
      </div>

      {/* Disqus Embed Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0952c4]" />
              Community Discussion & Comments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Powered by Disqus. Leave a message, share your experience, or reply to community threads.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Moderated Forum
          </span>
        </div>

        {/* The Disqus container */}
        <div id="disqus_thread" className="min-h-[360px]" />

        {/* Fallback for noscript as required */}
        <noscript>
          Please enable JavaScript to view the{' '}
          <a 
            href="https://disqus.com/?ref_noscript" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#0952c4] underline"
          >
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </div>
  );
};

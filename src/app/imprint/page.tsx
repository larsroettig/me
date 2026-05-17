import type { Metadata } from "next";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal information and imprint for larsroettig.me",
};

export default function ImprintPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1
        className="text-3xl font-bold mb-10 font-mono tracking-widest uppercase"
        style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
      >
        Imprint
      </h1>

      <div className="prose-cyberpunk space-y-8 font-mono text-sm" style={{ color: "#c0c0d8" }}>
        <section>
          <h2>Legal Notice</h2>
          <p>Information according to § 5 TMG:</p>
          {/* TODO: verify current address before deploying */}
          <address className="not-italic leading-7" style={{ color: "#e0e0f0" }}>
            Lars Röttig<br />
            Pfälzerstraße 18<br />
            83109 Großkarolinenfeld<br />
            Germany
          </address>
          <p className="mt-4">
            Email:{" "}
            <ObfuscatedEmail encoded="bGFyc3JvZXR0aWdAbWFpbGJveC5vcmc=" />
          </p>
        </section>

        <section>
          <h2>Responsible for content according to § 55 para. 2 RStV</h2>
          {/* TODO: verify current address before deploying */}
          <address className="not-italic leading-7" style={{ color: "#e0e0f0" }}>
            Lars Röttig<br />
            Pfälzerstraße 18<br />
            83109 Großkarolinenfeld<br />
            Germany
          </address>
        </section>

        <section>
          <h2>Disclaimer</h2>

          <h3 style={{ color: "#00f5ff", marginTop: "1.25rem" }}>Liability for content</h3>
          <p>
            According to § 7 para. 1 TMG we are responsible for the content of these pages under
            general law. According to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or
            stored third-party information or to investigate circumstances indicating illegal
            activity. Obligations to remove or block the use of information under general law remain
            unaffected. Liability may be assumed only from the date of knowledge of a concrete
            violation. Upon notification of such violations, we will remove the content immediately.
          </p>

          <h3 style={{ color: "#00f5ff", marginTop: "1.25rem" }}>Liability for links</h3>
          <p>
            This website contains links to external websites over which we have no control. We
            cannot provide any guarantee regarding such external content. The operator of each
            linked site is responsible for its own content. Linked sites were checked at the time
            of linking for potential legal violations; no illegal content was identified. Permanent
            monitoring of linked pages is unreasonable without concrete evidence of a violation.
            Upon notification of violations, we will remove such links immediately.
          </p>

          <h3 style={{ color: "#00f5ff", marginTop: "1.25rem" }}>Copyright</h3>
          <p>
            Content and works published on these pages by the service provider are subject to
            German copyright law. Duplication, editing, distribution, and any exploitation outside
            the limits of copyright law require the written consent of the respective author.
            Downloads and copies are permitted for private, non-commercial use only. Where content
            was not created by the website operator, third-party copyrights are observed.
            If you become aware of any copyright infringement, please contact us. Upon
            notification we will remove the content immediately.
          </p>
        </section>

        <section>
          <h2>Online Dispute Resolution</h2>
          <p>
            The European Commission provides an online platform for dispute resolution at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff00ff" }}
            >
              ec.europa.eu/consumers/odr
            </a>
            . We are neither legally obliged nor voluntarily willing to participate in dispute
            settlement proceedings.
          </p>
        </section>
      </div>
    </div>
  );
}

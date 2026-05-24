import type { Metadata } from "next";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: "Privacy statement for larsroettig.me",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1
        className="text-3xl font-bold mb-10 font-mono tracking-widest uppercase"
        style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
      >
        Privacy Statement
      </h1>

      <div className="prose-cyberpunk space-y-8 font-mono text-sm" style={{ color: "#c0c0d8" }}>
        <section>
          <h2>Responsible Party</h2>
          {/* TODO: verify current address before deploying */}
          <address className="not-italic leading-7" style={{ color: "#e0e0f0" }}>
            Lars Röttig<br />
            Pfälzerstraße 18<br />
            83109 Großkarolinenfeld<br />
            Germany<br />
            Email:{" "}
            <ObfuscatedEmail encoded="bGFyc3JvZXR0aWdAbWFpbGJveC5vcmc=" />
          </address>
        </section>

        <section>
          <h2>Privacy Protection</h2>
          <p>
            The use of this website is possible without providing any personal data. Where personal
            data (such as name, address, or email address) are collected, this is always on a
            voluntary basis. These data will not be passed on to third parties without your
            explicit consent.
          </p>
          <p>
            Data transmission over the internet may have security flaws. Complete protection of
            data against third-party access is not possible.
          </p>
          <p>
            The use of contact data published within the scope of the imprint obligation by third
            parties for sending unsolicited advertising is expressly prohibited. Legal action will
            be taken in case of such violations.
          </p>
        </section>

        <section>
          <h2>SSL / TLS Encryption</h2>
          <p>
            This site uses SSL/TLS encryption for the transmission of confidential information. You
            can recognize an encrypted connection by the &ldquo;https://&rdquo; in the URL and
            the lock icon in your browser&apos;s address bar.
          </p>
        </section>

        <section>
          <h2>Server Log Files</h2>
          <p>
            The hosting provider automatically collects and stores information in server log files
            that your browser transmits automatically. These include:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referrer URL</li>
            <li>Requested URL</li>
            <li>Size of the server response</li>
            <li>IP address of the requesting computer</li>
            <li>Time of the server request</li>
          </ul>
          <p>
            These data are not attributed directly to individuals. Combination with other data
            sources is not performed. We reserve the right to review these data if specific
            indications of illegal usage arise.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            This site may use cookies to make the service more user-friendly and effective. Cookies
            are small text files stored on your device by your browser. Session cookies are deleted
            automatically at the end of your visit. You may configure your browser to inform you
            about cookies, to permit cookies only in individual cases, or to refuse cookies
            generally. Disabling cookies may limit certain features of this site.
          </p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>
            This site uses Vercel Analytics to measure page views and understand how visitors use
            the site. Vercel Analytics does not use cookies, does not track individuals across
            sites, and does not store personally identifiable information. The data collected
            includes page URL, referrer, browser type, operating system, and country derived from
            the anonymised IP address. IP addresses are not stored.
          </p>
          <p>
            Data is processed by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. The
            legal basis is our legitimate interest in understanding aggregate site usage (Art. 6(1)(f)
            GDPR). For details, see{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff00ff" }}
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Right of Complaint</h2>
          <p>
            In case of data protection questions, you have the right to lodge a complaint with the
            competent supervisory authority. A list of data protection officers and their contact
            details is available at{" "}
            <a
              href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff00ff" }}
            >
              bfdi.bund.de
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

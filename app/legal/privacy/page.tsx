import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sting",
  description: "How Sting collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://sting.delivery/legal/privacy",
  },
};

const ACCENT = "bg-primary";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className={`size-1.5 rounded-full shrink-0 ${ACCENT}`} />
        <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">{title}</h2>
      </div>
      <div className="pl-4 border-l-2 border-border flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-2 size-1 rounded-full bg-border shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <div className="w-full px-6 py-16 min-h-dvh">
      <div className="mx-auto max-w-3xl flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Legal</p>
          <h1 className="text-2xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: 25 October 2026</p>
        </div>

        <Section title="Overview">
          <P>
            Sting (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates Sting Wallet, a closed-loop
            payment system, and an on-demand delivery app for alcohol, cold drinks, mixers, and ice in South
            Africa. This policy explains what personal information we collect from you as a customer, why we
            collect it, and how we use and protect it. By using Sting you agree to the practices described
            here.
          </P>
          <P>
            People who deliver orders (&ldquo;Runners&rdquo;) use a separate application at
            runners.sting.delivery, governed by its own privacy policy. Sting shares its underlying account
            system and database with that Runner application, so if you also deliver as a runner, both roles
            are linked to the same underlying account.
          </P>
        </Section>

        <Section title="Information we collect">
          <P>We collect the following categories of information as part of your account and your use of the app:</P>
          <UL items={[
            "Account information — your name, email address, and phone number, managed via Clerk at sign-up, plus an optional backup contact number.",
            "Age and demographic information — your age group and, if you choose to provide it, your gender, used to confirm you meet the minimum age for alcohol and to tailor your experience.",
            "Identity verification (optional) — if you choose to verify a South African ID number during sign-up, we send it to a third-party verification service to confirm it is structurally valid and decode your date of birth, gender, and citizenship from it. We do not store the ID number itself: we keep only a one-way cryptographic hash of it (which cannot be reversed back into the original number) and the decoded details above. This step can always be skipped.",
            "Delivery address and location — the address you save for delivery, its GPS coordinates, and, if you grant permission, your device's current location to help prefill or confirm that address.",
            "Order and cart information — the products you order, order status, delivery timing, and any backup items or substitutions for an order.",
            "Payment and wallet information — records of payments, refunds, Sting Wallet top-ups, balance, and contributions to a shared cart. Sting Wallet is closed-loop: it has no cash-out or withdrawal path, so a balance can only move between your own orders and shared carts you take part in, never to an arbitrary recipient. We do not store your full card or bank account details; those are handled directly by our payment gateway providers.",
            "Contacts (optional) — if you grant contacts permission, we check which of your phone contacts already have a Sting account, so you can invite them; we do not store your full contact list beyond this matching step.",
            "Communications — messages you send in order chat with your runner, messages in support chat, and push notification delivery tokens.",
            "Usage and device information — basic technical and analytics data about how you use the app, to help us fix issues and improve the service.",
          ]} />
        </Section>

        <Section title="How we use your information">
          <UL items={[
            "To create and manage your account, and to let you place, track, and pay for orders.",
            "To confirm you meet the minimum age to order alcohol, and to verify your identity if you choose to complete the optional ID-verification step.",
            "To calculate delivery fees, match you with a nearby partner store, and route your order to a runner.",
            "To process payments and refunds, and to operate Sting Wallet, including shared-cart contributions and cashback.",
            "To send you order updates, receipts, and service notifications, by push notification and in-app.",
            "To operate the referral programme and shared-cart group ordering.",
            "To provide customer support through in-app chat.",
            "To comply with South African consumer protection and alcohol-sale laws.",
            "To maintain the security and integrity of the platform, and to detect and prevent fraud.",
          ]} />
        </Section>

        <Section title="Age-restricted goods and identity verification">
          <P>
            Because Sting delivers alcohol, every customer confirms they are 18 or older before placing an
            order. Separately, your delivery runner checks a physical identification document in person when
            handing over your order — this in-person check happens regardless of anything else in this
            section, and is the primary safeguard against under-age delivery.
          </P>
          <P>
            The optional ID-verification step described above exists purely to speed up and strengthen that
            confirmation ahead of time; it never replaces the runner&rsquo;s in-person check, and you are
            never required to complete it to place an order.
          </P>
        </Section>

        <Section title="Third-party services and international transfers">
          <P>We rely on the following third parties to operate the app:</P>
          <UL items={[
            "Clerk — authentication and identity management. Your login credentials are managed entirely by Clerk.",
            "Convex — the database and file storage where your account, orders, and app data are stored. This is the same Convex deployment used by the Sting Runner application.",
            "Google Maps/Places — address search, autocomplete, and location lookup.",
            "Paystack and Stitch — payment processing for orders and Sting Wallet top-ups.",
            "saidchecker.co.za — structural validation of a South African ID number, used only if you complete the optional ID-verification step; we do not share your name, address, or any other personal data with this service, and it never receives more than the ID number itself.",
            "OpenAI — used to generate short, personalised thank-you and fun-fact messages after a delivery (for example, referencing your first name and what was in your order). These messages are generated per order and are not used to train any model.",
            "Vercel — hosting and edge delivery of the app and this website.",
          ]} />
          <P>
            Some of these providers operate infrastructure outside South Africa. Regardless of where their
            infrastructure is located, we take reasonable steps to ensure your information is protected to a
            standard consistent with South African data protection law, and we do not permit these providers
            to use your information for any purpose other than operating the platform on our behalf.
          </P>
        </Section>

        <Section title="Data retention">
          <P>
            We retain your account, order, and wallet information for as long as you have an active account.
            Records we need to demonstrate regulatory compliance, resolve disputes, or prevent fraud — such as
            payment records and the identity-verification hash described above — may be retained for longer
            where legally required. If you ask us to delete your account, we delete or anonymise your personal
            information within 30 days, except where retention is legally required.
          </P>
        </Section>

        <Section title="Your rights">
          <P>
            Sting operates in South Africa, so your rights are primarily governed by the Protection of
            Personal Information Act (POPIA). Depending on your circumstances, you may:
          </P>
          <UL items={[
            "Request a copy of the personal information we hold about you.",
            "Ask us to correct inaccurate or incomplete information.",
            "Ask us to delete your account and associated personal data, subject to information we must keep for legal or regulatory reasons.",
            "Object to or ask us to restrict certain processing.",
            "Withdraw consent you've given us, where processing relies on consent — such as the optional ID-verification step or contacts permission — without affecting processing that already took place.",
          ]} />
          <P>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:legal@sting.delivery" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              legal@sting.delivery
            </a>
            . We will respond within 30 days.
          </P>
        </Section>

        <Section title="Eligibility and minors">
          <P>
            Sting is not intended for anyone under 18. We do not knowingly collect personal information from
            minors. If you believe we may have collected information from a minor, contact us at{" "}
            <a href="mailto:legal@sting.delivery" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              legal@sting.delivery
            </a>
            {" "}and we will investigate and delete it promptly where appropriate.
          </P>
        </Section>

        <Section title="Cookies and tracking">
          <P>
            Sting uses cookies and similar technologies strictly for authentication session management and
            platform functionality. We do not use third-party advertising cookies or sell your data to
            advertisers.
          </P>
        </Section>

        <Section title="Security">
          <P>
            We implement reasonable technical and organisational measures to protect your personal
            information — including never storing a raw identification number, only a one-way hash of it — and
            to protect your account and payment information against unauthorised access, alteration,
            disclosure, or destruction. However, no system is completely secure and we cannot guarantee
            absolute security.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            We may update this policy from time to time. When we do, we will update the effective date at the
            top of this page. Continued use of Sting after changes constitutes acceptance of the updated
            policy.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            If you have questions about this policy or how we handle your data, contact us at{" "}
            <a href="mailto:legal@sting.delivery" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              legal@sting.delivery
            </a>
            .
          </P>
        </Section>

        {/* Footer link */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sting</span>
          <Link href="/legal/terms" className="hover:text-foreground transition-colors underline underline-offset-2">
            Terms and Conditions
          </Link>
        </div>

      </div>
    </div>
  );
}

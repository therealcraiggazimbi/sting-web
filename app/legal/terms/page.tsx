import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sting",
  description: "The terms governing your use of the Sting app to order alcohol and drinks for delivery.",
  alternates: {
    canonical: "https://sting.delivery/legal/terms",
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

export default function TermsPage() {
  return (
    <div className="w-full px-6 py-16 min-h-dvh">
      <div className="mx-auto max-w-3xl flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Legal</p>
          <h1 className="text-2xl font-bold text-foreground">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground">Effective date: 25 October 2026</p>
        </div>

        <Section title="Acceptance">
          <P>
            By creating an account or using the Sting app (&ldquo;Sting&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) you agree to be bound by these Terms and Conditions. If you do not agree, do not
            use Sting. We may update these terms from time to time; continued use after a change constitutes
            acceptance of the updated terms.
          </P>
        </Section>

        <Section title="What Sting is">
          <P>
            Sting is an on-demand delivery app for alcohol, cold drinks, mixers, and ice in South Africa. You
            browse partner stores, build a cart, and place an order, which an independent delivery runner
            collects from the store and delivers to your address.
          </P>
          <P>
            People who deliver orders (&ldquo;Runners&rdquo;) apply and operate through a separate Sting Runner
            platform at runners.sting.delivery, governed by its own terms. These Terms and Conditions govern
            your use of Sting as a customer placing orders only.
          </P>
        </Section>

        <Section title="Eligibility and age restriction">
          <P>
            Sting delivers alcohol, so you must be at least 18 years old to create an account or place an
            order. You confirm you are 18 or older when you first sign in, and the runner delivering your
            order will check a physical identification document in person before handing it over. We may also
            offer an optional identity-verification step during sign-up (see &ldquo;Identity verification&rdquo;
            below) — it is never required to place an order.
          </P>
          <P>
            You must provide accurate, current information when creating your account and keep it up to
            date — including your name, delivery address, and contact number. One account per person; you may
            not share your account or place orders on behalf of someone who does not meet the age requirement
            above.
          </P>
        </Section>

        <Section title="Identity verification">
          <P>
            During sign-up, Sting may ask whether you would like to verify a South African ID number to help
            confirm your identity and age ahead of time. This step is entirely optional and can be skipped —
            skipping it does not block or delay your account or your ability to order. If you do provide an ID
            number, it is checked for validity through a third-party service and is never stored by Sting; see
            our Privacy Policy for the full detail on how this works.
          </P>
          <P>
            Whether or not you complete this step, every order is still subject to an in-person identification
            check by the runner at the point of delivery, as described above.
          </P>
        </Section>

        <Section title="Orders, pricing, and availability">
          <P>
            Product availability, pricing, and delivery coverage depend on the partner store nearest you and
            may change at any time. Placing an order does not guarantee a particular delivery time; Sting and
            its runners aim to deliver promptly but cannot guarantee an exact arrival time. We reserve the
            right to refuse or cancel an order, including where a product has become unavailable, your
            delivery address falls outside our coverage area, or we suspect fraud or misuse.
          </P>
          <P>
            Your total may include a delivery fee, a service fee, and an optional tip for your runner, each
            shown before you confirm payment. Prices and fees are subject to change and will always be shown
            to you before you pay.
          </P>
        </Section>

        <Section title="Payment and Sting Wallet">
          <P>
            Payments are processed through third-party payment gateways (including Paystack and Stitch); Sting
            does not store your full card or bank account details. You may also pay using Sting Wallet, a
            closed-loop in-app balance you top up by card or EFT and spend only within Sting — on your own
            order, or by contributing it toward a shared order with friends. Sting Wallet cannot be withdrawn,
            cashed out, or sent for any purpose outside Sting, is not a bank account, and does not earn
            interest.
          </P>
          <P>
            If an order is cancelled after payment, any refund due is credited to your Sting Wallet rather than
            reversed to your original payment method, except where a cancellation fee applies because a runner
            had already accepted your order.
          </P>
        </Section>

        <Section title="Group ordering">
          <P>
            Sting lets you start a shared cart and invite others to join and contribute toward one order. Each
            participant is responsible for their own contribution; the person who starts the shared cart is
            responsible for confirming and paying any remaining balance when checking out.
          </P>
        </Section>

        <Section title="Referral programme">
          <P>
            If you sign up using another user&rsquo;s referral code, both of you may become eligible for a
            reward once you complete a qualifying order, on terms we may update from time to time. Referral
            codes may not be used to misrepresent who referred you or to manipulate rewards.
          </P>
        </Section>

        <Section title="Conduct">
          <P>You agree not to:</P>
          <UL items={[
            "Provide false information about your age or identity.",
            "Attempt to order alcohol for, or on behalf of, anyone under 18.",
            "Misuse Sting Wallet, referrals, or cashback features to obtain funds you are not entitled to.",
            "Treat runners, store staff, or other users disrespectfully.",
            "Attempt to reverse-engineer, scrape, or interfere with Sting's systems.",
            "Use Sting for any unlawful purpose.",
          ]} />
        </Section>

        <Section title="Account suspension and deletion">
          <P>
            We may suspend or terminate your account if you breach these terms, provide false information
            about your age or identity, or engage in conduct we reasonably believe is unsafe, fraudulent, or
            harmful to runners, store partners, or other users. You may request deletion of your account at
            any time from within the app; your account and personal data are fully deleted 30 days after your
            request, unless you sign back in within that window to cancel the deletion.
          </P>
        </Section>

        <Section title="Intellectual property">
          <P>
            All content in the Sting app and on this site — including its design, software, and branding — is
            owned by or licensed to Sting and is protected by applicable intellectual property laws. You may
            not reproduce, distribute, or create derivative works from it without our prior written
            permission.
          </P>
        </Section>

        <Section title="Limitation of liability">
          <P>
            To the fullest extent permitted by applicable law, Sting and its affiliates, directors, employees,
            and agents shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of, or inability to use, Sting — including a late, incomplete, or
            undelivered order.
          </P>
          <P>
            Nothing in these terms excludes or limits liability for death or personal injury caused by gross
            negligence, fraud, or any other liability that cannot be excluded or limited under the South
            African Consumer Protection Act 68 of 2008 or any other applicable mandatory law.
          </P>
        </Section>

        <Section title="Governing law">
          <P>
            These terms are governed by the laws of the Republic of South Africa. Any dispute arising from or
            relating to these terms or your use of Sting shall be subject to the jurisdiction of the South
            African courts.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            For questions about these terms, contact us at{" "}
            <a href="mailto:legal@sting.delivery" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              legal@sting.delivery
            </a>
            .
          </P>
        </Section>

        {/* Footer link */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sting</span>
          <Link href="/legal/privacy" className="hover:text-foreground transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>
        </div>

      </div>
    </div>
  );
}

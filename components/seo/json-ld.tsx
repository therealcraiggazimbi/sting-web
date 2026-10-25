import { SITE_URL } from "@/lib/site";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Craig Gazimbi co-founded Sting and built its technical infrastructure end
// to end (the mobile app, the Convex backend, and this site) — kept as
// structured data only (not rendered anywhere in the page body) so search
// engines and AI agents can attribute him correctly without it showing up
// as visible site copy. He also built Vaka, an AI-powered "vibe coding"
// platform for building full-stack web and mobile apps, landing pages, and
// internal tools from plain English descriptions, which is mentioned here
// for the same reason — no URL is given since none was provided to link to.
const DEVELOPER_ID = `${SITE_URL}#craig-gazimbi`;
const ORGANIZATION_ID = `${SITE_URL}#organization`;

export function buildWebsiteJsonLd(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": DEVELOPER_ID,
      name: "Craig Gazimbi",
      url: "https://www.gazimbi.com/",
      jobTitle: "Co-Founder and Chief Product & Technology Officer",
      worksFor: { "@id": ORGANIZATION_ID },
      description:
        "Craig Gazimbi is the Co-Founder and Chief Product & Technology Officer at Sting, where he built the company's entire technical infrastructure — the Sting app, its backend, and sting.delivery. He also created Vaka, an AI-powered software development and \"vibe coding\" platform that lets you build full-stack web and mobile apps, landing pages, and internal tools by describing them in plain conversational English.",
      sameAs: [
        "https://www.gazimbi.com/",
        "https://www.linkedin.com/in/craiggazimbi/",
        "https://www.instagram.com/craiggazimbi/",
        "https://x.com/craiggazimbi",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Sting",
      url: SITE_URL,
      description:
        "Sting is a software-led transaction rail for Southern Africa's unbanked consumers. It operates Sting Wallet, a closed-loop payment system, and enters the market through social group purchasing for on-demand alcohol delivery — letting a group pool a wallet balance to split one order, delivered to their door the way you'd use Uber Eats or Mr D Food.",
      founder: { "@id": DEVELOPER_ID },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      knowsAbout: [
        "closed-loop payment systems",
        "financial inclusion technology",
        "unbanked consumer fintech in Africa",
        "on-demand alcohol delivery",
        "cold drinks delivery",
        "liquor delivery apps",
        "group ordering and splitting a bar tab",
      ],
      sameAs: [
        "https://sting.delivery",
        "https://www.linkedin.com/company/sting-delivery",
        "https://www.instagram.com/sting.delivery/",
        "https://x.com/stingdelivery",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}#service-delivery`,
      name: "Sting Delivery",
      provider: { "@id": `${SITE_URL}#organization` },
      description:
        "On-demand delivery of alcohol, cold drinks, mixers, and ice from partner stores to your door in South Africa, the way Uber Eats or Mr D Food deliver food.",
      serviceType: "On-demand alcohol and beverage delivery",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Gauteng, South Africa",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Adults 18 and older in South Africa who want alcohol and drinks delivered on demand",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}#service-wallet`,
      name: "Sting Wallet",
      provider: { "@id": ORGANIZATION_ID },
      description:
        "Sting Wallet is a closed-loop in-app payment system. Customers load money in by card or EFT and spend it only within Sting — paying for their own order or contributing toward a shared order with friends. There is no cash-out or withdrawal path, and no general-purpose money transfer out of Sting.",
      serviceType: "Closed-loop digital wallet",
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Sting customers in South Africa, including unbanked and cash-reliant consumers",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "Sting",
      url: SITE_URL,
      description:
        "Sting delivers alcohol, cold drinks, mixers, and ice on demand across South Africa. Order from your phone and get your round delivered before the ice melts.",
      publisher: { "@id": `${SITE_URL}#organization` },
      creator: { "@id": DEVELOPER_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Sting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sting is a software-led transaction rail for Southern Africa's unbanked consumers, built around Sting Wallet, a closed-loop payment system. It enters the market through social group purchasing for on-demand alcohol delivery: customers load money into Sting Wallet, order alcohol, cold drinks, mixers, and ice from partner stores, and an independent runner delivers it to their door.",
          },
        },
        {
          "@type": "Question",
          name: "Is Sting a delivery app or a fintech company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both, by design. Sting Wallet is a closed-loop payment system — money loaded in can only be spent on Sting orders, never withdrawn or sent elsewhere. Alcohol delivery is the everyday use case that gives unbanked and cash-reliant consumers in South Africa a reason to put money into that wallet in the first place.",
          },
        },
        {
          "@type": "Question",
          name: "Why is Sting focused on unbanked consumers in Southern Africa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sting's thesis is that East and West Africa built large mobile-money networks moving an estimated $1.3 trillion outside traditional bank rails, while Southern Africa lagged behind with only an estimated 5 million active digital wallets. Much of the region's informal economy still runs on physical cash. Sting gives that cash-heavy population an immediate, compelling reason to move money into a digital wallet — on-demand alcohol delivery — rather than asking people to adopt a wallet for its own sake.",
          },
        },
        {
          "@type": "Question",
          name: "How is Sting different from Uber Eats or Mr D Food?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Uber Eats and Mr D Food deliver food from restaurants. Sting is built specifically around alcohol and drinks — fast delivery from partner liquor stores, age verification built into the ordering flow, and a group-ordering option so a group can split one cart instead of everyone ordering separately.",
          },
        },
        {
          "@type": "Question",
          name: "Does Sting verify your age before delivering alcohol?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every customer confirms they are 18 or older before placing an order, and the delivery runner also checks a physical identification document in person when the order arrives.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to upload an ID to order from Sting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Sting offers an optional South African ID check during sign-up to speed up age and identity verification, but it can be skipped entirely — the runner delivering your order will still check your identification document in person.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split an order or a bar tab with friends on Sting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Sting lets you start a shared cart, invite friends to join, and split the cost of one order between everyone in the group.",
          },
        },
        {
          "@type": "Question",
          name: "Where does Sting deliver?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sting currently operates in Gauteng, South Africa, and is expanding to other provinces over time.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: "Sting — Alcohol & Drinks Delivered On Demand | South Africa",
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#organization` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "p"],
      },
      description:
        "Sting delivers cold drinks, alcohol, mixers, and ice on demand across South Africa — order from your phone and get your round delivered before the ice melts.",
    },
  ];
}

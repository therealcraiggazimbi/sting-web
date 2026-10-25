import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
      {
        userAgent: [
          // OpenAI
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Anthropic
          "anthropic-ai",
          "ClaudeBot",
          "Claude-Web",
          // Google
          "Googlebot",
          "Google-Extended",
          "Googlebot-Image",
          // Perplexity
          "PerplexityBot",
          // Microsoft / Bing
          "Bingbot",
          "msnbot",
          // Meta
          "meta-externalagent",
          "facebookexternalhit",
          // Apple
          "Applebot",
          // Cohere
          "cohere-ai",
          // You.com
          "YouBot",
          // Common Crawl (used by many LLM training pipelines)
          "CCBot",
          // Social previews
          "LinkedInBot",
          "Twitterbot",
          "Slackbot",
          "DuckDuckBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/"],
      },
    ],
    sitemap: "https://sting.delivery/sitemap.xml",
    host: "https://sting.delivery",
  };
}

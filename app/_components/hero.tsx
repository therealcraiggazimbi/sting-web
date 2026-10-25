import Image from "next/image";
import { HeroContent } from "@/app/_components/hero-content";

export function Hero() {
  return (
    <>
      {/* Fixed parallax background — stays locked as content scrolls over it */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image
          src="/assets/platform/sting-hero-mobile.png"
          alt=""
          fill
          className="object-cover object-center md:hidden"
          priority
        />
        <Image
          src="/assets/platform/sting-hero.png"
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)" }} />
      </div>

      <section className="relative min-h-screen flex flex-col -mt-14">
        <div className="flex flex-1 flex-col pt-14">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-270 px-6 md:px-0">
              <HeroContent />
            </div>
          </div>
        </div>
        <div className="w-full max-w-270 mx-auto px-6 md:px-0 pb-8">
          <div className="flex gap-6">
            <a href="/legal/terms" className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200">Terms of use</a>
            <a href="/legal/privacy" className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200">Privacy policy</a>
          </div>
        </div>
      </section>
    </>
  );
}

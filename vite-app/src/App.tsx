import { type ReactNode } from "react"
import {
  ArrowUpRightIcon,
  EnvelopeIcon,
  FilePdfIcon,
} from "@phosphor-icons/react"

import githubLogo from "@/assets/github-logo.svg"
import linkedinLogo from "@/assets/linkedin-logo.png"
import DepthCarousel from "@/components/DepthCarousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import content from "@/content.json"

const SOCIAL_ICON: Record<string, ReactNode> = {
  LinkedIn: <img src={linkedinLogo} alt="" className="size-5 rounded-xs" />,
  GitHub: (
    // The source mark is a white-only fill, so it needs a fixed dark chip
    // (not a theme-flipping one) to stay visible in both light and dark.
    <span className="inline-flex size-5 items-center justify-center rounded-xs bg-[#161b22] p-0.5">
      <img src={githubLogo} alt="" className="size-full" />
    </span>
  ),
  Email: <EnvelopeIcon className="size-5" aria-hidden="true" />,
  Resume: <FilePdfIcon className="size-5" aria-hidden="true" />,
}

type Project = (typeof content.projects)[number]

/**
 * The screenshot and its caption span the slide's full width, the same measure
 * as the description below them, so the image's height simply follows from the
 * width and its aspect ratio. (An earlier version measured the width in JS so a
 * card border could hug the image exactly; that card chrome is gone, and with
 * it the need to measure anything.)
 */
function ProjectSlide({ item }: { item: Project }) {
  return (
    <article className="flex h-full w-full flex-col items-stretch gap-4 overflow-hidden">
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="portfolio-carousel__copy font-heading inline-flex items-center gap-1.5 self-start text-xl font-medium tracking-tight hover:underline"
      >
        {item.title}
        <ArrowUpRightIcon className="size-4" aria-hidden="true" />
      </a>

      <figure className="portfolio-carousel__shot m-0 flex min-h-0 w-full flex-col">
        <img
          src={item.image}
          alt={item.alt}
          draggable={false}
          className="block max-h-[min(55svh,440px)] w-full object-contain"
        />
        <figcaption className="portfolio-carousel__copy text-muted-foreground w-full shrink-0 pt-2.5 text-center text-xs leading-normal">
          {item.caption}
        </figcaption>
      </figure>

      <p className="portfolio-carousel__copy w-full shrink-0 self-stretch text-[0.8125rem] leading-[1.7] text-pretty">
        {item.description}
      </p>

      {item.links.length > 0 && (
        <div className="portfolio-carousel__copy flex flex-wrap gap-2">
          {item.links.map((link) => (
            <Button
              key={link.href}
              variant="secondary"
              size="sm"
              render={<a href={link.href} target="_blank" rel="noreferrer" />}
            >
              {link.label} →
            </Button>
          ))}
        </div>
      )}

      <div className="portfolio-carousel__copy flex flex-wrap gap-1.5 pt-1">
        {item.tech.map((tech) => (
          <Badge key={tech} variant="secondary" className="font-normal">
            {tech}
          </Badge>
        ))}
      </div>
    </article>
  )
}

export function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.name}
        </h1>
        <p className="text-muted-foreground mt-1.5 text-base">{content.title}</p>

        <div
          id="contact"
          aria-label="Contact"
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Avatar className="border-border size-9 border">
            <AvatarImage
              src={content.contact.headshot}
              alt={content.contact.headshotAlt}
            />
            <AvatarFallback>WH</AvatarFallback>
          </Avatar>

          {content.contact.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={item.label}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors hover:underline"
            >
              {SOCIAL_ICON[item.label]}
              <span>{item.value}</span>
            </a>
          ))}
        </div>

        <p className="mt-8 leading-[1.75] text-pretty">
          {content.summary}
        </p>
      </header>

      <Separator />

      <section aria-labelledby="portfolio-heading">
        <h2
          id="portfolio-heading"
          className="text-muted-foreground text-xs font-medium tracking-[0.15em] uppercase"
        >
          Portfolio
        </h2>

        <div className="relative mt-8 mb-10">
          <DepthCarousel
            items={content.projects}
            className="portfolio-carousel"
            depth={220}
            spread={90}
            tilt={22}
            tiltDirection="right"
            perspective={1200}
            visibleCards={4}
            falloff={0.4}
            blur={8}
            autoplay={false}
            loop
            cardWidth={880}
            cardHeight={800}
            radius={4}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls={false}
            showIndicators
            renderItem={(item) => <ProjectSlide item={item} />}
          />
        </div>
      </section>
    </div>
  )
}

export default App

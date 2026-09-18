import { useEffect, useState, type ReactNode } from "react"
import {
  ArrowUpRightIcon,
  EnvelopeIcon,
  FilePdfIcon,
} from "@phosphor-icons/react"

import githubLogo from "@/assets/github-logo.svg"
import linkedinLogo from "@/assets/linkedin-logo-white.png"
import DepthCarousel from "@/components/DepthCarousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import content from "@/content.json"

// Every mark is 16px so it optically matches the 14px link text beside it;
// the previous 20px made the contact row read bottom-heavy.
const SOCIAL_ICON: Record<string, ReactNode> = {
  // Note: this mark is a white-only fill (transparent everywhere else), so
  // it renders invisible against the light-mode page background — visible
  // only in dark mode. Requested as a plain glyph with no background chip.
  LinkedIn: <img src={linkedinLogo} alt="" className="size-4 shrink-0" />,
  GitHub: (
    // The source mark is a white-only fill, so it needs a fixed dark chip
    // (not a theme-flipping one) to stay visible in both light and dark.
    <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-xs bg-[#161b22] p-px">
      <img src={githubLogo} alt="" className="size-full" />
    </span>
  ),
  Email: (
    <EnvelopeIcon className="size-4 shrink-0 text-white" aria-hidden="true" />
  ),
  Resume: (
    <FilePdfIcon className="size-4 shrink-0 text-white" aria-hidden="true" />
  ),
}

/**
 * The focused card fills the column's full width — the same measure as the
 * summary above it. `cardWidth` holds the widest the column gets at each
 * breakpoint, and the component's ResizeObserver scales the card to
 * `containerWidth / cardWidth` (see DepthCarousel.jsx), so the slide renders
 * at exactly the column's current width at every viewport.
 *
 * `spread` and `depth` only shape how far the receding cards fan out and how
 * quickly they shrink; they no longer cost the focused card any width. The
 * stage clips overflow (index.css), so a receding card is free to spill past
 * the content column without causing a sideways scroll. Phones get a small
 * spread rather than none, since 0 collapses the stack into a flat single
 * image with no depth cue at all.
 */
type CarouselGeometry = {
  min: number
  cardWidth: number
  cardHeight: number
  spread: number
  depth: number
  visibleCards: number
}

const CAROUSEL_BREAKPOINTS: CarouselGeometry[] = [
  // 1056 is the column at max-w-6xl with lg padding (1152 − 96 of horizontal
  // gutter); below that within this tier the scale simply follows the column
  // down, always rendering the card at full width. Depth does the fan's
  // separation: at perspective 2400 a d=1 neighbour renders at 2400/2950 ≈
  // 0.81 its on-screen height (d=2 ≈ 0.68), so receding cards read as smaller
  // and further back rather than fanning out at near-full height. Spread stays
  // big enough that each neighbour's far edge still peeks well past the
  // focused card.
  {
    min: 1024,
    cardWidth: 1056,
    cardHeight: 860,
    spread: 200,
    depth: 550,
    visibleCards: 4,
  },
  {
    min: 768,
    cardWidth: 960,
    cardHeight: 840,
    spread: 175,
    depth: 460,
    visibleCards: 3,
  },
  {
    min: 480,
    cardWidth: 720,
    cardHeight: 800,
    spread: 125,
    depth: 340,
    visibleCards: 3,
  },
  // Narrow phones keep the focused card at the column's full width too
  // (cardWidth 440 exceeds any <480 column, so the scale lands below its cap).
  // The stage clips overflow, so this only affects the focused card's own
  // size, not whether anything spills the column. The modest spread keeps a
  // fan so neighbours still peek out from behind the focused card.
  {
    min: 0,
    cardWidth: 440,
    // Was 1180: the article's content (title, image, caption, description,
    // links, badges) only needs ~630px at this width — the article fills
    // whatever cardHeight it's given without growing to match, so the extra
    // ~550px just sat as dead space between the badges and the dots below.
    cardHeight: 660,
    spread: 60,
    depth: 260,
    visibleCards: 3,
  },
]

function useCarouselGeometry() {
  const [geometry, setGeometry] = useState(CAROUSEL_BREAKPOINTS[0])

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth
      setGeometry(
        CAROUSEL_BREAKPOINTS.find((b) => w >= b.min) ?? CAROUSEL_BREAKPOINTS[0]
      )
    }
    read()
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])

  return geometry
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
    <article className="flex h-full w-full flex-col items-stretch gap-3.5 overflow-hidden sm:gap-4">
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="portfolio-carousel__copy inline-flex items-center gap-2 self-start font-heading text-xl font-semibold tracking-tight hover:underline sm:text-2xl"
      >
        {item.title}
        <ArrowUpRightIcon
          className="size-4 shrink-0 sm:size-5"
          aria-hidden="true"
        />
      </a>

      <figure className="portfolio-carousel__shot m-0 flex min-h-0 w-full flex-col">
        <img
          src={item.image}
          alt={item.alt}
          draggable={false}
          className="block max-h-[min(52svh,420px)] w-full object-contain"
        />
        <figcaption className="portfolio-carousel__copy w-full shrink-0 pt-3 text-center text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground sm:text-sm">
          {item.caption}
        </figcaption>
      </figure>

      <p className="portfolio-carousel__copy w-full shrink-0 self-stretch text-[length:var(--slide-body)] leading-[1.7] text-pretty">
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

      <div className="portfolio-carousel__copy flex flex-wrap gap-2 pt-1">
        {item.tech.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="text-[0.8125rem] font-normal"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </article>
  )
}

export function App() {
  const geometry = useCarouselGeometry()

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-12">
      <header className="flex flex-col gap-7 sm:gap-8">
        {/* Identity block: the headshot belongs with the name it names, not
            inline in the link row, where it read as a fifth, label-less link.
            The name is ~16 monospace characters, which is wider than a phone
            can hold beside a portrait, so below `sm` the two stack and the
            name gets the full column. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <Avatar className="size-16 shrink-0 border border-border sm:size-[4.5rem]">
            <AvatarImage
              src={content.contact.headshot}
              alt={content.contact.headshotAlt}
            />
            <AvatarFallback>WH</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
              {content.name}
            </h1>
            <p className="mt-1.5 text-sm tracking-[0.02em] text-muted-foreground sm:text-base">
              {content.title}
            </p>
          </div>
        </div>

        {/* The summary runs the page's full width. */}
        <p className="w-full text-[0.9375rem] leading-[1.7] text-pretty sm:leading-[1.75]">
          {content.summary}
        </p>

        {/* Contact links read as a labelled row of destinations, so each one
            shows its destination's name rather than a raw address or filename.
            Targets are 44px tall on touch via the negative-margin trick, which
            keeps the visual rhythm of the row while meeting the tap minimum. */}
        <nav
          id="contact"
          aria-label="Contact"
          className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-0 sm:gap-x-6"
        >
          {content.contact.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={`${item.label}: ${item.value}`}
              className="group flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {SOCIAL_ICON[item.label]}
              <span className="group-hover:underline">{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <Separator />

      <section aria-labelledby="portfolio-heading">
        <h2
          id="portfolio-heading"
          className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase"
        >
          Portfolio
        </h2>

        <div className="relative mt-8 mb-10">
          <DepthCarousel
            items={content.projects}
            className="portfolio-carousel"
            depth={geometry.depth}
            spread={geometry.spread}
            tilt={0}
            tiltDirection="right"
            perspective={2400}
            visibleCards={geometry.visibleCards}
            falloff={0.18}
            blur={5}
            autoplay={false}
            loop
            cardWidth={geometry.cardWidth}
            cardHeight={geometry.cardHeight}
            radius={4}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls={false}
            showIndicators={true}
            renderItem={(item) => <ProjectSlide item={item} />}
          />
        </div>
      </section>
    </div>
  )
}

export default App

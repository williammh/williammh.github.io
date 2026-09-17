declare module "@/components/DepthCarousel" {
  import type { ReactNode } from "react"

  export interface DepthCarouselItem {
    image: string
    alt?: string
  }

  export interface DepthCarouselProps<T = DepthCarouselItem> {
    items?: T[]
    cardWidth?: number
    cardHeight?: number
    radius?: number
    tint?: string
    depth?: number
    spread?: number
    tilt?: number
    tiltDirection?: "left" | "right"
    perspective?: number
    visibleCards?: number
    falloff?: number
    blur?: number
    duration?: number
    ease?: string
    autoplay?: boolean
    autoplayDelay?: number
    loop?: boolean
    showControls?: boolean
    showIndicators?: boolean
    /** Scale the focused card down to the stage's height as well as width. */
    fitHeight?: boolean
    onChange?: (index: number, item: T) => void
    /** Renders the full contents of each card, replacing the default <img>. */
    renderItem?: (item: T, index: number) => ReactNode
    className?: string
  }

  export default function DepthCarousel<T = DepthCarouselItem>(
    props: DepthCarouselProps<T>
  ): JSX.Element
}

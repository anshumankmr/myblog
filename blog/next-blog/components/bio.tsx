import Image from "next/image"

interface BioProps {
  showTwitter?: boolean
}

export default function Bio({ showTwitter = true }: BioProps) {
  return (
    <div className="bio">
      <Image
        src="https://avatars.githubusercontent.com/u/24219264?v=4"
        alt="Anshuman Kumar"
        width={44}
        height={44}
        className="bio-avatar"
      />
      <div>
        <p className="font-semibold text-text-heading">Anshuman Kumar</p>
        <p className="text-sm text-text-meta">
          Software engineer · Flexera · Bangalore
        </p>
        <p className="mt-2 text-base">
          Building FinOps AI at Flexera. Into running, cycling, board games,
          coffee, cooking when I can, and films.
        </p>
        {showTwitter && (
          <a
            href="https://twitter.com/anshuman_kmr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm"
          >
            @anshuman_kmr
          </a>
        )}
      </div>
    </div>
  )
}

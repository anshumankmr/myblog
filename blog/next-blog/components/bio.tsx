import Image from "next/image"
import { PERSON } from "@/lib/identity"

interface BioProps {
  showTwitter?: boolean
}

export default function Bio({ showTwitter = true }: BioProps) {
  return (
    <div className="bio">
      <Image
        src={PERSON.image}
        alt={`Portrait of ${PERSON.name}`}
        width={44}
        height={44}
        className="bio-avatar"
      />
      <div>
        <p className="font-semibold text-text-heading">{PERSON.name} <span className="meta">@{PERSON.handle}</span></p>
        <p className="text-sm text-text-meta">
          {PERSON.jobTitle} · {PERSON.employer} · {PERSON.city}
        </p>
        <p className="mt-2 text-base">
          Building FinOps AI at {PERSON.employer}. Into running, cycling, board games,
          coffee, cooking when I can, and films.
        </p>
        {showTwitter && (
          <a
            href={PERSON.profiles.twitter}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-block mt-2 text-sm"
          >
            @anshuman_kmr
          </a>
        )}
      </div>
    </div>
  )
}

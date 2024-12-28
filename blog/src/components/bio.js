import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import "./bio.css"

const Bio = () => {
  const author = {
    name: "Anshuman Kumar",
    summary: "who lives and works in Bengaluru, building useful things",
  }
  const social = { twitter: "anshuman_kmr" }

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="https://storage.googleapis.com/www.anshumankumar.dev/assets/IMG_5144.JPG"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary} &nbsp;&nbsp;
            <a href={`https://twitter.com/${social?.twitter || ``}`}>
            {" "}
            Consider Following me on Twitter/X
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
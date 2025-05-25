import React from "react";
import Image from "next/image"; // Import next/image
import '../styles/bio.css'; // Added import for styles

const Bio = () => {
  const author = {
    name: "Anshuman Kumar",
    summary: "who lives and works in Bengaluru, building useful things",
  };
  const social = { twitter: "anshuman_kmr" };

  return (
    <div className="bio">
      <Image
        className="bio-avatar"
        // layout="fixed" // layout prop is deprecated, use width and height with styling
        src="https://storage.googleapis.com/www.anshumankumar.dev/assets/IMG_5144.JPG"
        width={50}
        height={50}
        quality={95} // quality can be used
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary}
          <br />
          <a href={`https://twitter.com/${social.twitter}`}>
            Follow me on Twitter/X
          </a>
        </p>
      )}
    </div>
  );
};

export default Bio;

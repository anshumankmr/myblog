import Image from 'next/image';

interface BioProps {
  showTwitter?: boolean;
}

export default function Bio({ showTwitter = true }: BioProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Image
        src="https://storage.cloud.google.com/www.anshumankumar.dev/profile_pic.jpg"
        alt="Anshuman Kumar"
        width={80}
        height={80}
        className="rounded-full"
        unoptimized
      />
      <div>
        <p className="font-heading font-bold text-heading dark:text-white">Anshuman Kumar</p>
        <p className="text-text-light dark:text-gray-400 text-sm mt-1">
          SWE III based in Bangalore, doing cool stuff with AI at scale.
        </p>
        {showTwitter && (
          <a
            href="https://twitter.com/anshuman_kmr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline text-sm mt-1 inline-block"
          >
            @anshuman_kmr
          </a>
        )}
      </div>
    </div>
  );
}

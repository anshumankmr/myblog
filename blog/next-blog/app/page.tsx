import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <section className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
          <span className="gradient-text">
            SWE III, AI Enthusiast, and Life Explorer
          </span>
          <span className="block mt-2 text-heading dark:text-white">
            – Insights on Tech, Culture, and Everything In Between
          </span>
        </h1>

        <div className="mt-8 space-y-4 text-lg text-text-light dark:text-gray-300 leading-relaxed">
          <p>
            Hey, I&apos;m Anshuman Kumar, a SWE III based in Bangalore working at
            a leading ITAM+Finops company. I do cool stuff with AI at scale,
            building cutting-edge solutions from Generative AI to ML-driven
            conversation agents.
          </p>

          <p>
            When I&apos;m not architecting smart systems, you&apos;ll find me
            diving into the world of memes, movies, and random musings.
          </p>

          <p>
            On this blog, I share my thoughts on tech innovations, fitness (yes,
            I love cycling and marathons), and a bit of everything else that
            keeps life interesting. Join me as I explore the intersection of
            code, culture, and curiosity.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link href="/blogs" className="btn-primary">
            Read the Blog
          </Link>
          <Link href="/about" className="btn-secondary">
            More About Me
          </Link>
        </div>
      </section>
    </div>
  );
}

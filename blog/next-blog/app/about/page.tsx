import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Anshuman Kumar - SWE III based in Bangalore, doing cool stuff with AI at scale.',
};

const skills = [
  { category: 'AI/ML', items: 'Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)' },
  { category: 'Cloud', items: 'AWS, GCP, Vertex AI, Kubernetes' },
  { category: 'Bot Development', items: 'Dialogflow, RASA' },
  { category: 'Languages', items: 'Python, JavaScript' },
  { category: 'CI/CD', items: 'GitLab CI, GitHub Actions' },
  { category: 'Databases', items: 'Postgres, MySQL, Firestore' },
];

const hobbies = [
  'Cycling',
  'Running (Marathons)',
  'Exploring new tech innovations',
  'Watching and analyzing movies (especially horror and thriller genres)',
  'Memes and pop culture',
];

const achievements = [
  'Third prize at Jovian Hackathon 2023 for developing an open-source solution to automate coding tasks.',
  'Successfully built and deployed multiple AI-based systems, including Generative AI-based Conversation Agents at Deloitte.',
  'Participated in various marathons, including the Vedanta Delhi Half Marathon (2022) and Bangalore Half Marathon (2023).',
  'Developed a COVID-19 unemployment insurance chatbot to support customers during a critical period, improving accessibility.',
  'Strong contributions to open-source projects, including automating code tasks like unit tests and code fixes.',
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-heading mb-6">
        <span className="gradient-text">About Me</span>
      </h1>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-text-light dark:text-gray-300 leading-relaxed">
          Hey, I&apos;m Anshuman Kumar, a SWE III based in Bangalore working at
          a leading ITAM+Finops company. I do cool stuff with AI at scale,
          building cutting-edge solutions from Generative AI to ML-driven
          conversation agents.
        </p>
        <p className="text-lg text-text-light dark:text-gray-300 leading-relaxed">
          When I&apos;m not architecting smart systems, you&apos;ll find me
          diving into the world of memes, movies, and random musings.
        </p>
        <p className="text-lg text-text-light dark:text-gray-300 leading-relaxed">
          On this blog, I share my thoughts on tech innovations, fitness (yes, I
          love cycling and marathons), and a bit of everything else that keeps
          life interesting. Join me as I explore the intersection of code,
          culture, and curiosity.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="card p-6">
          <h2 className="text-xl font-heading font-bold text-heading mb-4 flex items-center gap-2">
            <span className="text-2xl">💻</span> Technical Skills
          </h2>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill.category} className="text-text-light dark:text-gray-300">
                <span className="font-semibold text-heading dark:text-white">
                  {skill.category}:
                </span>{' '}
                {skill.items}
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-heading font-bold text-heading mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Hobbies
          </h2>
          <ul className="space-y-2">
            {hobbies.map((hobby) => (
              <li key={hobby} className="text-text-light dark:text-gray-300 flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                {hobby}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 card p-6">
        <h2 className="text-xl font-heading font-bold text-heading mb-4 flex items-center gap-2">
          <span className="text-2xl">🏆</span> Achievements
        </h2>
        <ul className="space-y-3">
          {achievements.map((achievement, index) => (
            <li key={index} className="text-text-light dark:text-gray-300 flex items-start gap-3">
              <span className="text-accent font-bold">{index + 1}.</span>
              {achievement}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 text-center">
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

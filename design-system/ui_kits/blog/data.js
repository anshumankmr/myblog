// Content for the blog UI kit.
//
// SOURCING NOTE — read this before editing.
// `posts` are the author's REAL published pieces, taken from the live
// anshumankumar.net (Oct 2026): real titles, dates, and opening lines.
// Only the AWS post and the JAMStack post carry more than the opening
// paragraph. Do not replace them with tidier invented posts.
//
// `notes`, `films`, and `rides` are SAMPLES that show the shape of the
// data. Notes are built from facts already on the site (race times, the
// ₹7,000 bill) but the wording is a placeholder; films and rides are
// made up. Replace all three with real data.
window.BLOG_DATA = {
  author: {
    name: 'Anshuman Kumar',
    nameHi: 'अंशुमन कुमार',
    role: 'Building FinOps AI at Flexera. Into running, cycling, board games, coffee, cooking when I can, and films.',
    handle: '@anshuman_kmr',
    avatar: '../../assets/profile-pic.jpg',
  },
  posts: [
    {
      id: 'aws',
      title: 'I Ran a Personal Blog on AWS. I Deserve What Happened.',
      datePath: '2026-06-27', tag: 'Tech',
      excerpt: 'For years I ran this blog on GCP. Cloud Build for the pipeline, GCS for the bucket, Strapi as the CMS.',
      body: [
        { type: 'p', text: 'For years I ran this blog on GCP. Cloud Build for the pipeline, GCS for the bucket, Strapi as the CMS. Strapi is a headless CMS — a full application with a database, an admin panel, and an API — which is a lot of machinery for a blog that a few dozen people read. I ran it anyway. It felt professional.' },
        { type: 'p', text: 'Then Google charged me ₹7,000 for a Google Translate API key I had never used. Not a billing error. Not a test. A key I enabled, never called, and forgot existed. I asked for a refund. They said no. I migrated to AWS that week.' },
        { type: 'p', text: 'This was not a considered architectural decision. It was spite.' },
        { type: 'p', text: 'So I cut it. Strapi is gone — the posts live as markdown files fetched from a JSON file on GitHub. GitHub Actions builds it. Cloudflare Pages serves it for free. No database, no CMS, no IAM roles. The pipeline is one YAML file and a single deploy command.' },
        { type: 'p', text: 'The blog is the same. The infrastructure bill is zero.' },
      ],
    },
    { id: 'mcp', title: 'I Built an MCP Server So Claude Could Manage My Blog — Here\u2019s What Actually Happened', datePath: '2026-06-21', tag: 'Tech',
      excerpt: 'I run a personal blog backed by Strapi CMS. It works fine. But every time I want to draft a post, I have to open the Strapi admin panel.' },
    { id: 'autogen', title: 'Building a Scalable Music Recommendation System with AutoGen: A Real-World Implementation', datePath: '2025-02-22', tag: 'Tech',
      excerpt: 'As artificial intelligence continues to evolve, we\u2019re witnessing a fascinating shift from single-model systems to collaborative AI frameworks.' },
    {
      id: 'jamstack', title: 'Step-by-Step: Building My Blog with JAMStack and Google Cloud', datePath: '2023-08-31', tag: 'Tech',
      excerpt: 'I embarked on a journey to discover the ideal platform for my blog. My goal was to find a self-hosted solution.',
      body: [
        { type: 'p', text: 'I embarked on a journey to discover the ideal platform for my blog. My goal was to find a self-hosted solution, steering clear of popular site builders.' },
        { type: 'h2', text: 'Getting Scully to find the routes' },
        { type: 'p', text: 'I added a code snippet to enable Scully to discover my Angular routes, located in src/assets/scully-routes.json.' },
        { type: 'code', lang: 'json', text: '[\n  { "route": "/" },\n  { "route": "/blogs" },\n  { "route": "/contactme" }\n]' },
        { type: 'h2', text: 'Picking a headless CMS' },
        { type: 'p', text: 'After extensive research, I narrowed it down to two choices: Wordpress CMS and Strapi. I chose Strapi due to its integration with Postgres and the serverless Postgres offerings, including Neon.' },
      ],
    },
    { id: 'jovian', title: 'Jovian Generative AI Hackathon June 2023', datePath: '2023-08-02', tag: 'Tech',
      excerpt: 'I attended the recent GenAI Hackathon hosted by Jovian and I thought a quick blog about my experiences would be an excellent way to share my learning experience.' },
    { id: 'streaming', title: 'Streaming using Flask and React', datePath: '2023-06-30', tag: 'Tech',
      excerpt: 'Large Language Models (LLMs) like GPT-3.5 by Open AI, have indeed taken the world by storm recently.' },
    { id: 'chegg', title: 'Is ChatGPT really destroying Chegg\u2019s fortunes?', datePath: '2023-05-04', tag: 'Tech',
      excerpt: 'I am sure we have all seen the news of Chegg\u2019s stock price plumetting just after announcing its previous quarter\u2019s results.' },
    { id: 'evil-dead', title: 'Thoughts on Evil Dead Rise (2023)', datePath: '2023-03-30', tag: 'Films',
      excerpt: '\u201cEvil Dead Rise\u201d is the latest installment in the Evil Dead franchise, directed by Irish writer-director Lee Cronin.' },
    { id: 'gcp-exam', title: 'Preparing for the Google Cloud Professional Developer Exam', datePath: '2022-05-04', tag: 'Tech',
      excerpt: 'I gave the Professional Cloud Developer Exam in December 2022.' },
    { id: 'mvcs', title: 'An Introduction To MVCS Architecture', datePath: '2021-04-20', tag: 'Tech',
      excerpt: 'In software engineering, a software design pattern (also known as a software architecture pattern) is a generally applicable and reusable solution\u2026' },
    { id: 'manipal', title: 'Manipal \u2013 Shaping My Life for Good!', datePath: '2018-05-29', tag: 'Life',
      excerpt: 'Coming to MIT has been one of the most important decisions in my life.' },
    { id: 'villain', title: 'What villain actually had a point?', datePath: '2018-04-01', tag: 'Films',
      excerpt: 'Roy Batty from the Blade Runner (1982) was the antagonist of the story but hardly a true villain.' },
  ],
  // SAMPLE notes — short, untitled, no effort required.
  notes: [
    { id: 'n3', date: '2026-09-30', time: '21:12', text: 'Google still hasn\u2019t refunded the \u20b97,000.' },
    { id: 'n2', date: '2026-09-27', time: '11:48', text: 'First half marathon back: 21.3 km, 2:46:48 moving. Mysore, which I ran completely untrained, was 2:39:12. Draw your own conclusions.' },
    { id: 'n1', date: '2026-06-21', time: '19:05', text: 'Wrote up the MCP server that lets Claude draft posts for this blog.', postId: 'mcp' },
  ],
  // SAMPLE films — replace with the Letterboxd RSS feed.
  films: [
    { title: 'Weapons', year: 2025, rating: 4, date: '2026-09-29' },
    { title: 'Sinners', year: 2025, rating: 4.5, date: '2026-09-20' },
    { title: 'Evil Dead Rise', year: 2023, rating: 3.5, date: '2026-09-14', rewatch: true },
    { title: 'Blade Runner', year: 1982, rating: 5, date: '2026-09-06', rewatch: true },
  ],
  // SAMPLE rides — replace with Strava API data (GET /athlete/activities).
  rides: [
    { name: 'Nandi Hills loop', date: '2026-09-28', distanceKm: 72.4, movingTimeSec: 11040, elevationM: 1180 },
    { name: 'Morning spin, Outer Ring Road', date: '2026-09-24', distanceKm: 28.1, movingTimeSec: 4020, elevationM: 140 },
    { name: 'Hesaraghatta out-and-back', date: '2026-09-21', distanceKm: 54.6, movingTimeSec: 8100, elevationM: 410 },
  ],
  // From the live About page ("A few highlights").
  highlights: [
    { title: 'September half marathon', date: '27 September 2026', stats: '21.30 km · 2:46:48 moving time', text: 'My first half marathon back.' },
    { title: '30 in 30 ride', date: '15 February 2026', stats: '29.67 km · 1:00:50 moving time', text: 'Set personal bests over 10 km (19:45), 20 km (40:11), and 10 miles (31:59).' },
    { title: 'Joined Flexera', date: 'December 2025' },
    { title: 'Billu', date: '20 July 2024', text: 'Adopted this orange furball.' },
    { title: 'Temple Run', date: '7 July 2024', stats: '208.55 km · 10:38:51 moving time', text: 'A long-distance cycling event with checkpoints and a time limit. Did it for the heck of it.' },
    { title: 'Mysore Half Marathon', date: '23 June 2024', stats: '21.26 km · 2:39:12 moving time', text: 'Ran this one completely untrained.' },
    { title: 'Ride to Nandi Hills', date: '15 June 2024', stats: '131.32 km · 7:04:53 moving time', text: 'Brutal heat and some crazy climbs.' },
    { title: 'Bangalore Half Marathon', date: '8 October 2023', stats: '22.85 km · 2:54:22 moving time', text: 'Overtrained, with a lot to learn about pacing and racing.' },
  ],
  // SAMPLE calorie totals — replace with the MyFitnessPal diary, fetched at build time.
  calories: [
    { date: '2026-10-02', eaten: 1840, goal: 2100 },
    { date: '2026-10-01', eaten: 2260, goal: 2100 },
    { date: '2026-09-30', eaten: 1975, goal: 2100 },
  ],
  now: {
    updated: '2026-10-03',
    items: [
      { label: 'Work', text: 'Building FinOps AI at Flexera: cloud-cost anomaly detection and the agents that explain it.' },
      { label: 'Training', text: 'Back to running and cycling since February 2026. Ran my first half marathon back on 27 September.' },
      { label: 'This site', text: 'Off AWS and onto Cloudflare Pages. The infrastructure bill is zero.' },
    ],
  },
  skills: [
    { category: 'AI/ML', items: 'Generative AI, Prompt Engineering, Machine Learning (Scikit-learn, Keras)' },
    { category: 'Cloud', items: 'AWS, GCP, Vertex AI, Kubernetes' },
    { category: 'Languages', items: 'Python, SQL, JavaScript' },
    { category: 'CI/CD', items: 'GitLab CI, GitHub Actions' },
    { category: 'Databases', items: 'Postgres, MySQL, Firestore' },
  ],
  hobbies: [
    'Running and cycling, with the occasional race or very long ride.',
    'Board games.',
    'Cooking, when I can.',
    'Coffee. I have a professional grinder and a De\u2019Longhi EC685 that I cannot recommend enough.',
    'Watching and analysing films, especially horror and thrillers.',
    'Memes, pop culture, and trying out new tech.',
  ],
  contacts: [
    { name: 'Email', icon: 'fa-solid fa-envelope', description: 'anshumankumar.mail@gmail.com', href: 'mailto:anshumankumar.mail@gmail.com' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', description: 'in/anshumankumarcs', href: 'https://www.linkedin.com/in/anshumankumarcs' },
    { name: 'GitHub', icon: 'fa-brands fa-github', description: 'anshumankmr', href: 'https://github.com/anshumankmr' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', description: '@anshuman_kmr', href: 'https://twitter.com/anshuman_kmr' },
    { name: 'Strava', icon: 'fa-brands fa-strava', description: 'athletes/34639203', href: 'https://www.strava.com/athletes/34639203' },
  ],
};

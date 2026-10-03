import Nutrition from "@/components/nutrition"

export default function Fitness() {
  return (
    <section className="section" aria-labelledby="fitness-heading">
      <h2 id="fitness-heading" className="section-title">
        Keeping myself in check
      </h2>
      <p className="text-text-meta mb-5">
        I&apos;m trying to keep my calories in check, so here&apos;s my attempt
        at tracking them, along with what I&apos;ve been up to on the bike.
      </p>
      <div className="fitness-item">
        <h3>Recent activity</h3>
        <iframe
          title="Anshuman Kumar’s Strava activity summary"
          height="160"
          width="300"
          scrolling="no"
          className="strava-widget"
          loading="lazy"
          src="https://www.strava.com/athletes/34639203/activity-summary/55aab79d3b61cb1174268222ef82b6037a7f2268"
        />
        <a
          href="https://www.strava.com/athletes/34639203"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm mt-3"
        >
          View on Strava →
        </a>
      </div>
      <div className="fitness-item">
        <Nutrition />
      </div>
    </section>
  )
}

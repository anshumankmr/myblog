import Link from "next/link"

export default function NotFound() {
  return (
    <div className="page-container !py-16">
      <p className="meta mb-3">404</p>
      <h1>Page not found</h1>
      <p className="page-intro">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-4 flex-wrap">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/blogs" className="btn-secondary">
          Read the blog
        </Link>
      </div>
    </div>
  )
}

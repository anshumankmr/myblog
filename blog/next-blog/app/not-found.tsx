import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-heading font-bold text-accent mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading mb-4">
          Page Not Found
        </h2>
        <p className="text-text-light mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/blogs" className="btn-secondary">
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

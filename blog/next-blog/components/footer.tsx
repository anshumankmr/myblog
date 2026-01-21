export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-400 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {currentYear} Anshuman Kumar. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

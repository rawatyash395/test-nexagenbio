import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-brand-white mb-4">404 - Page Not Found</h2>
      <p className="text-brand-white-muted mb-8">The therapeutic target or page you requested could not be located.</p>
      <Link
        href="/"
        className="px-6 py-3 border border-brand-accent text-brand-accent hover:bg-brand-accent/10 rounded font-mono text-xs uppercase tracking-widest transition-all"
      >
        Return to Platform
      </Link>
    </div>
  );
}

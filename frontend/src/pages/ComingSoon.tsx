import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <main className="tatvika-coming-soon">
      <div className="tatvika-coming-soon-card">
        <div className="tatvika-coming-soon-icon">
          <svg 
            viewBox="0 0 24 24" 
            className="tatvika-coming-soon-icon-svg" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-1.5 3.19 0 4.5s3.24 1.26 4.5 0" />
            <path d="M12 12c-2-2.67-4-4-6-4a8.4 8.4 0 0 0-3 1c.5 1.5 1.5 3 3 4.5l3 3c1.5 1.5 3 2.5 4.5 3a8.4 8.4 0 0 0 1-3c0-2-1.33-4-4-6Z" />
            <path d="M9 15l-3-3" />
            <path d="M15 9c2-2.67 4-4 6-4a8.4 8.4 0 0 1 3 1c-.5 1.5-1.5 3-3 4.5l-3 3c-1.5 1.5-3 2.5-4.5 3a8.4 8.4 0 0 1-1-3c0-2 1.33-4 4-6Z" />
            <path d="M15 9l3 3" />
          </svg>
        </div>

        <h1 className="tatvika-coming-soon-title">
          Coming soon...
        </h1>

        <p className="tatvika-coming-soon-copy">
          This professional section is under construction. We are almost there! 
          If you want to get notified when the website goes live, subscribe to our mailing list.
        </p>

        <div className="tatvika-coming-soon-actions">
          <a
            href="mailto:hello@tatvikaachievers.com"
            className="tatvika-coming-soon-button-primary"
          >
            Notify me
          </a>
          <Link
            to="/"
            className="tatvika-coming-soon-button-secondary"
          >
            Back to home
          </Link>
        </div>

      </div>
    </main>
  )
}
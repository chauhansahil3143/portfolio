import { personalInfo } from '@/config/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p className="footer__text">
          Designed &amp; built by <span>{personalInfo.name}</span> · {year} · Engineering in Zero-G
        </p>
      </div>
    </footer>
  );
}

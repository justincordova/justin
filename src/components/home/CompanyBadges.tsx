import { Building2 } from "lucide-react";

interface Badge {
  name: string;
  href?: string;
  previous?: boolean;
  logo?: string;
}

const companies: Badge[] = [
  { name: "Pure Technology Inc", href: "https://pureittech.com/" },
  { name: "AbeScott Enterprises", previous: true },
];

export default function CompanyBadges() {
  return (
    <section className="px-6 py-2">
      <div className="animate-fade-up stagger-4 mx-auto flex max-w-container flex-wrap items-center justify-center gap-4">
        {companies.map((company) => {
          const content = (
            <>
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <Building2
                  className={`h-4 w-4 ${company.previous ? "text-ctp-overlay0" : "text-ctp-mauve"}`}
                />
              )}
              <span
                className={`text-sm font-medium ${company.previous ? "text-ctp-subtext0" : "text-ctp-text"}`}
              >
                {company.name}
              </span>
              {company.previous && (
                <span className="text-[10px] uppercase tracking-widest text-ctp-overlay0">
                  prev
                </span>
              )}
            </>
          );

          const className = `flex items-center gap-2.5 rounded-lg border px-4 py-2.5 transition-all duration-200 ${
            company.previous
              ? "border-ctp-surface0 bg-ctp-mantle opacity-50"
              : "border-ctp-surface1 bg-ctp-surface0 hover:border-ctp-mauve/40"
          }`;

          return company.href ? (
            <a
              key={company.name}
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <div key={company.name} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

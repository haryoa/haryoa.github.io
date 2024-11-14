// src/components/react/Publications.tsx
import React from "react";
import type { CollectionEntry } from "astro:content";

interface PublicationsProps {
  publications: CollectionEntry<"publications">[];
}

export const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  const sortedPubs = publications.sort((a, b) => b.data.year - a.data.year);

  return (
    <div className="space-y-8">
      {sortedPubs.map((pub) => (
        <div
          key={pub.id}
          className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-sage/10 transition-all duration-300 hover:border-copper/30"
        >
          <h3 className="text-xl font-medium text-sage mb-2">
            {pub.data.title}
          </h3>
          <p className="text-charcoal/80 mb-3">{pub.data.authors.join(", ")}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-sage">{pub.data.venue}</span>
            <span className="text-copper">{pub.data.year}</span>
            {pub.data.doi && (
              <a
                href={`https://doi.org/${pub.data.doi}`}
                className="text-sage hover:text-copper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            )}
          </div>
          {pub.data.links && (
            <div className="mt-3 flex gap-3">
              {pub.data.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="text-sm text-sage hover:text-copper transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


import React, { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import { HexColorPicker } from "react-colorful";
import 'react-tooltip/dist/react-tooltip.css';

// Types for our content
interface PortfolioProps {
  publications: CollectionEntry<"publications">[];
  education: CollectionEntry<"education">[];
  talks: CollectionEntry<"talks">[];
  experiences: CollectionEntry<"experiences">[];
  featuredPublications: CollectionEntry<"publications">[];
}

const Portfolio: React.FC<PortfolioProps> = ({
  publications,
  education,
  talks,
  experiences,
  featuredPublications,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("About Me");
  const [pubFilter, setPubFilter] = useState("all");
  const [themeColor, setThemeColor] = useState("#B87E5F");

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation sections
  const sections = [
    "About Me",
    "Interests",
    "Education",
    "Featured Publications",
    "Publications",
    "Experience",
    "Talks",
    "Volunteering",
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-[#4A5D4F]/10 z-50">
        <div
          className="h-full bg-[#B87E5F] transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-[#4A5D4F]/10 z-40">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-light tracking-wide text-[#4A5D4F] relative group">
              Haryo
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-300" />
            </div>
            <div className="flex space-x-8">
              <button className="px-4 py-2 text-[#4A5D4F] hover:text-[#B87E5F] transition-colors duration-200 relative group">
                Portfolio
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="pt-16 flex min-h-screen">
        {/* Fixed Sidebar */}
        <div className="fixed w-80 h-[calc(100vh-4rem)] p-8 bg-white/80 backdrop-blur-sm border-r border-[#4A5D4F]/10">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-48 h-48 bg-[#4A5D4F]/5 rounded-full flex items-center justify-center text-[#4A5D4F]/30 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                Photo
              </div>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#4A5D4F]/20 to-[#B87E5F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Name */}
            <div className="relative">
              <div className="text-2xl font-light tracking-wide text-[#4A5D4F]">
                About Haryo
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-px bg-[#B87E5F]/30" />
            </div>

            {/* Contact Info */}
            <div className="w-full space-y-6 text-[#2C2C2C]">
              <div className="space-y-2 group">
                <div className="text-sm font-medium text-[#4A5D4F] relative">
                  Email
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-px bg-[#B87E5F] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <a
                  href="mailto:your.email@domain.com"
                  className="text-sm hover:text-[#B87E5F] transition-colors duration-200"
                >
                  your.email@domain.com
                </a>
              </div>
              <div className="space-y-2 group">
                <div className="text-sm font-medium text-[#4A5D4F] relative">
                  Location
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-px bg-[#B87E5F] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="text-sm">Your Location</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="ml-80 flex-1 p-8 bg-[#F5F1E8]">
          {/* Section Navigation */}
          <nav className="mb-12 border-b border-[#4A5D4F]/10 pb-4 bg-[#F5F1E8]/80 backdrop-blur-sm sticky top-16 pt-4">
            <ul className="flex space-x-8 text-sm overflow-x-auto">
              {sections.map((section) => (
                <li
                  key={section}
                  className={`
                    relative cursor-pointer whitespace-nowrap group
                    ${
                      activeSection === section
                        ? "text-[#B87E5F]"
                        : "text-[#4A5D4F]"
                    }
                  `}
                  onClick={() => {
                    const element = document.getElementById(section);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {section}
                  <div
                    className={`
                    absolute -bottom-5 left-0 w-full h-px bg-[#B87E5F] 
                    transition-all duration-300
                    ${
                      activeSection === section
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }
                  `}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Sections */}
          <div className="space-y-24">
            {/* About Me Section */}
            <section id="About Me" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                About Me
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md">
                <p className="text-[#2C2C2C] leading-relaxed">
                  Your about me content here...
                </p>
              </div>
            </section>

            {/* Education Section */}
            <section id="Education" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Education
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md hover:border-[#B87E5F]/30"
                  >
                    <h3 className="text-xl font-medium text-[#4A5D4F] mb-2">
                      {edu.data.degree} in {edu.data.field}
                    </h3>
                    <p className="text-[#2C2C2C] mb-2">
                      {edu.data.institution}
                    </p>
                    <p className="text-sm text-[#2C2C2C]/80">
                      {edu.data.start} - {edu.data.end || "Present"} •{" "}
                      {edu.data.location}
                    </p>
                    {edu.data.achievements && (
                      <ul className="mt-4 space-y-2">
                        {edu.data.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="text-sm text-[#2C2C2C] flex items-start"
                          >
                            <span className="text-[#B87E5F] mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Publications Section */}
            <section id="Featured Publications" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Featured Publications
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {featuredPublications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md hover:border-[#B87E5F]/30"
                  >
                    <h3 className="text-xl font-medium text-[#4A5D4F] mb-2">
                      {pub.data.title}
                    </h3>
                    <p className="text-sm text-[#2C2C2C] mb-2">
                      {pub.data.authors.join(", ")}
                    </p>
                    <p className="text-sm text-[#2C2C2C]/80 mb-4">
                      {pub.data.venue} • {pub.data.year}
                    </p>
                    {pub.data.links && (
                      <div className="flex gap-4">
                        {pub.data.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#4A5D4F] hover:text-[#B87E5F] transition-colors duration-200"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Publications Section */}
            <section id="Publications" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Publications
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="flex gap-4 mb-6">
                <button
                  data-tooltip-id="global-tooltip"
                  data-tooltip-content="Filter publications"
                  onClick={() => setPubFilter("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pubFilter === "all"
                      ? "bg-[#4A5D4F] text-white"
                      : "bg-white/50 text-[#4A5D4F] hover:bg-[#4A5D4F]/10"
                  }`}
                >
                  All
                </button>
                {["journal", "conference", "preprint", "workshop"].map(
                  (type) => (
                    <button
                      key={type}
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={`Filter ${type} publications`}
                      onClick={() => setPubFilter(type)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        pubFilter === type
                          ? "bg-[#4A5D4F] text-white"
                          : "bg-white/50 text-[#4A5D4F] hover:bg-[#4A5D4F]/10"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
              <div className="space-y-4">
                {!publications ? (
                  <Skeleton count={5} height={200} className="mb-4" />
                ) : (
                  <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {publications
                      .filter(
                        (pub) => pubFilter === "all" || pub.data.type === pubFilter
                      )
                      .map((pub) => (
                        <div
                          key={pub.id}
                          className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md hover:border-[#B87E5F]/30"
                        >
                          <h3 className="text-xl font-medium text-[#4A5D4F] mb-2">
                            {pub.data.title}
                          </h3>
                          <p className="text-sm text-[#2C2C2C] mb-2">
                            {pub.data.authors.join(", ")}
                          </p>
                          <p className="text-sm text-[#2C2C2C]/80 mb-4">
                            {pub.data.venue} • {pub.data.year}
                          </p>
                          {pub.data.links && (
                            <div className="flex gap-4">
                              {pub.data.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-[#4A5D4F] hover:text-[#B87E5F] transition-colors duration-200"
                                >
                                  {link.text}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </motion.div>
                )}
              </div>
            </section>

            {/* Experience Section */}
            <section id="Experience" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Experience
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md hover:border-[#B87E5F]/30"
                  >
                    <h3 className="text-xl font-medium text-[#4A5D4F] mb-2">
                      {exp.data.title}
                    </h3>
                    <p className="text-[#2C2C2C] mb-2">{exp.data.organization}</p>
                    <p className="text-sm text-[#2C2C2C]/80">
                      {exp.data.start} - {exp.data.end || "Present"} •{" "}
                      {exp.data.location}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Talks Section */}
            <section id="Talks" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Talks
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="space-y-6">
                {talks.map((talk) => (
                  <div
                    key={talk.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#4A5D4F]/10 transition-all duration-500 hover:shadow-md hover:border-[#B87E5F]/30"
                  >
                    <h3 className="text-xl font-medium text-[#4A5D4F] mb-2">
                      {talk.data.title}
                    </h3>
                    <p className="text-[#2C2C2C] mb-2">{talk.data.event}</p>
                    <p className="text-sm text-[#2C2C2C]/80">
                      {talk.data.date} • {talk.data.location}
                    </p>
                    {talk.data.links && (
                      <div className="flex gap-4">
                        {talk.data.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#4A5D4F] hover:text-[#B87E5F] transition-colors duration-200"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Volunteering Section */}
            <section id="Volunteering" className="space-y-6">
              <h2 className="text-3xl font-light tracking-wide text-[#4A5D4F] relative inline-block group">
                Volunteering
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#B87E5F] group-hover:w-full transition-all duration-500" />
              </h2>
              <div className="space-y-6">
                {/* Add your volunteering content here */}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Add color picker */}
      <div className="fixed bottom-20 right-8">
        <HexColorPicker 
          color={themeColor} 
          onChange={setThemeColor} 
        />
      </div>
    </div>
  );
};

export default Portfolio;

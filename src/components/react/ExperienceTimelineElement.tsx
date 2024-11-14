
import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function ExperienceTimelineElement({ experiences }) {
  return (
    <VerticalTimeline>
      {experiences.map((exp, index) => (
        <VerticalTimelineElement
          key={index}
          date={`${exp.data.start} - ${exp.data.end || "Present"}`}
          iconStyle={{ background: 'rgb(15 118 110)', color: '#fff' }}
          contentStyle={{
            background: 'linear-gradient(to bottom right, white, rgb(240 253 244 / 0.3))',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}
          contentArrowStyle={{ borderRight: '7px solid rgb(15 118 110)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-medium text-teal-900 mb-2">
              {exp.data.title}
            </h3>
            <h4 className="text-teal-800 mb-2">{exp.data.company}</h4>
            <p className="text-sm text-slate-600 mb-2">{exp.data.location}</p>
            {exp.data.responsibilities && (
              <ul className="mt-4 space-y-2">
                {exp.data.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-sm text-slate-700 flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    {responsibility}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
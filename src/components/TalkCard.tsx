import { motion } from "framer-motion";

interface TalkProps {
  talk: {
    data: {
      title: string;
      event: string;
      date: string;
      location: string;
      links: Array<{ text: string; url: string }>;  // Updated type
    };
  };
  index: number;
}

export default function TalkCard({ talk, index }: TalkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-white to-teal-50/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-teal-500/5 rounded-lg transform transition-transform group-hover:scale-105 -z-10" />
      <h3 className="text-xl font-medium text-[#2C3E50] mb-2">
        {talk.data.title}
      </h3>
      <p className="text-sm text-[#2C2C2C] mb-2">{talk.data.event}</p>
      <p className="text-sm text-[#2C2C2C]/80 mb-4">
        {talk.data.date} • {talk.data.location}
      </p>
    </motion.div>
  );
}
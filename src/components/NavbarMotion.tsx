import { motion } from 'framer-motion';

export const AnimatedLogo = () => (
  <motion.a
    href="/"
    className="text-2xl font-medium tracking-wide text-[#4A5D4F] relative group flex items-center px-2 py-1"
    whileHover={{ scale: 1.01 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.span
      className="bg-gradient-to-r from-[#4A5D4F] to-[#B87E5F] bg-clip-text text-transparent font-semibold"
      whileHover={{ letterSpacing: "0.02em" }}
      transition={{ duration: 0.4 }}
    >
      About
    </motion.span>
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#B87E5F] to-[#9C6649] mx-2"
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 90, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 4,
        ease: "easeInOut"
      }}
    />
    <motion.span
      className="bg-gradient-to-r from-[#B87E5F] to-[#4A5D4F] bg-clip-text text-transparent font-semibold"
      whileHover={{ letterSpacing: "0.02em" }}
      transition={{ duration: 0.4 }}
    >
      Haryo
    </motion.span>
  </motion.a>
);

export const BackButton = () => {
  return (
    <motion.a
      href="/cv/"
      className="text-[#4A5D4F]"
      whileHover={{ x: -4, color: '#B87E5F' }}
      transition={{ duration: 0.2 }}
    >
      ← Back to CV
    </motion.a>
  );
};
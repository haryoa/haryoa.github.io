import { motion } from 'framer-motion';

export const AnimatedLogo = () => (
  <motion.a
    href="/"
    className="text-2xl font-medium tracking-wide text-[#2C3E50] relative group flex items-center px-2 py-1"
    whileHover={{ scale: 1.01 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.span
      className="bg-gradient-to-r from-[#2C3E50] to-[#16A085] bg-clip-text text-transparent font-semibold"
      whileHover={{ letterSpacing: "0.02em" }}
      transition={{ duration: 0.4 }}
    >
      About
    </motion.span>
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#16A085] to-[#2980B9] mx-2"
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
      className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] bg-clip-text text-transparent font-semibold"
      whileHover={{ letterSpacing: "0.02em" }}
      transition={{ duration: 0.4 }}
    >
      Haryo
    </motion.span>
  </motion.a>
);

export const AnimatedButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    className="px-4 py-2 text-[#2C3E50] relative"
    whileHover={{ scale: 1.05, color: '#16A085' }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    {children}
    <motion.div
      className="absolute -bottom-1 left-0 h-px bg-[#16A085]"
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
);

export const BackButton = () => {
  return (
    <motion.a
      href="/"
      className="text-[#2C3E50]"
      whileHover={{ x: -4, color: '#16A085' }}
      transition={{ duration: 0.2 }}
    >
      ← Back to Home
    </motion.a>
  );
};
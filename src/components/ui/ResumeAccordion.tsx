// components/Accordion.js
import { Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeAccordion = ({ summary, children, rightAction, isOpen, onClick }:any) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md mb-4">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 cursor-pointer"
        onClick={onClick}
      >
        <div>{summary}</div>
       {rightAction}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white dark:bg-gray-900">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeAccordion;

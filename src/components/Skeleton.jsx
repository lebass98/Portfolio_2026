import { motion } from 'framer-motion';

const Skeleton = ({ className }) => {
  return (
    <div className={`relative overflow-hidden bg-dark/5 rounded-[5px] ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-dark/10 to-transparent w-full h-full"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Thumbnail */}
      <Skeleton className="aspect-[16/10]" />
      <div className="px-2 space-y-4">
        {/* Title */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/2" />
        </div>
        {/* Underline */}
        <Skeleton className="h-[2px] w-full" />
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        {/* Stats */}
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

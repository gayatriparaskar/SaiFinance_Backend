import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = '', 
  variant = 'text', 
  width, 
  height 
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700";
  
  const variantClasses = {
    text: "rounded h-4",
    rectangular: "rounded-lg",
    circular: "rounded-full"
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined)
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="glass-effect border-slate-700/50 rounded-lg p-8 space-y-4">
      <div className="flex items-center mb-6">
        <Skeleton variant="circular" width={64} height={64} />
      </div>
      <Skeleton width="60%" height={24} className="mb-3" />
      <Skeleton width="100%" height={16} className="mb-4" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Skeleton variant="circular" width={8} height={8} className="mr-3" />
            <Skeleton width={`${60 + i * 10}%`} height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-effect border-slate-700/50 rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" width="100%" height={200} className="mb-0" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton width={80} height={20} className="rounded-full" />
        </div>
        <Skeleton width="80%" height={24} />
        <Skeleton width="100%" height={16} />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width={60} height={14} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width={80} height={14} />
          </div>
        </div>
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width={60} height={24} className="rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass-effect border-slate-700/50 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <Skeleton width="60%" height={32} className="mb-3 mx-auto" />
      <Skeleton width="80%" height={16} className="mx-auto" />
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="glass-effect border-slate-700/50 rounded-lg p-8">
      <div className="flex mb-6 gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={20} height={20} />
        ))}
      </div>
      <div className="space-y-3 mb-8">
        <Skeleton width="100%" height={16} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="95%" height={16} />
      </div>
      <div className="flex items-center border-t border-slate-700 pt-6">
        <Skeleton variant="circular" width={48} height={48} className="mr-4" />
        <div className="space-y-2">
          <Skeleton width={120} height={16} />
          <Skeleton width={100} height={14} />
        </div>
      </div>
    </div>
  );
}

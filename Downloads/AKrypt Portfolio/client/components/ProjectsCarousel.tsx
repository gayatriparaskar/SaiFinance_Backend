import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import fintech from '../assets/fintech.avif';
import healthcare from '../assets/healthCare.jpeg';
import elearningPlatform from '../assets/elearning Platform.avif';
import logisticsTracker from '../assets/logistics.avif';
import restaurantPOS from '../assets/restaurant.avif';
import cryptoExchange from '../assets/crypto-exchange.webp';
import hotelsBooking from '../assets/hotel booking.avif';
import sochSarees from '../assets/soch-sarees.avif';
import rangritiFashion from '../assets/rangriti-fashion.webp';
import adeshEnterprises from '../assets/andesh-enterprises.avif';
import mangatramJewelers from '../assets/mangatram-jewelers.avif';

const projects = [
  {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    description: 'Real-time financial analytics platform with advanced data visualization and trading insights.',
    image: fintech,
    tech: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js'],
    link: '/projects/fintech-dashboard',
    category: 'FinTech Solutions',
    duration: '8 weeks',
    team: '5 developers',
    gradient: 'from-green-600 to-emerald-600',
    status: 'Live'
  },
  {
    id: 'healthcare-system',
    title: 'Healthcare Management System',
    description: 'Comprehensive patient management system with appointment scheduling and medical records.',
    image: healthcare,
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'],
    link: '/projects/healthcare-system',
    category: 'Healthcare Technology',
    duration: '12 weeks',
    team: '6 developers',
    gradient: 'from-blue-600 to-cyan-600',
    status: 'Completed'
  },
  {
    id: 'elearning-platform',
    title: 'AI-Powered Learning Platform',
    description: 'Interactive e-learning platform with AI-driven personalized content and progress tracking.',
    image: elearningPlatform,
    tech: ['React', 'Python', 'TensorFlow', 'MongoDB', 'Docker'],
    link: '/projects/elearning-platform',
    category: 'EdTech Solutions',
    duration: '10 weeks',
    team: '7 developers',
    gradient: 'from-purple-600 to-indigo-600',
    status: 'Live'
  },
  {
    id: 'logistics-tracker',
    title: 'Smart Logistics Tracker',
    description: 'Real-time supply chain management system with GPS tracking and inventory optimization.',
    image: logisticsTracker,
    tech: ['Vue.js', 'Express', 'Redis', 'Socket.io'],
    link: '/projects/logistics-tracker',
    category: 'Logistics Technology',
    duration: '6 weeks',
    team: '4 developers',
    gradient: 'from-orange-600 to-red-600',
    status: 'In Development'
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant POS System',
    description: 'Complete point-of-sale solution with inventory management and customer analytics.',
    image: restaurantPOS,
    tech: ['React Native', 'Firebase', 'Stripe', 'Analytics'],
    link: '/projects/restaurant-pos',
    category: 'Retail Technology',
    duration: '5 weeks',
    team: '3 developers',
    gradient: 'from-yellow-600 to-orange-600',
    status: 'Completed'
  },
  {
    id: 'crypto-exchange',
    title: 'Cryptocurrency Exchange',
    description: 'Secure digital asset trading platform with advanced charting and portfolio management.',
    image: cryptoExchange,
    tech: ['Angular', 'Blockchain', 'WebSocket', 'Security'],
    link: '/projects/crypto-exchange',
    category: 'Blockchain Development',
    duration: '16 weeks',
    team: '8 developers',
    gradient: 'from-blue-600 to-indigo-600',
    status: 'Live'
  },
  {
    id: 'hotels-booking',
    title: 'Hotels.com Booking Platform',
    description: 'Comprehensive hotel booking platform with real-time availability and secure payment processing.',
    image: hotelsBooking,
    tech: ['React', 'Node.js', 'MongoDB', 'Payment Gateway', 'Maps API'],
    link: '/projects/hotels-booking',
    category: 'Travel & Hospitality',
    duration: '14 weeks',
    team: '6 developers',
    gradient: 'from-blue-600 to-indigo-600',
    status: 'Live'
  },
  {
    id: 'soch-sarees',
    title: 'Soch Sarees E-commerce',
    description: 'Premium saree collection platform with advanced filtering and virtual try-on features.',
    image: sochSarees,
    tech: ['React', 'Redux', 'Stripe', 'AR Technology', 'AWS'],
    link: '/projects/soch-sarees',
    category: 'Fashion E-commerce',
    duration: '10 weeks',
    team: '4 developers',
    gradient: 'from-pink-600 to-rose-600',
    status: 'Live'
  },
  {
    id: 'rangriti-fashion',
    title: 'Rangriti Fashion Store',
    description: 'Contemporary ethnic fashion platform with personalized recommendations and styling assistance.',
    image: rangritiFashion,
    tech: ['Vue.js', 'Nuxt.js', 'MySQL', 'ML Recommendations'],
    link: '/projects/rangriti-fashion',
    category: 'Fashion E-commerce',
    duration: '8 weeks',
    team: '5 developers',
    gradient: 'from-purple-600 to-pink-600',
    status: 'Live'
  },
  {
    id: 'adesh-enterprises',
    title: 'Adesh Enterprises Portal',
    description: 'B2B enterprise portal for industrial equipment and machinery with inventory management.',
    image: adeshEnterprises,
    tech: ['Angular', 'Spring Boot', 'Oracle DB', 'Enterprise Security'],
    link: '/projects/adesh-enterprises',
    category: 'Enterprise Solutions',
    duration: '12 weeks',
    team: '7 developers',
    gradient: 'from-gray-600 to-slate-600',
    status: 'Completed'
  },
  {
    id: 'mangatram-jewelers',
    title: 'Mangatram Jewelers Online',
    description: 'Luxury jewelry showcase platform with 360° product views and custom design configurator.',
    image: mangatramJewelers,
    tech: ['React', 'Three.js', '360° Viewer', 'Secure Payments'],
    link: '/projects/mangatram-jewelers',
    category: 'Luxury E-commerce',
    duration: '16 weeks',
    team: '6 developers',
    gradient: 'from-yellow-600 to-amber-600',
    status: 'Live'
  }
];

export function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Auto-scroll every 7 seconds
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 7000);

    return () => {
      clearInterval(autoScroll);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 ml-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-[0_0_320px] min-w-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full glass-effect border-slate-700/50 relative overflow-hidden">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0`}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                    <Link to={project.link}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button size="sm" className={`bg-gradient-to-r ${project.gradient} hover:opacity-90 border-0`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Category */}
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                    {project.category}
                  </Badge>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-gradient group-hover:text-glow transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs border-slate-600 text-slate-400 hover:border-purple-500 hover:text-purple-300 transition-colors"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="bg-slate-900/80 border-slate-600 hover:bg-slate-800 hover:border-purple-500 glow-primary backdrop-blur-sm disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="bg-slate-900/80 border-slate-600 hover:bg-slate-800 hover:border-purple-500 glow-primary backdrop-blur-sm disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 glow-primary scale-125'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

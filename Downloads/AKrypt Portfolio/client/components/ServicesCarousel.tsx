import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Code, Smartphone, Palette, BarChart3, Share2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const services = [
  {
    icon: Code,
    title: 'Website Development',
    description: 'Creating responsive, modern websites tailored to establish a strong online presence and attract your target audience.',
    features: ['Responsive Design', 'Modern Technologies', 'SEO Optimization', 'User-Friendly Interface'],
    gradient: 'from-purple-500 to-blue-500'
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Developing intuitive and high-performance mobile applications that deliver seamless user experiences across platforms.',
    features: ['Cross-Platform Apps', 'Native Development', 'UI/UX Design', 'App Store Deployment'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'Graphics Design',
    description: 'Providing custom graphic design services to ensure your brand stands out with visually appealing designs.',
    features: ['Logo Design', 'Branding Materials', 'Digital Assets', 'Marketing Graphics'],
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    icon: BarChart3,
    title: 'Data Research',
    description: 'Offering data research services to help businesses make informed decisions by analyzing trends and market data.',
    features: ['Market Analysis', 'User Behavior Study', 'Trend Research', 'Data Analytics'],
    gradient: 'from-teal-500 to-green-500'
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Developing targeted social media strategies to grow your audience, boost engagement, and drive results.',
    features: ['Content Creation', 'Paid Campaigns', 'Strategy Development', 'Engagement Growth'],
    gradient: 'from-green-500 to-pink-500'
  }
];

export function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    skipSnaps: false,
    dragFree: true
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
    
    // Auto-scroll
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

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
        <div className="flex gap-6 ml-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="flex-[0_0_350px] min-w-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full glass-effect hover-glow border-slate-700/50 relative overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <div className="flex items-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} transition-transform duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-gradient group-hover:text-glow transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (idx * 0.1), duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                        <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-purple-500 glow-primary disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-purple-500 glow-primary disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-purple-500 glow-primary' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

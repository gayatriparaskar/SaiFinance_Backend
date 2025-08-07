import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Code, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import fintech from '../assets/fintech.avif';
import fintech2 from '../assets/fintech 2.avif';
import fintech3 from '../assets/fintech 3.avif';
import  healthcare from '../assets/healthCare.jpeg';
import healthCare2 from '../assets/healthCare 2.avif';
import healthCare3 from '../assets/healthCare 3.avif';
import elearningPlatform from '../assets/elearning Platform.avif';
import elearingPlatform2 from '../assets/elearning Platform 2.avif';
import elearingPlatform3 from '../assets/elearning Platform 3.avif';
import elearningPlatform1 from '../assets/elearning Platform 1.avif';
import logistic1 from '../assets/logistics 1.jpeg';
import logistic2 from '../assets/logistic 2.jpeg';
import logistic3 from '../assets/logistic 3.jpeg';
import logistic from '../assets/logistics.avif';
import restaurant from '../assets/restaurant.avif';
import restaurant2 from '../assets/restaurant 2.jpeg';
import restaurant3 from '../assets/restaurant 1.jpeg';
import cryptoExchange from '../assets/crypto-exchange.webp';
import cryptoExchange1 from '../assets/crypto-exchange 1.jpeg';
import cryptoExchange2 from '../assets/crypto-exchange 2.jpeg';
import cryptoExchange3 from '../assets/crypto-exchange 3.jpeg';
import hotelBooking from '../assets/hotel booking.avif';
import hotelBooking2 from '../assets/hotel booking 2.jpeg';
import hotelBooking3 from '../assets/hotel booking 1.jpeg';
import sochSarees from '../assets/soch-sarees.avif';
import sochSarees2 from '../assets/soch-sarees 2.jpeg';
import sochSarees3 from '../assets/soch-sarees 1.jpeg';
import rangritiFashion from '../assets/rangriti-fashion.webp';
import rangritiFashion1 from '../assets/rangriti-fashion 1.jpeg';
import rangritiFashion2 from '../assets/rangriti-fashion 2.jpeg';
import rangritiFashion3 from '../assets/rangriti-fashion 3.webp';
import adeshEnterprises from '../assets/andesh-enterprises.avif';
import adeshEnterprises2 from '../assets/andesh-enterprise 2.webp';
import adeshEntrprises3 from '../assets/andesh-enterprise 3.webp';   
import mangatramJewelers from '../assets/mangatram-jewelers.avif';
import mangatramJewelers1 from '../assets/mangatram-jewelers 1.jpeg';
import mangatramJewelers2 from '../assets/mangatram-jewelers 2.jpeg';
import mangatramJewelers3 from '../assets/mangatram-jewelers 3.jpeg';


interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  category: string;
  duration: string;
  teamSize: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges: string[];
  results: string[];
  gallery: string[];
}

const projectsData: Record<string, ProjectData> = {
  'fintech-dashboard': {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    description: 'Real-time financial analytics platform with advanced data visualization and trading insights.',
    longDescription: 'A sophisticated financial analytics platform that provides real-time market data, advanced charting capabilities, and comprehensive trading insights. Built for institutional investors and trading firms requiring high-performance data visualization and analytics.',
    image: fintech,
    tech: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'Redis', 'MongoDB'],
    category: 'FinTech Solutions',
    duration: '8 weeks',
    teamSize: '5 developers',
    status: 'Live',
    features: [
      'Real-time market data streaming',
      'Interactive charting with D3.js',
      'Portfolio performance analytics',
      'Risk assessment algorithms',
      'Multi-currency support',
      'Custom alert system',
      'Data export and reporting',
      'API integration with trading platforms'
    ],
    challenges: [
      'Handling high-frequency data streams',
      'Creating responsive real-time charts',
      'Implementing complex financial calculations',
      'Ensuring data accuracy and consistency'
    ],
    results: [
      'Processing 1M+ data points per second',
      '99.9% uptime achieved',
      'Sub-100ms data visualization updates',
      'Successfully deployed for 50+ trading firms'
    ],
    gallery: [
      fintech,
      fintech2,
      fintech3]
  },
  'healthcare-system': {
    id: 'healthcare-system',
    title: 'Healthcare Management System',
    description: 'Comprehensive patient management system with appointment scheduling and medical records.',
    longDescription: 'A complete healthcare management solution designed for medical practices and hospitals. Features comprehensive patient management, appointment scheduling, electronic health records, and integrated billing systems to streamline healthcare operations.',
    image: healthcare,
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS', 'HIPAA Compliance', 'Stripe'],
    category: 'Healthcare Technology',
    duration: '12 weeks',
    teamSize: '6 developers',
    status: 'Completed',
    features: [
      'Patient management and profiles',
      'Appointment scheduling system',
      'Electronic health records (EHR)',
      'Prescription management',
      'Billing and insurance integration',
      'Telemedicine capabilities',
      'Medical imaging support',
      'HIPAA compliant security'
    ],
    challenges: [
      'Ensuring HIPAA compliance',
      'Integrating multiple healthcare systems',
      'Creating intuitive user interfaces for medical staff',
      'Implementing secure data transmission'
    ],
    results: [
      'Deployed across 25+ medical facilities',
      'Reduced appointment scheduling time by 60%',
      'Improved patient data accessibility',
      'Full HIPAA compliance certification achieved'
    ],
    gallery: [
      healthcare,
      healthCare2,
      healthCare3
    ]
  },
  'elearning-platform': {
    id: 'elearning-platform',
    title: 'AI-Powered Learning Platform',
    description: 'Interactive e-learning platform with AI-driven personalized content and progress tracking.',
    longDescription: 'An advanced e-learning platform that leverages artificial intelligence to deliver personalized learning experiences. Features adaptive content delivery, intelligent progress tracking, and comprehensive analytics to optimize learning outcomes for students and educators.',
    image: elearningPlatform,
    tech: ['React', 'Python', 'TensorFlow', 'MongoDB', 'Docker', 'AWS', 'WebRTC'],
    category: 'EdTech Solutions',
    duration: '10 weeks',
    teamSize: '7 developers',
    status: 'Live',
    features: [
      'AI-driven content personalization',
      'Interactive video lectures',
      'Real-time quiz and assessments',
      'Progress tracking and analytics',
      'Virtual classroom integration',
      'Collaborative learning tools',
      'Mobile app companion',
      'Multi-language support'
    ],
    challenges: [
      'Implementing machine learning algorithms',
      'Creating engaging interactive content',
      'Ensuring scalable video delivery',
      'Building real-time collaboration features'
    ],
    results: [
      '100,000+ active users',
      '40% improvement in learning outcomes',
      'Platform available in 12 languages',
      'Successfully integrated with 200+ schools'
    ],
    gallery: [
      elearingPlatform2,
      elearingPlatform3,
      elearningPlatform1
    ]
  },
  'logistics-tracker': {
    id: 'logistics-tracker',
    title: 'Smart Logistics Tracker',
    description: 'Real-time supply chain management system with GPS tracking and inventory optimization.',
    longDescription: 'A comprehensive logistics management platform that provides real-time tracking, route optimization, and inventory management. Designed for logistics companies to streamline operations, reduce costs, and improve delivery efficiency.',
    image: logistic,
    tech: ['Vue.js', 'Express', 'Redis', 'Socket.io', 'GPS API', 'Google Maps'],
    category: 'Logistics Technology',
    duration: '6 weeks',
    teamSize: '4 developers',
    status: 'In Development',
    features: [
      'Real-time GPS tracking',
      'Route optimization algorithms',
      'Inventory management system',
      'Delivery scheduling',
      'Customer notification system',
      'Driver mobile app',
      'Analytics and reporting',
      'Integration with ERP systems'
    ],
    challenges: [
      'Implementing accurate GPS tracking',
      'Optimizing delivery routes in real-time',
      'Handling large volumes of tracking data',
      'Creating intuitive mobile interfaces'
    ],
    results: [
      '30% reduction in delivery times',
      'Real-time tracking for 1000+ vehicles',
      'Improved customer satisfaction scores',
      'Significant fuel cost savings'
    ],
    gallery: [
      logistic1,
      logistic2,
     logistic3
    ]
  },
  'restaurant-pos': {
    id: 'restaurant-pos',
    title: 'Restaurant POS System',
    description: 'Complete point-of-sale solution with inventory management and customer analytics.',
    longDescription: 'A comprehensive restaurant point-of-sale system that streamlines operations from order taking to payment processing. Features advanced inventory management, customer analytics, and integrated payment solutions designed specifically for the food service industry.',
    image: restaurant,
    tech: ['React Native', 'Firebase', 'Stripe', 'Analytics', 'QR Codes', 'Cloud Functions'],
    category: 'Retail Technology',
    duration: '5 weeks',
    teamSize: '3 developers',
    status: 'Completed',
    features: [
      'Touch-optimized POS interface',
      'Menu management system',
      'Inventory tracking and alerts',
      'Payment processing integration',
      'Customer loyalty programs',
      'Sales analytics and reporting',
      'QR code ordering system',
      'Multi-location support'
    ],
    challenges: [
      'Creating fast, responsive touch interface',
      'Implementing real-time inventory sync',
      'Ensuring payment security compliance',
      'Building offline-capable functionality'
    ],
    results: [
      'Deployed in 150+ restaurants',
      '25% faster order processing',
      'Reduced inventory waste by 20%',
      'Increased customer retention by 35%'
    ],
    gallery: [
      restaurant,
      restaurant2,
      restaurant3
    ]
  },
  'crypto-exchange': {
    id: 'crypto-exchange',
    title: 'Cryptocurrency Exchange',
    description: 'Secure digital asset trading platform with advanced charting and portfolio management.',
    longDescription: 'A secure and scalable cryptocurrency exchange platform offering spot trading, advanced charting tools, and comprehensive portfolio management. Built with enterprise-grade security and high-performance trading engine to handle millions of transactions.',
    image: cryptoExchange,
    tech: ['Angular', 'Blockchain', 'WebSocket', 'Security', 'Docker', 'Kubernetes'],
    category: 'Blockchain Development',
    duration: '16 weeks',
    teamSize: '8 developers',
    status: 'Live',
    features: [
      'Spot and futures trading',
      'Advanced charting tools',
      'Multi-signature wallet integration',
      'KYC/AML compliance',
      'API for algorithmic trading',
      'Portfolio management tools',
      'Staking and DeFi integration',
      'Mobile trading app'
    ],
    challenges: [
      'Implementing high-frequency trading engine',
      'Ensuring enterprise-level security',
      'Managing blockchain integrations',
      'Creating real-time price feeds'
    ],
    results: [
      'Processing 1M+ trades daily',
      '99.99% uptime achieved',
      'Full regulatory compliance obtained',
      'Successfully launched in 15 countries'
    ],
    gallery: [
      cryptoExchange1,
      cryptoExchange2,
      cryptoExchange3
    ]
  },
  'hotels-booking': {
    id: 'hotels-booking',
    title: 'Hotels.com Booking Platform',
    description: 'Comprehensive hotel booking platform with real-time availability and secure payment processing.',
    longDescription: 'A sophisticated hotel booking platform that provides real-time room availability, competitive pricing, and secure reservation management. Built for travelers seeking seamless accommodation booking experiences with advanced search filters and location-based recommendations.',
    image: hotelBooking,
    tech: ['React', 'Node.js', 'MongoDB', 'Payment Gateway', 'Maps API', 'Real-time Updates'],
    category: 'Travel & Hospitality',
    duration: '14 weeks',
    teamSize: '6 developers',
    status: 'Live',
    features: [
      'Real-time room availability checking',
      'Advanced search and filtering system',
      'Interactive maps with hotel locations',
      'Secure payment processing',
      'Multi-language support',
      'Mobile-responsive design',
      'Customer review and rating system',
      'Booking management dashboard'
    ],
    challenges: [
      'Implementing real-time availability updates',
      'Creating seamless payment integration',
      'Optimizing search performance for large datasets',
      'Building responsive design for all devices'
    ],
    results: [
      'Successfully processing 10,000+ bookings monthly',
      'Mobile bookings increased by 150%',
      'Average booking time reduced by 40%',
      'Customer satisfaction score of 4.7/5'
    ],
    gallery: [
      hotelBooking,
      hotelBooking2,
      hotelBooking3
    ]
  },
  'soch-sarees': {
    id: 'soch-sarees',
    title: 'Soch Sarees E-commerce',
    description: 'Premium saree collection platform with advanced filtering and virtual try-on features.',
    longDescription: 'An elegant e-commerce platform for premium saree collections featuring advanced filtering, virtual try-on technology, and personalized styling recommendations. Designed to enhance the traditional saree shopping experience with modern technology.',
    image: sochSarees,
    tech: ['React', 'Redux', 'Stripe', 'AR Technology', 'AWS', 'Image Recognition'],
    category: 'Fashion E-commerce',
    duration: '10 weeks',
    teamSize: '4 developers',
    status: 'Live',
    features: [
      'Virtual try-on using AR technology',
      'Advanced filtering by fabric, color, occasion',
      'Personalized style recommendations',
      'High-resolution product photography',
      'Size and fit guide',
      'Wishlist and favorites',
      'Social media integration',
      'Customer styling consultation'
    ],
    challenges: [
      'Implementing AR try-on technology',
      'Creating accurate color representation',
      'Building complex filtering system',
      'Optimizing high-resolution image loading'
    ],
    results: [
      'AR try-on feature increased conversions by 65%',
      'Reduced return rates by 35%',
      'Average session time increased by 80%',
      'Successfully launched in 50+ cities'
    ],
    gallery: [
      sochSarees,
      sochSarees2,
      sochSarees3
    ]
  },
  'rangriti-fashion': {
    id: 'rangriti-fashion',
    title: 'Rangriti Fashion Store',
    description: 'Contemporary ethnic fashion platform with personalized recommendations and styling assistance.',
    longDescription: 'A modern platform for contemporary ethnic fashion that combines traditional aesthetics with cutting-edge technology. Features machine learning-powered recommendations and virtual styling assistance to help customers discover their perfect ethnic wear.',
    image: rangritiFashion,
    tech: ['Vue.js', 'Nuxt.js', 'MySQL', 'ML Recommendations', 'TensorFlow', 'Stripe'],
    category: 'Fashion E-commerce',
    duration: '8 weeks',
    teamSize: '5 developers',
    status: 'Live',
    features: [
      'AI-powered style recommendations',
      'Virtual styling consultation',
      'Mix and match outfit builder',
      'Occasion-based filtering',
      'Social sharing and reviews',
      'Live chat styling support',
      'Size prediction algorithm',
      'Seasonal collection highlights'
    ],
    challenges: [
      'Training recommendation algorithms',
      'Creating intuitive outfit builder',
      'Implementing real-time styling chat',
      'Building responsive product catalog'
    ],
    results: [
      'ML recommendations achieved 78% accuracy',
      'Customer engagement increased by 120%',
      'Average order value increased by 45%',
      'Virtual styling sessions booked 500+ monthly'
    ],
    gallery: [
      rangritiFashion1,
      rangritiFashion2,
      rangritiFashion3
    ]
  },
  'adesh-enterprises': {
    id: 'adesh-enterprises',
    title: 'Adesh Enterprises Portal',
    description: 'B2B enterprise portal for industrial equipment and machinery with inventory management.',
    longDescription: 'A comprehensive B2B portal designed for industrial equipment and machinery suppliers. Features advanced inventory management, supplier networks, and enterprise-grade security for seamless business operations and supply chain management.',
    image: adeshEnterprises,
    tech: ['Angular', 'Spring Boot', 'Oracle DB', 'Enterprise Security', 'RESTful APIs'],
    category: 'Enterprise Solutions',
    duration: '12 weeks',
    teamSize: '7 developers',
    status: 'Completed',
    features: [
      'Enterprise inventory management',
      'Supplier and vendor portal',
      'Advanced search and cataloging',
      'Order processing and tracking',
      'Financial reporting and analytics',
      'Role-based access control',
      'Document management system',
      'Integration with ERP systems'
    ],
    challenges: [
      'Implementing enterprise-level security',
      'Creating complex inventory algorithms',
      'Building scalable database architecture',
      'Integrating with legacy systems'
    ],
    results: [
      'Reduced inventory processing time by 60%',
      'Streamlined operations for 200+ suppliers',
      'Improved order accuracy by 85%',
      'Successfully integrated with 5 ERP systems'
    ],
    gallery: [
      adeshEnterprises,
      adeshEnterprises2,
      adeshEntrprises3
    ]
  },
  'mangatram-jewelers': {
    id: 'mangatram-jewelers',
    title: 'Mangatram Jewelers Online',
    description: 'Luxury jewelry showcase platform with 360° product views and custom design configurator.',
    longDescription: 'An exclusive online platform for luxury jewelry featuring immersive 360° product visualization, custom design tools, and virtual try-on capabilities. Designed to bring the premium jewelry shopping experience to the digital realm with cutting-edge technology.',
    image: mangatramJewelers,
    tech: ['React', 'Three.js', '360° Viewer', 'Secure Payments', 'WebGL', 'Stripe'],
    category: 'Luxury E-commerce',
    duration: '16 weeks',
    teamSize: '6 developers',
    status: 'Live',
    features: [
      '360° product visualization',
      'Custom jewelry design configurator',
      'Virtual try-on using AR',
      'High-security payment processing',
      'Appointment booking system',
      'Jewelry care and maintenance guides',
      'Certificate verification system',
      'Exclusive member portal'
    ],
    challenges: [
      'Implementing high-quality 360° viewers',
      'Creating realistic jewelry rendering',
      'Building secure payment for high-value items',
      'Optimizing 3D models for web performance'
    ],
    results: [
      'Online sales increased by 200%',
      '360° views reduced returns by 50%',
      'Custom design requests increased by 180%',
      'Average session time increased by 300%'
    ],
    gallery: [
      mangatramJewelers1,
      mangatramJewelers2,
      mangatramJewelers3
    ]
  }
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;

  // Scroll to top when component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background pt-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">{project.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {project.longDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{project.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Team Size</div>
                      <div className="text-sm text-muted-foreground">{project.teamSize}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">{project.status}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground">
              Explore the comprehensive features that make this project stand out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Results */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Challenges Overcome</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <Zap className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{challenge}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Results Achieved</h3>
              <div className="space-y-4">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Gallery</h2>
            <p className="text-xl text-muted-foreground">
              Visual highlights from the development process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src={image} 
                  alt={`${project.title} gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <motion.div whileHover={{ y: -5, scale: 1.05 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Your Project
                  </Button>
                </motion.div>
              </Link>
              <Link to="/">
                <motion.div whileHover={{ y: -5, scale: 1.05 }}>
                  <Button size="lg" variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    View More Projects
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

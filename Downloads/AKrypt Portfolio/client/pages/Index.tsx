import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter, Code, Sparkles, Rocket, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { ServicesCarousel } from '../components/ServicesCarousel';
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { FloatingContactButton } from '../components/FloatingContactButton';
import { BackToTop } from '../components/BackToTop';
import { CursorTrail } from '../components/CursorTrail';
import { useParallax } from '../hooks/useParallax';

export default function Index() {
  const parallaxOffset = useParallax(0.5);

  const stats = [
    { number: '75+', label: 'Projects Delivered', icon: Target },
    { number: '40+', label: 'Happy Clients', icon: Users },
    { number: '2024', label: 'Established', icon: Sparkles },
    { number: '24/7', label: 'Support', icon: Zap }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechStart Inc.',
      content: 'TechFlow delivered an exceptional web application that exceeded our expectations. Their technical expertise and attention to detail are outstanding.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, InnovateLab',
      content: 'Working with TechFlow was a game-changer for our startup. They built a scalable platform that helped us grow 300% in just 6 months.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director of IT, GlobalCorp',
      content: 'The team at TechFlow is incredibly professional and delivered our enterprise solution on time and within budget. Highly recommended!',
      rating: 5,
      avatar: 'ER'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements with Parallax */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl"
            style={{ transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.1}px)` }}
          ></div>
        </div>

        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-purple-500/20 mb-8 glow-primary"
            >
              <Rocket className="w-5 h-5 mr-3 text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Empowering Businesses Through Technology
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Transform Your
              </span>
              <br />
              <span className="text-white text-glow">
                Digital Future
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              We deliver tailored IT services that drive efficiency, security, and digital transformation.
              From web development to social media marketing, we help businesses thrive in the digital era.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Button size="lg" className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg border-0">
                  <Rocket className="mr-3 h-6 w-6" />
                  Start Your Project
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="glass-effect border-slate-600 text-white hover:bg-slate-800/50 hover:border-purple-500 px-8 py-4 text-lg font-semibold">
                  <Code className="mr-3 h-6 w-6" />
                  View Our Work
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-glow">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 100 
                }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Card className="glass-effect border-slate-700/50 hover-glow p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-gradient mb-3 group-hover:text-glow transition-all">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-purple-500/20 mb-6 glow-primary"
            >
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Our Expertise</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient text-glow">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive IT services designed to empower your business through innovative technology solutions and exceptional support.
            </p>
          </motion.div>

          <ServicesCarousel />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-glow">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-purple-500/20 mb-6 glow-primary"
            >
              <Target className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Our Work</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient text-glow">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Explore some of our recent work and see how we've helped businesses achieve their digital goals.
            </p>
          </motion.div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient text-glow">
              What Our <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our satisfied clients have to say about our work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass-effect border-slate-700/50 hover-glow relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-slate-300 mb-8 italic leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center border-t border-slate-700 pt-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-glow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-gradient text-glow">
                About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Akrypt IT Solutions</span>
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                We are a dynamic IT solutions provider based in Burhanpur, Madhya Pradesh, dedicated to
                empowering businesses through tailored technology services that drive efficiency and security.
              </p>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Established in 2024, our mission is to elevate technology for businesses by offering innovative
                solutions and exceptional support. We help clients thrive in the digital landscape through
                comprehensive services ranging from web development to social media marketing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <motion.div 
                  className="flex items-center p-6 glass-effect rounded-xl border border-slate-700/50 hover-glow"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Users className="w-8 h-8 text-purple-400 mr-4" />
                  <div>
                    <div className="font-bold text-lg text-white">Expert Team</div>
                    <div className="text-sm text-slate-400">20+ Specialists</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center p-6 glass-effect rounded-xl border border-slate-700/50 hover-glow"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Zap className="w-8 h-8 text-purple-400 mr-4" />
                  <div>
                    <div className="font-bold text-lg text-white">Fast Delivery</div>
                    <div className="text-sm text-slate-400">On-time Projects</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square glass-effect rounded-3xl p-12 border border-slate-700/50 relative overflow-hidden hover-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl font-black text-gradient mb-6">
                      75+
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">Projects Delivered</div>
                    <div className="text-slate-400">Empowering Businesses</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient text-glow">
              Let's <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge technology? Let's discuss your project and bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { icon: Mail, title: 'Email Us', info: 'akryptitsolutions@gmail.com' },
                { icon: Phone, title: 'Call Us', info: '+91 78980 79499' },
                { icon: MapPin, title: 'Visit Us', info: '3rd Floor, Shankar Shree Complex, Burhanpur, MP 450331' }
              ].map((contact, index) => (
                <motion.div 
                  key={contact.title}
                  whileHover={{ scale: 1.05, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center p-8 glass-effect rounded-xl border border-slate-700/50 hover-glow group"
                >
                  <contact.icon className="w-8 h-8 text-purple-400 mr-6" />
                  <div>
                    <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">{contact.title}</h3>
                    <p className="text-slate-400 text-lg">{contact.info}</p>
                  </div>
                </motion.div>
              ))}

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect border-slate-700/50 hover-glow">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gradient text-glow mb-8">Start Your Project</h3>
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-slate-300">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-slate-300">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-slate-300">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-slate-300">Project Type</label>
                      <select className="w-full px-4 py-3 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>Digital Transformation</option>
                        <option>Consulting</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-slate-300">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    
                    <motion.div whileHover={{ y: -3, scale: 1.02 }}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 text-lg border-0 glow-primary">
                        Send Message
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50"></div>
                  <div className="relative bg-white p-2 rounded-full shadow-2xl border-2 border-purple-300/50">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUBrC1Y6NCcuOkzNAmVZQ00P7LvvBU8uG6ew&s"
                      alt="Akrypt IT Solutions Logo"
                      className="h-12 w-12 object-contain rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Akrypt IT Solutions
                  </span>
                  <span className="text-xs text-slate-400 font-medium tracking-wider">
                    EMPOWERING BUSINESSES
                  </span>
                </div>
              </div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                Empowering businesses through tailored IT services that drive efficiency and security.
                Your partner in digital transformation.
              </p>
              <p className="text-sm text-slate-500">
                © 2024 Akrypt IT Solutions Pvt Ltd. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-slate-400">
                {['Website Development', 'App Development', 'Graphics Design', 'Social Media Marketing'].map((item, index) => (
                  <li key={item}>
                    <a href="#" className="hover:text-purple-400 transition-colors flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></div>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-400">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Careers', href: '#' }
                ].map((item, index) => (
                  <li key={item.name}>
                    <a href={item.href} className="hover:text-purple-400 transition-colors flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-3"></div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced UX Components */}
      <CursorTrail />
      <FloatingContactButton />
      <BackToTop />
    </div>
  );
}

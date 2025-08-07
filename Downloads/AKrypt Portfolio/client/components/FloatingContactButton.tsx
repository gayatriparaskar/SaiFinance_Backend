import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function FloatingContactButton() {
  // Temporarily disabled to debug framer-motion error
  return null;

  const [isOpen, setIsOpen] = useState(false);
  const [showQuickForm, setShowQuickForm] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      label: 'Call Us',
      action: () => window.open('tel:+917898079499'),
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.1
    },
    {
      icon: Mail,
      label: 'Email Us',
      action: () => window.open('mailto:akryptitsolutions@gmail.com'),
      gradient: 'from-blue-500 to-purple-500',
      delay: 0.2
    },
    {
      icon: Send,
      label: 'Quick Message',
      action: () => setShowQuickForm(true),
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.3
    }
  ];

  return (
    <>
      {/* Main FAB */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        {/* Contact Options */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute bottom-16 right-0 space-y-3">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={option.label}
                  initial={{ opacity: 0, x: 50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.5 }}
                  transition={{ delay: option.delay, type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3"
                >
                  <span className="bg-slate-900/90 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border border-slate-700">
                    {option.label}
                  </span>
                  <motion.button
                    onClick={option.action}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <option.icon className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/25 transition-shadow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
          <MessageCircle className="w-7 h-7 relative z-10" />
        </motion.button>
      </motion.div>

      {/* Quick Message Modal */}
      <AnimatePresence>
        {showQuickForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            onClick={() => setShowQuickForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="glass-effect border-slate-700/50 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Quick Message</h3>
                    <button
                      onClick={() => setShowQuickForm(false)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
                      <textarea 
                        rows={3}
                        className="w-full px-3 py-2 glass-effect border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold border-0"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowQuickForm(false)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

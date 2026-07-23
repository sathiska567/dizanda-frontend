import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-luxury-cream text-luxury-charcoal px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-extreme text-luxury-muted mb-3">Get In Touch</p>
        <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">Bespoke Consultations</h1>
        <p className="text-xs text-luxury-muted leading-relaxed font-light">
          We invite you to reach out for wedding consultations, private event bookings, or custom pastry inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-10 bg-luxury-sand/30 p-8 md:p-12 border border-luxury-sand"
        >
          <div>
            <h2 className="text-2xl font-serif mb-6">The Atelier Store</h2>
            <p className="text-xs text-luxury-muted leading-relaxed font-light mb-8">
              Visit our Flagship Boutique for intimate tasting sessions and custom ordering consultations.
            </p>
          </div>

          <div className="space-y-6 text-xs font-light">
            <div className="flex items-start space-x-4">
              <MapPin size={18} className="text-luxury-champagne shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-luxury-charcoal uppercase tracking-wider text-[10px] mb-1">Address</p>
                <p className="text-luxury-muted">742 Editorial Avenue, Design District, NY 10012</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone size={18} className="text-luxury-champagne shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-luxury-charcoal uppercase tracking-wider text-[10px] mb-1">Direct Line</p>
                <p className="text-luxury-muted">+1 (800) 492-8392</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail size={18} className="text-luxury-champagne shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-luxury-charcoal uppercase tracking-wider text-[10px] mb-1">Inquiries</p>
                <p className="text-luxury-muted">concierge@dizanda.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock size={18} className="text-luxury-champagne shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-luxury-charcoal uppercase tracking-wider text-[10px] mb-1">Hours</p>
                <p className="text-luxury-muted">Tuesday – Sunday: 10:00 AM – 7:00 PM</p>
                <p className="text-luxury-muted">Monday: Closed for Commissions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 bg-white p-8 md:p-12 border border-luxury-sand/60 shadow-sm"
        >
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-luxury-champagne text-xs uppercase tracking-extreme block">Inquiry Received</span>
              <h3 className="text-3xl font-serif">Thank You</h3>
              <p className="text-xs text-luxury-muted max-w-md mx-auto leading-relaxed">
                Our concierge desk has received your details. A member of our team will reach out within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 border border-luxury-charcoal px-6 py-2.5 text-xs uppercase tracking-luxury hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-luxury text-luxury-muted mb-2">First Name</label>
                  <input required type="text" className="w-full bg-luxury-cream/50 border border-luxury-sand px-4 py-3 text-xs focus:outline-none focus:border-luxury-champagne" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxury text-luxury-muted mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-luxury-cream/50 border border-luxury-sand px-4 py-3 text-xs focus:outline-none focus:border-luxury-champagne" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-luxury-muted mb-2">Email Address</label>
                <input required type="email" className="w-full bg-luxury-cream/50 border border-luxury-sand px-4 py-3 text-xs focus:outline-none focus:border-luxury-champagne" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-luxury-muted mb-2">Inquiry Type</label>
                <select className="w-full bg-luxury-cream/50 border border-luxury-sand px-4 py-3 text-xs focus:outline-none focus:border-luxury-champagne text-luxury-charcoal">
                  <option>Bespoke Wedding Cake</option>
                  <option>Private Event Catering</option>
                  <option>Press & Partnerships</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-luxury-muted mb-2">Message</label>
                <textarea required rows={5} className="w-full bg-luxury-cream/50 border border-luxury-sand px-4 py-3 text-xs focus:outline-none focus:border-luxury-champagne" />
              </div>

              <button 
                type="submit" 
                className="w-full bg-luxury-charcoal text-luxury-cream py-4 text-xs uppercase tracking-extreme hover:bg-luxury-champagne hover:text-luxury-charcoal transition-all duration-300"
              >
                Submit Consultation Request
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
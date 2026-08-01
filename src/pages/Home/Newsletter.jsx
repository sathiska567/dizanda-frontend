export default function Newsletter() {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-luxury-sand/40 border-t border-luxury-sand">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="text-xs uppercase tracking-extreme text-luxury-muted">Private Atelier List</p>
        <h2 className="text-3xl md:text-4xl font-serif font-light text-luxury-charcoal">
          Receive Exclusive Seasonal Tasting Invitations
        </h2>
        <p className="text-xs text-luxury-muted font-light max-w-md mx-auto leading-relaxed">
          Subscribers receive early access to seasonal flavor releases and private consultation slots.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="bg-white border border-luxury-sand px-4 py-3 text-xs flex-grow focus:outline-none focus:border-luxury-champagne"
            required
          />
          <button 
            type="submit" 
            className="bg-luxury-charcoal text-luxury-cream px-6 py-3 text-xs uppercase tracking-luxury hover:bg-luxury-champagne hover:text-luxury-charcoal transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
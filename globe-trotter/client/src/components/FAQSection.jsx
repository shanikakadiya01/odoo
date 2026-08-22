import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I build a multi-city itinerary?",
    answer: "Simply navigate to the 'Trip Builder' tab. From there, you can search and add multiple cities to your trip, adjust dates, and view the total estimated cost as you plan."
  },
  {
    question: "Is the budget calculator accurate?",
    answer: "Our budget calculator uses aggregated data to provide a strong estimate of average daily costs per city, covering food, transport, and attractions. However, actual costs will vary based on your personal travel style."
  },
  {
    question: "Can I share my itinerary with friends?",
    answer: "Yes! Once you have saved a trip, click the 'Share' icon in the My Trips dashboard or Trip Builder to generate a public link that anyone can view."
  },
  {
    question: "Do I need an account to use Globe Trotter?",
    answer: "You can explore destinations without an account, but to save trips, utilize the AI assistant, or share itineraries, you'll need to create a free account."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <HelpCircle size={28} className="text-cyan" />
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass-panel ${openIndex === index ? 'is-open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              <div className="faq-answer-wrapper" style={{ height: openIndex === index ? 'auto' : '0' }}>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 60px 0;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
        }
        
        .faq-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          justify-content: center;
        }

        .faq-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .faq-item:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .faq-item.is-open {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          font-family: var(--font-heading);
          cursor: pointer;
          text-align: left;
        }

        .faq-question:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .faq-answer-wrapper {
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 24px 24px 24px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

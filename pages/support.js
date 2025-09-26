// pages/support.js
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import FaqItem from '../components/support/FaqItem';
import AnimateOnScroll from '../components/AnimateonScroll';
import SupportTicketForm from '../components/support/SupportTicketForm';
import '../styles/Support.css';

const SupportPage = ({ faqData, categories }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleToggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase();
    if (!trimmedSearch && selectedCategory === 'All') {
      return faqData;
    }
    return faqData.filter((faq) => {
      const matchSearch = trimmedSearch
        ? faq.question.toLowerCase().includes(trimmedSearch) ||
          faq.answer.toLowerCase().includes(trimmedSearch)
        : true;
      const matchCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory, faqData]);

  return (
    <div className="support-root">
      {/* Header */}
      <div className="support-banner">
        <Image
          src="/images/Support.webp"
          alt="Illustration representing support services"
          width={1000}
          height={1000}
          className="support-bg-img"
          priority
        />
        <AnimateOnScroll className="scroll-animate" delay={100}>
          <div className="support-header-content">
            <h1 className="support-title">Need Help?</h1>
            <div className="text-overlay">
              <p className="support-desc">
                Our support team is here to assist you 24/7
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Main Content */}
      <div className="support-main-bg">
        <div className="support-main-container">
          <div className="support-tabs">
            {['faq', 'ticket'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`support-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'faq'
                  ? 'Frequently Asked Questions'
                  : 'Support Ticket'}
              </button>
            ))}
          </div>

          <div className="support-content">
            {activeTab === 'faq' && (
              <div>
                <div className="support-search-box">
                  <Search className="support-search-icon" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="support-categories">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`support-category ${
                        selectedCategory === category ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="support-faq-list">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <FaqItem
                        key={faq.id}
                        faq={faq}
                        isExpanded={expandedFaq === faq.id}
                        onToggle={handleToggleFaq}
                      />
                    ))
                  ) : (
                    <div className="support-no-faq">No FAQs found.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'ticket' && <SupportTicketForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

export async function getStaticProps() {
  // Import JSON serializable data only
  const data = await import('../components/support/SupportData');
  const { faqData, categories } = data;

  return {
    props: {
      faqData: JSON.parse(JSON.stringify(faqData)), 
      categories: JSON.parse(JSON.stringify(categories)), 
    },
  };
}

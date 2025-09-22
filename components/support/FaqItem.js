import React, { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem = memo(({ faq, isExpanded, onToggle }) => {
  return (
    <div className="support-faq-item">
      <button onClick={() => onToggle(faq.id)} className="support-faq-question-btn">
        <span className="support-faq-category">{faq.category}</span>
        <span className="support-faq-question">{faq.question}</span>
        <span className="support-faq-chevron">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      {isExpanded && (
        <div className="support-faq-answer">
          {faq.answer}
        </div>
      )}
    </div>
  );
});

export default FaqItem;
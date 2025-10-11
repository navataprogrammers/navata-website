import React, { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqItemComponent = ({ faq, isExpanded, onToggle }) => {
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
};

const FaqItem = memo(FaqItemComponent);
FaqItem.displayName = 'FaqItem'; // Set a display name for better debugging
export default FaqItem;

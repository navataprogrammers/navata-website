"use client";

import React from "react";

const FreightForm = ({
  formData,
  autoState,
  isLoading,
  handleInputChange,
  handleAutoInput,
  selectStation,
  onSubmit,
}) => {
  
  const renderAutocomplete = (field) => (
    <div className="autocomplete">
      <input
        autoComplete="off"
        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Station`}
        value={autoState[field].search}
        onChange={(e) => handleAutoInput(field, e.target.value)}
        onFocus={() => { /* Focus logic can be handled in parent if needed */ }}
        onBlur={() => { /* Blur logic can be handled in parent if needed */ }}
        className="freight-input"
      />
      {autoState[field].show && autoState[field].search && (
        <div className="autocomplete-list">
          {autoState[field].options.length > 0 ? (
            autoState[field].options.map((stn) => (
              <div
                key={stn.StnId}
                className="autocomplete-item"
                onMouseDown={() => selectStation(field, stn)}
              >
                {stn.StnName.trim()} <span className="stn-id">[{stn.StnId}]</span>
              </div>
            ))
          ) : <div className="autocomplete-item empty">No stations found</div>}
        </div>
      )}
    </div>
  );

  return (
    <div className="freight-form-row">
      {renderAutocomplete("source")}
      {renderAutocomplete("destination")}
      <input className="freight-input" name="articles" placeholder="No. of Articles" value={formData.articles} onChange={handleInputChange} />
      <input className="freight-input" name="goodsValue" placeholder="Goods Value" value={formData.goodsValue} onChange={handleInputChange} />
      <input className="freight-input" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleInputChange} />
      <select name="passType" className="freight-input" value={formData.passType} onChange={handleInputChange}>
        <option value="">Select Pass Type</option>
        <option value="Y">With Pass</option>
        <option value="N">Without Pass</option>
      </select>
      
      <button className="freight-btn" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Calculating..." : "Calculate"}
      </button>
    </div>
  );
};

export default FreightForm;
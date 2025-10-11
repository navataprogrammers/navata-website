"use client";

import React from "react";

const FreightForm = ({
  formData,
  autoState,
  isLoading,
  handleInputChange,
  handleAutoInput,
  handleKeyDown,
  selectStation,
  onSubmit,
}) => {

  // Renders source/destination autocomplete inputs
  const renderAutocomplete = (field) => (
    <div className="autocomplete">
      <input
        autoComplete="off"
        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Station`}
        value={autoState[field].search}
        onChange={(e) => handleAutoInput(field, e.target.value)}
        onKeyDown={(e) => handleKeyDown(field, e)}  
        className="freight-input"
      />
      {autoState[field].show && autoState[field].search && (
        <div className="autocomplete-list">
          {autoState[field].options.length > 0 ? (
            autoState[field].options.map((stn, index) => (
              <div
                key={stn.StnId}
                ref={(el) => {
                  if (index === autoState[field].highlighted && el) {
                    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
                  }
                }}
                className={`autocomplete-item ${
                  index === autoState[field].highlighted ? "highlighted" : ""
                }`}
                onMouseDown={() => selectStation(field, stn)}
              >
                {stn.StnName.trim()}{" "}
                <span className="stn-id">[{stn.StnId}]</span>
              </div>
            ))
          ) : (
            <div className="autocomplete-item empty">No stations found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="freight-form-container">
      <div className="freight-form-row">
        {renderAutocomplete("source")}
        {renderAutocomplete("destination")}

        <input
          className="freight-input"
          name="articles"
          placeholder="No. of Articles"
          value={formData.articles}
          onChange={handleInputChange}
        />

        <input
          className="freight-input"
          name="goodsValue"
          placeholder="Goods Value"
          value={formData.goodsValue}
          onChange={handleInputChange}
        />

        <input
          className="freight-input"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleInputChange}
        />

        <select
          name="passType"
          className="freight-input"
          value={formData.passType}
          onChange={handleInputChange}
        >
          <option value="">Select Pass Type</option>
          <option value="Y">With Pass</option>
          <option value="N">Without Pass</option>
        </select>

        <button className="freight-btn" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      <div className="freight-note">
        <p>
          <strong>
            Note: Volume-based articles will be charged on CDM basis (refer to
            FAQ or contact nearest branch for details).
          </strong>
        </p>
      </div>
    </div>
  );
};

export default FreightForm;

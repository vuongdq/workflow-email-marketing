import React, { useState } from 'react';
import './NodeEditor.css';

const NodeEditor = ({ node, onSave, onClose }) => {
  const [label, setLabel] = useState(node.data.label);
  const [typeSpecificData, setTypeSpecificData] = useState({});

  const handleSave = () => {
    onSave(node.id, { label, ...typeSpecificData });
  };

  const renderTypeSpecificFields = () => {
    switch (node.data.type) {
      case 'delay':
        return (
          <div className="field-group">
            <label>Delay Time (hours):</label>
            <input
              type="number"
              value={typeSpecificData.hours || 0}
              onChange={(e) => setTypeSpecificData({ ...typeSpecificData, hours: e.target.value })}
            />
          </div>
        );
      case 'filter':
        return (
          <div className="field-group">
            <label>Condition:</label>
            <select
              value={typeSpecificData.condition || ''}
              onChange={(e) => setTypeSpecificData({ ...typeSpecificData, condition: e.target.value })}
            >
              <option value="">Select Condition</option>
              <option value="notOpened">Not Opened in 30 days</option>
              <option value="notPurchased">Not Purchased in 60 days</option>
            </select>
          </div>
        );
      case 'sendEmail':
        return (
          <div className="field-group">
            <label>Email Subject:</label>
            <input
              type="text"
              value={typeSpecificData.subject || ''}
              onChange={(e) => setTypeSpecificData({ ...typeSpecificData, subject: e.target.value })}
            />
          </div>
        );
      case 'push':
        return (
          <div className="field-group">
            <label>Push Message:</label>
            <input
              type="text"
              value={typeSpecificData.message || ''}
              onChange={(e) => setTypeSpecificData({ ...typeSpecificData, message: e.target.value })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="node-editor">
      <div className="editor-header">
        <h3>Edit Node: {node.data.type}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="editor-content">
        <div className="field-group">
          <label>Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        {renderTypeSpecificFields()}
        <div className="button-group">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NodeEditor;
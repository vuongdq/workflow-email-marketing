import React from 'react';

const WorkflowSidebar = ({ addNode, saveWorkflow, loadWorkflow }) => {
  return (
    <div className="sidebar">
      <h3>Add Nodes</h3>
      <button onClick={() => addNode('delay', 'Delay')}>
        Add Delay
      </button>
      <button onClick={() => addNode('filter', 'Filter')}>
        Add Filter
      </button>
      <button onClick={() => addNode('sendEmail', 'Send Email')}>
        Add Send Email
      </button>
      <button onClick={() => addNode('push', 'Push Notification')}>
        Add Push Notification
      </button>
      <h3>Workflow Actions</h3>
      <button onClick={saveWorkflow}>Save Workflow</button>
      <button onClick={loadWorkflow}>Load Workflow</button>
    </div>
  );
};

export default WorkflowSidebar;
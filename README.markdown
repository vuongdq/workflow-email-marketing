# Email Marketing Workflow Builder

A React-based application for designing email marketing workflows using React Flow.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd workflow-email-marketing
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser to view the workflow builder.

## Features

- Drag-and-drop workflow builder using React Flow.
- Custom nodes for Delay, Filter, Send Email, and Push actions.
- Editable node properties (label, type-specific data).
- Save and load workflows using localStorage.
- MiniMap and Controls for better navigation.

## Dependencies

- React
- React Flow
- @reactflow/controls
- @reactflow/minimap

## Notes

- This is a frontend-only implementation. To add backend logic (e.g., sending emails), you need to integrate with a backend service (e.g., Node.js, Django).
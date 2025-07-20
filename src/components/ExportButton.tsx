import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import { exportToHTML, downloadHTML } from "@/utils/exportUtils";
import styles from "@/styles/components/ExportButton.module.css";

const ExportButton: React.FC = () => {
  const { selectedTemplate, pageSettings, elementSettings } = useBuilder();

  const handleExport = async () => {
    if (!selectedTemplate) return;
    
    try {
      const html = await exportToHTML(selectedTemplate, pageSettings, elementSettings);
      downloadHTML(html, `${selectedTemplate}-exported.html`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <button
      className={styles.exportButton}
      onClick={handleExport}
    >
      Export
    </button>
  );
};

export default ExportButton; 
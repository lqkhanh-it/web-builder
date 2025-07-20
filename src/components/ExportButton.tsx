import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import { exportToHTML, downloadHTML } from "@/utils/exportUtils";
import styles from "@/styles/components/ExportButton.module.css";

const ExportButton: React.FC = () => {
  const { selectedTemplate, pageSettings } = useBuilder();

  const handleExport = () => {
    if (!selectedTemplate) return;
    
    const html = exportToHTML(selectedTemplate, pageSettings);
    downloadHTML(html, `${selectedTemplate}-exported.html`);
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
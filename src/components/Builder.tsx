import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import { templates } from "@/templates";
import SettingsPanel from "@/components/SettingsPanel";
import ExportButton from "@/components/ExportButton";
import styles from "@/styles/components/Builder.module.css";

const Builder: React.FC = () => {
  const { selectedTemplate, pageSettings, setSelectedElement } = useBuilder();
  
  if (!selectedTemplate) return null;
  
  const TemplateComponent = templates[selectedTemplate as keyof typeof templates];
  
  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id) {
      setSelectedElement(target.id);
    }
  };

  return (
    <div className={styles.builderContainer}>
      <div className={styles.builderPreview}>
        <div 
          className={styles.pagePreview}
          style={{ 
            width: pageSettings.width,
            background: pageSettings.backgroundColor
          }}
          onClick={handleElementClick}
        >
          <TemplateComponent />
        </div>
      </div>
      <SettingsPanel />
      <ExportButton />
    </div>
  );
};

export default Builder; 
import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import { templateMetas } from "@/templates";
import styles from "@/styles/components/TemplateSelector.module.css";

const TemplateSelector: React.FC = () => {
  const { setSelectedTemplate } = useBuilder();

  return (
    <div className={styles.templateSelector}>
      <h2 className={styles.title}>Choose a template to start</h2>
      <div className={styles.templateGrid}>
        {templateMetas.map((template) => (
          <div
            key={template.id}
            className={styles.templateCard}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className={styles.templateIcon}>
              📄
            </div>
            <div className={styles.templateName}>{template.name}</div>
            <div className={styles.templateDescription}>
              {template.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector; 
import React from "react";
import { useTemplateElements } from "@/hooks/useTemplateElements";
import styles from "@/styles/templates/Template.module.css";

const Template2: React.FC = () => {
  const { getElementStyle, getElementContent, getElementClassName } = useTemplateElements();

  return (
    <div className={styles.template2}>
      <div className={styles.cardLayout}>
        <div className={styles.card}>
          <div 
            id="image-2"
            className={`${styles.cardImage} ${getElementClassName("image-2", styles.templateElement, styles.selected)}`}
          >
            <span className={styles.imageText}>🖼️ Card Image</span>
          </div>
          
          <h2 
            id="heading-2"
            className={`${styles.heading2} ${getElementClassName("heading-2", styles.templateElement, styles.selected)}`}
            style={getElementStyle("heading-2")}
          >
            {getElementContent("heading-2", "Card Title")}
          </h2>
          
          <p 
            id="paragraph-3"
            className={`${styles.paragraphAlt} ${getElementClassName("paragraph-3", styles.templateElement, styles.selected)}`}
            style={getElementStyle("paragraph-3")}
          >
            {getElementContent("paragraph-3", "This is a card-based layout with a clean, modern design. Perfect for showcasing products or services.")}
          </p>
        </div>
        
        <div className={styles.card}>
          <div 
            id="image-3"
            className={`${styles.cardImageAlt} ${getElementClassName("image-3", styles.templateElement, styles.selected)}`}
          >
            <span className={styles.imageText}>🎨 Feature Image</span>
          </div>
          
          <h2 
            id="heading-3"
            className={`${styles.heading2} ${getElementClassName("heading-3", styles.templateElement, styles.selected)}`}
            style={getElementStyle("heading-3")}
          >
            {getElementContent("heading-3", "Feature Section")}
          </h2>
          
          <p 
            id="paragraph-4"
            className={`${styles.paragraphAlt} ${getElementClassName("paragraph-4", styles.templateElement, styles.selected)}`}
            style={getElementStyle("paragraph-4")}
          >
            {getElementContent("paragraph-4", "Highlight your key features or benefits in this section. The layout is responsive and works on all devices.")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template2; 
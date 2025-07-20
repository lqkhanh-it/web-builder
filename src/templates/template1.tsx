import React from "react";
import { useTemplateElements } from "@/hooks/useTemplateElements";
import styles from "@/styles/templates/Template.module.css";

const Template1: React.FC = () => {
  const { getElementStyle, getElementContent, getElementClassName, getElementImage } = useTemplateElements();

  return (
    <div className={styles.template1}>
      <div 
        id="image-1"
        className={`${styles.imagePlaceholder} ${getElementClassName("image-1", styles.templateElement, styles.selected)}`}
      >
        {getElementImage("image-1") ? (
          <img 
            src={getElementImage("image-1")} 
            alt="Uploaded content"
            className={styles.uploadedImage}
          />
        ) : (
          <span className={styles.imageText}>📷 Image Placeholder</span>
        )}
      </div>
      
      <h1 
        id="heading-1"
        className={`${styles.heading1} ${getElementClassName("heading-1", styles.templateElement, styles.selected)}`}
        style={getElementStyle("heading-1")}
      >
        {getElementContent("heading-1", "Lorem ipsum dolor sit amet")}
      </h1>
      
      <p 
        id="paragraph-1"
        className={`${styles.paragraph} ${getElementClassName("paragraph-1", styles.templateElement, styles.selected)}`}
        style={getElementStyle("paragraph-1")}
      >
        {getElementContent("paragraph-1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")}
      </p>
      
      <p 
        id="paragraph-2"
        className={`${styles.paragraphWithMargin} ${getElementClassName("paragraph-2", styles.templateElement, styles.selected)}`}
        style={getElementStyle("paragraph-2")}
      >
        {getElementContent("paragraph-2", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}
      </p>
    </div>
  );
};

export default Template1; 
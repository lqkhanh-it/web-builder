import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import type { ElementSettings } from "@/templates/types";
import styles from "@/styles/components/SettingsPanel.module.css";

const SettingsPanel: React.FC = () => {
  const { 
    selectedElement, 
    pageSettings, 
    setPageSettings, 
    elementSettings, 
    setElementSettings 
  } = useBuilder();

  const currentElementSettings = selectedElement ? elementSettings[selectedElement] || {} : {};

  const updateElementSettings = (updates: Partial<ElementSettings>) => {
    if (selectedElement) {
      setElementSettings(selectedElement, { ...currentElementSettings, ...updates });
    }
  };

  const renderPageSettings = () => (
    <div>
      <h3 className={styles.title}>Page settings</h3>
      
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>
          Background color
        </label>
        <input
          type="color"
          className={styles.settingsInput}
          value={pageSettings.backgroundColor}
          onChange={(e) => setPageSettings({ ...pageSettings, backgroundColor: e.target.value })}
        />
      </div>

      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>
          Page width: {pageSettings.width}px
        </label>
        <input
          type="range"
          className={styles.settingsSlider}
          min="400"
          max="1200"
          value={pageSettings.width}
          onChange={(e) => setPageSettings({ ...pageSettings, width: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );

  const renderElementSettings = () => {
    if (!selectedElement) return null;

    const elementType = selectedElement.split('-')[0]; // heading, paragraph, image
    
    return (
      <div>
        <h3 className={styles.title}>
          {elementType.charAt(0).toUpperCase() + elementType.slice(1)} settings
        </h3>

        {elementType !== 'image' && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>
              Color
            </label>
            <input
              type="color"
              className={styles.settingsInput}
              value={currentElementSettings.color || "#000000"}
              onChange={(e) => updateElementSettings({ color: e.target.value })}
            />
          </div>
        )}

        {elementType !== 'image' && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>
              Font size: {currentElementSettings.fontSize || 16}px
            </label>
            <input
              type="range"
              className={styles.settingsSlider}
              min="12"
              max="48"
              value={currentElementSettings.fontSize || 16}
              onChange={(e) => updateElementSettings({ fontSize: parseInt(e.target.value) })}
            />
          </div>
        )}

        {elementType !== 'image' && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>
              Font weight
            </label>
            <div className={styles.radioGroup}>
              {(['light', 'regular', 'bold'] as const).map((weight) => (
                <label key={weight} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="fontWeight"
                    value={weight}
                    checked={currentElementSettings.fontWeight === weight}
                    onChange={() => updateElementSettings({ fontWeight: weight })}
                  />
                  <span>{weight}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {elementType !== 'image' && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>
              Content
            </label>
            <textarea
              className={styles.settingsTextarea}
              value={currentElementSettings.content || ""}
              onChange={(e) => updateElementSettings({ content: e.target.value })}
              placeholder="Enter content..."
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.settingsPanel}>
      {selectedElement ? renderElementSettings() : renderPageSettings()}
    </div>
  );
};

export default SettingsPanel; 
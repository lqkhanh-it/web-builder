import React, { useRef } from "react";
import { useBuilder } from "@/hooks/useBuilder";
import type { ElementSettings } from "@/templates/types";
import styles from "@/styles/components/SettingsPanel.module.css";
import ExportButton from "./ExportButton";

const SettingsPanel: React.FC = () => {
  const { selectedElement, elementSettings, setElementSettings, setSelectedElement } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default to image element if nothing is selected
  React.useEffect(() => {
    if (!selectedElement) {
      setSelectedElement("image-1");
    }
  }, [selectedElement, setSelectedElement]);

  const currentElementSettings = selectedElement
    ? elementSettings[selectedElement] || {}
    : {};

  const updateElementSettings = (updates: Partial<ElementSettings>) => {
    if (selectedElement) {
      setElementSettings(selectedElement, {
        ...currentElementSettings,
        ...updates,
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedElement) {
      const imageUrl = URL.createObjectURL(file);
      updateElementSettings({
        imageUrl,
        imageFile: file,
      });
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const renderPageSettings = () => (
    <div>
      <h3 className={styles.title}>Page settings</h3>
      <p className={styles.description}>
        Page settings are now available in the top panel for easy access.
      </p>
    </div>
  );

  const renderElementSettings = () => {
    if (!selectedElement) return null;

    const elementType = selectedElement.split("-")[0]; // heading, paragraph, image

    return (
      <div>
        <h3 className={styles.title}>
          {elementType.charAt(0).toUpperCase() + elementType.slice(1)} settings
        </h3>

        {elementType !== "image" && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>Color</label>
            <input
              type="color"
              className={styles.settingsInput}
              value={currentElementSettings.color || "#000000"}
              onChange={(e) => updateElementSettings({ color: e.target.value })}
            />
          </div>
        )}

        {elementType !== "image" && (
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
              onChange={(e) =>
                updateElementSettings({ fontSize: parseInt(e.target.value) })
              }
            />
          </div>
        )}

        {elementType !== "image" && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>Font weight</label>
            <div className={styles.radioGroup}>
              {(["light", "regular", "bold"] as const).map((weight) => (
                <label key={weight} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="fontWeight"
                    value={weight}
                    checked={currentElementSettings.fontWeight === weight}
                    onChange={() =>
                      updateElementSettings({ fontWeight: weight })
                    }
                  />
                  <span>{weight}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {elementType !== "image" && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>Content</label>
            <textarea
              className={styles.settingsTextarea}
              value={currentElementSettings.content || ""}
              onChange={(e) =>
                updateElementSettings({ content: e.target.value })
              }
              placeholder="Enter content..."
            />
          </div>
        )}

        {elementType === "image" && (
          <div className={styles.settingsGroup}>
            <label className={styles.settingsLabel}>Upload Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
              style={{ display: 'none' }}
            />
            <button
              className={styles.uploadButton}
              onClick={triggerImageUpload}
            >
              <svg
                className={styles.uploadIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Choose Image
            </button>
            {currentElementSettings.imageUrl && (
              <div className={styles.imagePreview}>
                <img
                  src={currentElementSettings.imageUrl}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <button
                  className={styles.removeButton}
                  onClick={() => updateElementSettings({ imageUrl: undefined, imageFile: undefined })}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.settingsPanel}>
      <ExportButton />
      {selectedElement ? renderElementSettings() : renderPageSettings()}
    </div>
  );
};

export default SettingsPanel;

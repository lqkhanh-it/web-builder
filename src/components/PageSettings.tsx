import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import styles from "@/styles/components/PageSettings.module.css";
import BackButton from "./BackButton";

const PageSettings: React.FC = () => {
  const { pageSettings, setPageSettings } = useBuilder();

  const responsiveSizes = [
    { name: "Mobile", width: 375, icon: "📱" },
    { name: "iPad", width: 768, icon: "📱" },
    { name: "Desktop", width: 1200, icon: "💻" },
  ];

  const handleSizeChange = (width: number) => {
    setPageSettings({ ...pageSettings, width });
  };

  return (
    <div className={styles.pageSettings}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.settingsGroup}>
            <BackButton />
          </div>
          <h3 className={styles.title}>Page Settings</h3>
          <div className={styles.settingsGroup}>
            <label className={styles.label}>Background Color</label>
            <input
              type="color"
              className={styles.colorInput}
              value={pageSettings.backgroundColor}
              onChange={(e) =>
                setPageSettings({
                  ...pageSettings,
                  backgroundColor: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.settingsGroup}>
            <label className={styles.label}>Page Width</label>
            <div className={styles.sizeButtons}>
              {responsiveSizes.map((size) => (
                <button
                  key={size.name}
                  className={`${styles.sizeButton} ${
                    pageSettings.width === size.width ? styles.active : ""
                  }`}
                  onClick={() => handleSizeChange(size.width)}
                  title={`${size.name} (${size.width}px)`}
                >
                  <span className={styles.sizeIcon}>{size.icon}</span>
                  <span className={styles.sizeName}>{size.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.settingsGroup}>
            <label className={styles.label}>
              Custom Width: {pageSettings.width}px
            </label>
            <input
              type="range"
              className={styles.slider}
              min="320"
              max="1400"
              step="10"
              value={pageSettings.width}
              onChange={(e) =>
                setPageSettings({
                  ...pageSettings,
                  width: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;

import { useBuilder } from "@/hooks/useBuilder";
import styles from "@/styles/components/BackButton.module.css";

export default function BackButton() {
  const { setSelectedTemplate } = useBuilder();

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
  };

  return (
    <button className={styles.backButton} onClick={handleBackToTemplates}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={styles.backIcon}
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className={styles.backText}>Back</span>
    </button>
  );
}

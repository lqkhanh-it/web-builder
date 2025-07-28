import React from "react";
import { useBuilder } from "@/hooks/useBuilder";
import styles from "@/styles/components/Header.module.css";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Web Builder" }) => {
  const { setSelectedTemplate } = useBuilder();

  const handleLogoClick = () => {
    setSelectedTemplate(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src="/public/logo.svg" alt="Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>{title}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

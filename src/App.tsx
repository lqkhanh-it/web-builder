import React from "react";
import { BuilderProvider } from "@/context/BuilderContext";
import { useBuilder } from "@/hooks/useBuilder";
import TemplateSelector from "@/components/TemplateSelector";
import Builder from "@/components/Builder";
import Header from "@/components/Header";
import "@/styles/App.css";

const AppContent: React.FC = () => {
  const { selectedTemplate } = useBuilder();

  return (
    <div>
      <Header />
      {!selectedTemplate ? (
        <TemplateSelector />
      ) : (
        <Builder />
      )}
    </div>
  );
};

function App() {
  return (
    <BuilderProvider>
      <AppContent />
    </BuilderProvider>
  );
}

export default App;

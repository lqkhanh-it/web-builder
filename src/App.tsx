import React from "react";
import { BuilderProvider } from "@/context/BuilderContext";
import { useBuilder } from "@/hooks/useBuilder";
import TemplateSelector from "@/components/TemplateSelector";
import Builder from "@/components/Builder";
import "@/styles/App.css";

const AppContent: React.FC = () => {
  const { selectedTemplate } = useBuilder();

  return (
    <div>
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

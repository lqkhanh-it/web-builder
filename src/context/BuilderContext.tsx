import React, { createContext, useState } from "react";
import type { PageSettings, ElementSettings } from "@/templates/types";

type BuilderContextType = {
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
  pageSettings: PageSettings;
  setPageSettings: (s: PageSettings) => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  elementSettings: Record<string, ElementSettings>;
  setElementSettings: (id: string, s: ElementSettings) => void;
};

const defaultPageSettings: PageSettings = {
  backgroundColor: "#dde6f7",
  width: 1200,
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageSettings, setPageSettings] = useState<PageSettings>(defaultPageSettings);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [elementSettings, setElementSettingsState] = useState<Record<string, ElementSettings>>({});

  const setElementSettings = (id: string, s: ElementSettings) => {
    setElementSettingsState((prev) => ({ ...prev, [id]: s }));
  };

  return (
    <BuilderContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        pageSettings,
        setPageSettings,
        selectedElement,
        setSelectedElement,
        elementSettings,
        setElementSettings,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export { BuilderContext }; 
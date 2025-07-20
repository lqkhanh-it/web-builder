import { useBuilder } from "@/hooks/useBuilder";

export const useTemplateElements = () => {
  const { elementSettings, selectedElement } = useBuilder();

  const getElementStyle = (elementId: string, defaultStyle: React.CSSProperties = {}) => {
    const settings = elementSettings[elementId] || {};
    return {
      ...defaultStyle,
      color: settings.color || defaultStyle.color,
      fontSize: settings.fontSize ? `${settings.fontSize}px` : defaultStyle.fontSize,
      fontWeight: settings.fontWeight === 'light' ? 300 : 
                  settings.fontWeight === 'bold' ? 700 : 
                  defaultStyle.fontWeight,
    };
  };

  const getElementContent = (elementId: string, defaultContent: string) => {
    const settings = elementSettings[elementId] || {};
    return settings.content || defaultContent;
  };

  const getElementClassName = (elementId: string, baseClass: string, selectedClass: string) => {
    return selectedElement === elementId ? `${baseClass} ${selectedClass}` : baseClass;
  };

  return {
    getElementStyle,
    getElementContent,
    getElementClassName,
    selectedElement,
  };
}; 
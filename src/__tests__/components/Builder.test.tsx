import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BuilderProvider } from "@/context/BuilderContext";

// Mock the CSS modules
vi.mock("@/styles/components/Builder.module.css", () => ({
  default: {
    builderContainer: "builderContainer",
    builderPreview: "builderPreview",
    pagePreview: "pagePreview",
  },
}));

vi.mock("@/styles/templates/Template.module.css", () => ({
  default: {
    template1: "template1",
    templateElement: "templateElement",
    selected: "selected",
    imagePlaceholder: "imagePlaceholder",
    uploadedImage: "uploadedImage",
    imageText: "imageText",
    heading1: "heading1",
    paragraph: "paragraph",
    paragraphWithMargin: "paragraphWithMargin",
  },
}));

// Mock the templates - return proper React components
vi.mock('@/templates', () => ({
  templates: {
    template1: () => React.createElement('div', { 'data-testid': 'template1' },
      React.createElement('div', { id: 'image-1', 'data-testid': 'image-1' }, 'Image'),
      React.createElement('h1', { id: 'heading-1', 'data-testid': 'heading-1' }, 'Heading'),
      React.createElement('p', { id: 'paragraph-1', 'data-testid': 'paragraph-1' }, 'Paragraph')
    ),
    template2: () => React.createElement('div', { 'data-testid': 'template2' },
      React.createElement('div', { id: 'image-2', 'data-testid': 'image-2' }, 'Image 2'),
      React.createElement('h1', { id: 'heading-2', 'data-testid': 'heading-2' }, 'Heading 2')
    ),
  },
}));

// Mock the SettingsPanel component - return a proper React component
vi.mock("@/components/SettingsPanel", () => ({
  default: () => React.createElement('div', { 'data-testid': 'settings-panel' }, 'Settings Panel'),
}));

// Mock the useBuilder hook
const mockSetSelectedElement = vi.fn();
const mockUseBuilder = vi.fn();

vi.mock("@/hooks/useBuilder", () => ({
  useBuilder: () => mockUseBuilder(),
}));

import Builder from "@/components/Builder";

describe("Builder", () => {
  const renderBuilder = () => {
    return render(
      <BuilderProvider>
        <Builder />
      </BuilderProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBuilder.mockReturnValue({
      selectedTemplate: "template1",
      pageSettings: {
        backgroundColor: "#ffffff",
        width: 1200,
      },
      setSelectedElement: mockSetSelectedElement,
    });
  });

  it("renders the builder with template when template is selected and page settings are applied", () => {
    renderBuilder();

    expect(screen.getByTestId("template1")).toBeInTheDocument();
    expect(screen.getByTestId("settings-panel")).toBeInTheDocument();
  });

  it("renders nothing when no template is selected", () => {
    mockUseBuilder.mockReturnValue({
      selectedTemplate: null,
      pageSettings: {},
      setSelectedElement: mockSetSelectedElement,
    });

    const { container } = render(
      <BuilderProvider>
        <Builder />
      </BuilderProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders the builder with template when template is selected", () => {
    renderBuilder();

    expect(screen.getByTestId("template1")).toBeInTheDocument();
    expect(screen.getByTestId("settings-panel")).toBeInTheDocument();
  });

  it("applies page settings to the preview container", () => {
    renderBuilder();

    const pagePreview = screen.getByTestId("template1").parentElement;
    expect(pagePreview).toHaveStyle({
      width: "1200px",
      background: "#ffffff",
    });
  });

  it("calls setSelectedElement when clicking on an element with id", () => {
    renderBuilder();

    const headingElement = screen.getByTestId("heading-1");
    fireEvent.click(headingElement);

    expect(mockSetSelectedElement).toHaveBeenCalledWith("heading-1");
  });

  it("does not call setSelectedElement when clicking on element without id", () => {
    renderBuilder();

    const templateContainer = screen.getByTestId("template1");
    fireEvent.click(templateContainer);

    expect(mockSetSelectedElement).not.toHaveBeenCalled();
  });

  it("renders different templates based on selectedTemplate", () => {
    mockUseBuilder.mockReturnValue({
      selectedTemplate: "template2",
      pageSettings: {
        backgroundColor: "#f0f0f0",
        width: 800,
      },
      setSelectedElement: mockSetSelectedElement,
    });

    renderBuilder();

    expect(screen.getByTestId("template2")).toBeInTheDocument();
    expect(screen.queryByTestId("template1")).not.toBeInTheDocument();
  });

  it("has correct CSS classes applied", () => {
    renderBuilder();

    const builderContainer = screen
      .getByTestId("template1")
      .closest(".builderContainer");
    expect(builderContainer).toBeInTheDocument();
  });

  it("handles multiple element clicks correctly", () => {
    renderBuilder();

    const imageElement = screen.getByTestId("image-1");
    const paragraphElement = screen.getByTestId("paragraph-1");

    fireEvent.click(imageElement);
    expect(mockSetSelectedElement).toHaveBeenCalledWith("image-1");

    fireEvent.click(paragraphElement);
    expect(mockSetSelectedElement).toHaveBeenCalledWith("paragraph-1");

    expect(mockSetSelectedElement).toHaveBeenCalledTimes(2);
  });

  it("renders with different page settings", () => {
    mockUseBuilder.mockReturnValue({
      selectedTemplate: "template1",
      pageSettings: {
        backgroundColor: "#000000",
        width: 600,
      },
      setSelectedElement: mockSetSelectedElement,
    });

    renderBuilder();

    const pagePreview = screen.getByTestId("template1").parentElement;
    expect(pagePreview).toHaveStyle({
      width: "600px",
      background: "#000000",
    });
  });
});

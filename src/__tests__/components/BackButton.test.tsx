import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BuilderProvider } from '@/context/BuilderContext';
import BackButton from '@/components/BackButton';

// Mock the CSS module
vi.mock('@/styles/components/BackButton.module.css', () => ({
  default: {
    backButton: 'backButton',
    backIcon: 'backIcon',
    backText: 'backText',
  },
}));

// Mock the useBuilder hook
const mockSetSelectedTemplate = vi.fn();

vi.mock('@/hooks/useBuilder', () => ({
  useBuilder: () => ({
    setSelectedTemplate: mockSetSelectedTemplate,
  }),
}));

describe('BackButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the back button with correct text and icon', () => {
    render(
      <BuilderProvider>
        <BackButton />
      </BuilderProvider>
    );

    // Check if the button is rendered
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Check if the text is rendered
    const text = screen.getByText('Back');
    expect(text).toBeInTheDocument();

    // Check if the SVG icon is rendered
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('calls setSelectedTemplate with null when clicked', () => {
    render(
      <BuilderProvider>
        <BackButton />
      </BuilderProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetSelectedTemplate).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedTemplate).toHaveBeenCalledWith(null);
  });

  it('has correct CSS classes applied', () => {
    render(
      <BuilderProvider>
        <BackButton />
      </BuilderProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('backButton');

    const text = screen.getByText('Back');
    expect(text).toHaveClass('backText');

    const svg = button.querySelector('svg');
    expect(svg).toHaveClass('backIcon');
  });

  it('has correct SVG path for back arrow icon', () => {
    render(
      <BuilderProvider>
        <BackButton />
      </BuilderProvider>
    );

    const svg = screen.getByRole('button').querySelector('svg');
    const path = svg?.querySelector('path');
    
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', 'M19 12H5M12 19l-7-7 7-7');
  });

  it('is accessible with proper ARIA attributes', () => {
    render(
      <BuilderProvider>
        <BackButton />
      </BuilderProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // The button should be focusable
    button.focus();
    expect(button).toHaveFocus();
  });
}); 
import type { PageSettings, ElementSettings } from "../templates/types";

export const exportToHTML = async (
  templateId: string,
  pageSettings: PageSettings,
  elementSettings: Record<string, ElementSettings>
): Promise<string> => {
  const getElementStyle = (elementId: string) => {
    const settings = elementSettings[elementId] || {};
    return {
      color: settings.color || '#333',
      fontSize: settings.fontSize ? `${settings.fontSize}px` : '16px',
      fontWeight: settings.fontWeight === 'light' ? 300 : 
                  settings.fontWeight === 'bold' ? 700 : 400,
    };
  };

  const getElementContent = (elementId: string, defaultContent: string) => {
    const settings = elementSettings[elementId] || {};
    return settings.content || defaultContent;
  };

  const getElementImage = async (elementId: string): Promise<string | null> => {
    const settings = elementSettings[elementId] || {};
    if (!settings.imageUrl || !settings.imageFile) return null;
    
    // Convert blob URL to base64 for export
    try {
      const response = await fetch(settings.imageUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const renderTemplateContent = async () => {
    if (templateId === 'template1') {
      const image1 = await getElementImage('image-1');
      const heading1 = getElementContent('heading-1', 'Lorem ipsum dolor sit amet');
      const paragraph1 = getElementContent('paragraph-1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
      const paragraph2 = getElementContent('paragraph-2', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
      
      const heading1Style = getElementStyle('heading-1');
      const paragraph1Style = getElementStyle('paragraph-1');
      const paragraph2Style = getElementStyle('paragraph-2');

      return `
        ${image1 ? 
          `<img src="${image1}" alt="Uploaded content" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 24px;" />` : 
          `<div class="image-placeholder">📷 Image Placeholder</div>`
        }
        <h1 style="font-size: ${heading1Style.fontSize}; font-weight: ${heading1Style.fontWeight}; color: ${heading1Style.color}; margin-bottom: 16px;">${heading1}</h1>
        <p style="font-size: ${paragraph1Style.fontSize}; font-weight: ${paragraph1Style.fontWeight}; color: ${paragraph1Style.color}; line-height: 1.6; margin-bottom: 16px;">${paragraph1}</p>
        <p style="font-size: ${paragraph2Style.fontSize}; font-weight: ${paragraph2Style.fontWeight}; color: ${paragraph2Style.color}; line-height: 1.6; margin-bottom: 16px;">${paragraph2}</p>
      `;
    } else if (templateId === 'template2') {
      const image2 = await getElementImage('image-2');
      const image3 = await getElementImage('image-3');
      const heading2 = getElementContent('heading-2', 'Card Title');
      const heading3 = getElementContent('heading-3', 'Feature Section');
      const paragraph3 = getElementContent('paragraph-3', 'This is a card-based layout with a clean, modern design. Perfect for showcasing products or services.');
      const paragraph4 = getElementContent('paragraph-4', 'Highlight your key features or benefits in this section. The layout is responsive and works on all devices.');
      
      const heading2Style = getElementStyle('heading-2');
      const heading3Style = getElementStyle('heading-3');
      const paragraph3Style = getElementStyle('paragraph-3');
      const paragraph4Style = getElementStyle('paragraph-4');

      return `
        <div class="card-layout">
          <div class="card">
            ${image2 ? 
              `<img src="${image2}" alt="Card image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 16px;" />` : 
              `<div class="card-image">🖼️ Card Image</div>`
            }
            <h2 style="font-size: ${heading2Style.fontSize}; font-weight: ${heading2Style.fontWeight}; color: ${heading2Style.color}; margin-bottom: 12px;">${heading2}</h2>
            <p style="font-size: ${paragraph3Style.fontSize}; font-weight: ${paragraph3Style.fontWeight}; color: ${paragraph3Style.color}; line-height: 1.5; margin-bottom: 16px;">${paragraph3}</p>
          </div>
          <div class="card">
            ${image3 ? 
              `<img src="${image3}" alt="Feature image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 16px;" />` : 
              `<div class="card-image">🎨 Feature Image</div>`
            }
            <h2 style="font-size: ${heading3Style.fontSize}; font-weight: ${heading3Style.fontWeight}; color: ${heading3Style.color}; margin-bottom: 12px;">${heading3}</h2>
            <p style="font-size: ${paragraph4Style.fontSize}; font-weight: ${paragraph4Style.fontWeight}; color: ${paragraph4Style.color}; line-height: 1.5; margin-bottom: 16px;">${paragraph4}</p>
          </div>
        </div>
      `;
    }
    return '';
  };
  
      const templateContent = await renderTemplateContent();
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Page - ${templateId}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f6f6f6;
        }
        .page-container {
            max-width: ${pageSettings.width}px;
            margin: 0 auto;
            background: ${pageSettings.backgroundColor};
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .content {
            padding: 40px;
        }
        .image-placeholder {
            width: 100%;
            height: 300px;
            background: #e0e0e0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            color: #666;
        }
        h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #333;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 16px;
        }
        .card-layout {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }
        .card {
            flex: 1;
            min-width: 300px;
        }
        .card-image {
            width: 100%;
            height: 200px;
            background: #f0f0f0;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            color: #666;
        }
        h2 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #333;
        }
        .card p {
            font-size: 14px;
            line-height: 1.5;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="page-container">
        <div class="content">
            ${templateContent}
        </div>
    </div>
</body>
</html>`;

  return html;
};

export const downloadHTML = (html: string, filename: string = "exported-page.html") => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 
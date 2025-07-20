import type { PageSettings } from "../templates/types";

export const exportToHTML = (
  templateId: string,
  pageSettings: PageSettings
): string => {
  // This is a simplified export - in a real app you'd want to render the actual template
  // with the applied settings and generate proper HTML
  
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
            ${templateId === 'template1' ? `
                <div class="image-placeholder">📷 Image Placeholder</div>
                <h1>Lorem ipsum dolor sit amet</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            ` : `
                <div class="card-layout">
                    <div class="card">
                        <div class="card-image">🖼️ Card Image</div>
                        <h2>Card Title</h2>
                        <p>This is a card-based layout with a clean, modern design. Perfect for showcasing products or services.</p>
                    </div>
                    <div class="card">
                        <div class="card-image">🎨 Feature Image</div>
                        <h2>Feature Section</h2>
                        <p>Highlight your key features or benefits in this section. The layout is responsive and works on all devices.</p>
                    </div>
                </div>
            `}
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
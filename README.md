# Power Platform PCF Components

This repository contains a collection of high-quality Power Apps Component Framework (PCF) components designed to enhance your Power Platform applications with modern UI elements and advanced functionality.

## Components

### 📁 [File Uploader](fileUploader)

A flexible file upload component with multiple interface options:

- Standard buttons (primary, secondary, outline, etc.)
- Compound buttons with descriptive text
- Drag-and-drop zone for intuitive file uploads
- File list with preview icons based on file type
- Support for multiple file selection

![File Uploader](docs/images/screenshot_pcf.png)

### 🃏 [Fluent Cards](fluentCards)

Modern card components using Fluent UI design language for displaying information in a visually appealing way.

### 📜 [Scroll Bar](scrollBar)

Custom scroll bar component for better scrolling experience in Power Apps.

## How to Build

### Prerequisites

- Power Platform CLI
- .NET SDK
- Node.js and npm

### Development Build

```bash
cd \Solutions
msbuild /t:build /restore
```

### Production Build

```bash
cd \Solutions
msbuild /p:configuration=Release
```

## Documentation

For detailed information on working with PCF components, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/import-custom-controls).

## License

This project is licensed under the terms of the license included in the [LICENSE](LICENSE) file.

---

_Note: The screenshot images are placeholders. Replace them with actual screenshots of your components._

## File Uploader

A generic Fluent UI v9 button to trigger the native file selector. Outputs the selected files as data url.
Uses the theming from your canvas app automatically.

![Screenshot FileUploader](../docs/images/screenshot_pcf4.png)

# 🚀 Release Notes - v2.0.0 (April 2025)

## New Features

- **Upgraded to FluentUI v9**: Completely modernized UI with improved accessibility and performance
- **Enhanced Drag & Drop**: Better visual feedback during drag operations
- **File List Improvements (preview)**: Now shows file type icons and has better handling of long filenames
- **Trigger Reset parameter**: Fixed issue on trigger reset. Files are now cleared when value is changed.
- **Persistent File Selection**: Fixed issue where files array would reset when dragging new files
- **Type-Safe Codebase**: Removed usage of `any` types for better reliability

## Breaking Changes

- Upgraded to FluentUI v9
- Icon names must now follow FluentUI v9 naming convention. Please refer to the [FluentUI Icons Catalog](https://react.fluentui.dev/?path=/docs/icons-catalog--docs) for available icons.
- Button type action and standard are removed and replaced by native fluentui v9 type.
  - primary
  - secondary
  - outline
  - subtle
  - transparent

## Improvements

- Better error handling for file operations
- Optimized file reading process for improved performance
- More consistent styling across different button types
- Enhanced accessibility through FluentUI v9 components
- Improved drag-and-drop zone with more responsive feedback

### How to get selected file data

The OnChange event is triggered when selecting new files.
An array of the data will be available after selecting new files in the "files" parameter.
You can use the onChange event to track changes, and process the file data in e.g. power automate.

e.g.

Example 1
![onChange Formula](../docs/images/screenshot_pcf3.png)

Example 2

```
ForAll(
    ParseJSON(Self.files);
    // Do something with data
    // ThisItem.name
    // ThisItem.file
)
;;
```

### The component adapts to the canvas app & model driven app theme

![Theme 1](../docs/images/adapt_theme1.png)
![Theme 2](../docs/images/adapt_theme2.png)

### Parameters

#### Label button

Label to show on the button

> Default = "Choose file(s)"

#### Allow multiple files

Allow the user to select multiple files at once

> Default = "true"

#### Allowed formats

Allowed formats to select.

e.g. image/png,image/jpeg

Please refer to [this media type list](http://www.iana.org/assignments/media-types/media-types.xhtml) for file types.

> Default = "all"

#### ID of the button

HTML id of the input field.
May be handy when adding multiple upload buttons.

> Default = "xe-uploadfile-button"

#### Button type

Refers to type of button.

> Default = "primary"

##### Types

![Button types](../docs/images/screenshot_pcf2.png)

Available types:

- primary
- secondary
- outline
- subtle
- transparent
- compound
- dragdrop

#### Action icon

Can be used in combination with any button type.
For performance optimization reasons, only a limited set of icons is currently supported:

- ArrowUploadRegular
- DocumentRegular
- ImageRegular
- VideoRegular
- MusicNote2Regular
- DocumentPdfRegular
- DeleteRegular

**Breaking Change in v2**: Icons must use the FluentUI v9 naming convention. If you need additional icons, you'll need to modify the component code to include them.

> Default = "ArrowUploadRegular"

#### Trigger Reset

Used to clear the files parameter. Change this value to trigger a reset of the selected files.
Can be any type of value (string, boolean, number) - changing the value is what triggers the reset.

> Default = "0"

#### showFileList (Preview)

Show or hide the filelist overview

> Default = False

#### Dropzone settings

##### dropFilesText

Text shown in the dropzone

##### dropZoneBorderColor

Border color of the dropzone

##### dropZoneBorderSize

Border size of the dropzone

##### dropZoneTextColor

Text color of the dropzone

#### Files

Array of selected files.
Data url can be used to process files.

```
[
    {
        name: 'name of the file',
        data: 'data url of the file'
    }
]
```

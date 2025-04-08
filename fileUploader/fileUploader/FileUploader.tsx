import * as React from "react";
import {
  Button,
  CompoundButton,
  FluentProvider,
  Card,
  CardHeader,
  Text,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import * as FluentIcons from "@fluentui/react-icons";
import {
  DocumentRegular,
  ImageRegular,
  VideoRegular,
  MusicNote2Regular,
  DocumentPdfRegular,
  DeleteRegular,
  ArrowUploadRegular,
} from "@fluentui/react-icons";

export interface IFile {
  name: string;
  file: string;
}

enum IconPostion {
  after = "after",
  before = "before",
}

export interface IFileUploaderProps {
  stateChanged: () => void;
  files: (files: IFile[]) => void;
  label: string | null;
  multiple: boolean;
  accepts: string | null;
  uploadId: string | null;
  buttonType: string | null;
  actionIcon: string | null;
  iconPosition?: IconPostion;
  dropZoneText: string | null;
  dropZoneTextColor: string | null;
  dropZoneBorderColor: string | null;
  dropZoneBorderSize: string | null;
  resetFiles: string | null;
  showFileList: boolean;
}

// Define styles using makeStyles
const useStyles = makeStyles({
  dropZone: {
    display: "block",
    textAlign: "center",
    ...shorthands.padding("50px"),
    ...shorthands.margin("auto"),
    width: "90%",
    height: "70%",
    fontSize: "20px",
    cursor: "pointer",
    ...shorthands.transition("all", "0.2s"),
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackgroundInverted,
    },
  },
  isDragging: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    ...shorthands.borderStyle("dashed"),
  },
});

export const FileUploader = (props: IFileUploaderProps) => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<IFile[]>([]);
  const {
    label,
    multiple,
    accepts,
    uploadId,
    buttonType,
    actionIcon,
    iconPosition,
    dropZoneText,
    dropZoneBorderColor,
    dropZoneBorderSize,
    dropZoneTextColor,
    resetFiles,
    showFileList,
  } = props;
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const triggerUpload = React.useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  React.useEffect(() => {
    setFiles([]);
  }, [resetFiles]);

  React.useEffect(() => {
    props.files(files);
    props.stateChanged();
  }, [files]);
  const readFiles = React.useCallback((arrayFiles: File[]) => {
    arrayFiles.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const newFile = {
          name: file.name,
          file: fileReader.result as string,
        };
        setFiles((prevFiles) => [...prevFiles, newFile]);
      };
      fileReader.readAsDataURL(file);
    });
  }, []);

  const fileChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const arrayFiles = Array.from(e.target.files);
        readFiles(arrayFiles);
      }
    },
    [files]
  );

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const arrayFiles = Array.from(e.dataTransfer.files);
      readFiles(arrayFiles);
    }
  }, []);
  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onDragEnd = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const getIcon = React.useCallback(() => {
    if (!actionIcon) return undefined;
    const iconName = `${actionIcon}`;
    const IconComponent = (FluentIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : undefined;
  }, [actionIcon]);

  const getFileIcon = React.useCallback((fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
        return <ImageRegular />;
      case "mp4":
      case "mov":
      case "avi":
      case "wmv":
        return <VideoRegular />;
      case "mp3":
      case "wav":
      case "ogg":
        return <MusicNote2Regular />;
      case "pdf":
        return <DocumentPdfRegular />;
      default:
        return <DocumentRegular />;
    }
  }, []);

  const removeFile = React.useCallback((indexToRemove: number) => {
    setFiles((currentFiles) => {
      const newFiles = [...currentFiles];
      newFiles.splice(indexToRemove, 1);
      return newFiles;
    });
  }, []);

  return (
    <FluentProvider>
      {(buttonType === "primary" ||
        buttonType === "transparent" ||
        buttonType === "outline" ||
        buttonType === "secondary" ||
        buttonType === "subtle") && (
        <Button
          icon={getIcon()}
          onClick={triggerUpload}
          appearance={buttonType}
          iconPosition={iconPosition}
        >
          {label}
        </Button>
      )}
      {buttonType === "compound" && (
        <CompoundButton
          icon={getIcon()}
          onClick={triggerUpload}
          iconPosition={iconPosition}
        >
          {label}
        </CompoundButton>
      )}{" "}
      {buttonType === "dragdrop" && (
        <Card
          onClick={triggerUpload}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragEnd}
          className={isDragging ? styles.isDragging : styles.dropZone}
          style={{
            borderWidth: dropZoneBorderSize!,
            borderColor: dropZoneBorderColor!,
            color: dropZoneTextColor!,
            borderStyle: "dashed",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <ArrowUploadRegular />
            <Text>{dropZoneText}</Text>
          </div>
        </Card>
      )}
      {showFileList && files.length > 0 && (
        <Card style={{ marginTop: "10px" }}>
          <CardHeader header={<Text weight='semibold'>Selected Files</Text>} />
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {getFileIcon(file.name)}
                <Text>{file.name}</Text>
              </div>
              <Button
                icon={<DeleteRegular />}
                appearance='subtle'
                onClick={() => removeFile(index)}
                aria-label='Remove file'
              />
            </div>
          ))}
        </Card>
      )}
      <input
        type='file'
        id={uploadId ? uploadId : "xe-fileupload-button"}
        value=''
        multiple={multiple}
        ref={inputRef}
        accept={accepts ? accepts : ""}
        onChange={fileChanged}
        style={{
          display: "none",
        }}
      />
    </FluentProvider>
  );
};

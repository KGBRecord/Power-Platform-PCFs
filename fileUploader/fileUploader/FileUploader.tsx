import * as React from "react";
import {
  Button,
  CompoundButton,
  Card,
  CardHeader,
  Text,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
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
  buttonColor: string | null;
  buttonTextColor: string | null;
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

  buttonWidth?: string|null;
  buttonHeight?: string|null;
  fileListWidth?: string|null;
  fileListHeight?: string|null;
  fileListPosition?: string|null;
}

const useStyles = makeStyles({
  dropZone: {
    display: "block",
    textAlign: "center",
    ...shorthands.padding("50px"),
    ...shorthands.margin("auto"),
    width: "100%",
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
    buttonColor,
    buttonTextColor,
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
    buttonWidth,
    buttonHeight,
    fileListWidth,
    fileListHeight,
    fileListPosition = "bottom",
  } = props;

  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const triggerUpload = () => inputRef.current?.click();

  React.useEffect(() => {
    setFiles([]);
  }, [resetFiles]);

  React.useEffect(() => {
    props.files(files);
    props.stateChanged();
  }, [files]);

  const readFiles = (arrayFiles: File[]) => {
    arrayFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => [...prev, { name: file.name, file: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const fileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFiles(Array.from(e.target.files));
    }
  };

  const getIcon = () => {
    switch (actionIcon) {
      case "ArrowUploadRegular": return <ArrowUploadRegular />;
      case "DocumentRegular": return <DocumentRegular />;
      case "ImageRegular": return <ImageRegular />;
      case "VideoRegular": return <VideoRegular />;
      case "MusicNote2Regular": return <MusicNote2Regular />;
      case "DocumentPdfRegular": return <DocumentPdfRegular />;
      case "DeleteRegular": return <DeleteRegular />;
      default: return undefined;
    }
  };

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "jpg": case "jpeg": case "png": case "gif": case "bmp": return <ImageRegular />;
      case "mp4": case "mov": case "avi": return <VideoRegular />;
      case "mp3": case "wav": return <MusicNote2Regular />;
      case "pdf": return <DocumentPdfRegular />;
      default: return <DocumentRegular />;
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isHorizontal = fileListPosition === "left" || fileListPosition === "right";
  const flexDirection =
    fileListPosition === "top" ? "column-reverse"
    : fileListPosition === "bottom" ? "column"
    : fileListPosition === "left" ? "row-reverse"
    : "row";

  return (
    <div style={{ display: "flex", flexDirection, width: "100%", height: "100%", gap: "8px" }}>
      <div style={{ width: buttonWidth || "100%", height: buttonHeight || "50px" }}>
        {["primary", "transparent", "outline", "secondary", "subtle"].includes(buttonType || "") && (
          <Button
            icon={getIcon()}
            onClick={triggerUpload}
            appearance={buttonType as "primary" | "transparent" | "outline" | "secondary" | "subtle"}
            iconPosition={iconPosition}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: buttonColor || "#0078D4",
              color: buttonTextColor || "white",
            }}
          >
            {label}
          </Button>
        )}

        {buttonType === "compound" && (
          <CompoundButton
            icon={getIcon()}
            onClick={triggerUpload}
            iconPosition={iconPosition}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: buttonColor || "#0078D4",
              color: buttonTextColor || "white",
            }}
          >
            {label}
          </CompoundButton>
        )}

        {buttonType === "dragdrop" && (
          <Card
            onClick={triggerUpload}
            onDrop={(e) => {
              e.preventDefault();
              readFiles(Array.from(e.dataTransfer.files));
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            className={isDragging ? styles.isDragging : styles.dropZone}
            style={{
              borderWidth: dropZoneBorderSize || "1px",
              borderColor: dropZoneBorderColor || "gray",
              color: dropZoneTextColor || "black",
              borderStyle: "dashed",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
              <ArrowUploadRegular />
              <Text>{dropZoneText}</Text>
            </div>
          </Card>
        )}
      </div>

      {showFileList && files.length > 0 && (
        <div
          style={{
            width: isHorizontal ? fileListWidth || "300px" : "100%",
            height: isHorizontal ? "100%" : fileListHeight || "300px",
            overflow: "auto",
          }}
        >
          <Card>
            <CardHeader header={<Text weight="semibold">Selected Files</Text>} />
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {getFileIcon(file.name)}
                  <Text>{file.name}</Text>
                </div>
                <Button
                  icon={<DeleteRegular />}
                  appearance="subtle"
                  onClick={() => removeFile(index)}
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      <input
        type="file"
        id={uploadId || "xe-fileupload-button"}
        value=""
        multiple={multiple}
        ref={inputRef}
        accept={accepts || ""}
        onChange={fileChanged}
        style={{ display: "none" }}
      />
    </div>
  );
};
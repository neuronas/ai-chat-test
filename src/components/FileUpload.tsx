'use client';
import React,
{
  useRef,
  type SetStateAction,
  type Dispatch,
} from 'react';

export default function FileUpload(
  {
    files,
    setFiles 
  }: 
  {
    files: Array<File>;
    setFiles: Dispatch<SetStateAction<Array<File>>>;
  }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles) {
      setFiles(selectedFiles);
      // remove always to enable input (onChange) upload same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFiles([]);
  };

  return (
    <div className="">

      {files.length > 0 ?
        <button
          onClick={handleClearFiles}
          className="bg-red-500 hover:bg-red-600 max-w-xs w-full rounded-xl border border-solid transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ml-auto"
        >
          Remove File
        </button>
      : 
        <button
          className="max-w-xs w-full rounded-xl border border-solid transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ml-auto"
          onClick={handleUploadClick}
        >
          Add File
        </button>
      }

      <input
        type="file"
        accept="application/pdf,image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

    </div>
  );
}


{/* <PaperclipIcon size={14} /> */}

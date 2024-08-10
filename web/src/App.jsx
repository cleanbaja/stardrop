import { useState } from 'react'
import { Separator } from './components/seperator'
import { Button } from  './components/button'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

import { 
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem
} from './components/file-upload'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./components/input-otp"

import { Github, Paperclip, Download } from 'lucide-react'

import PWABadge from './PWABadge.jsx'

function TruncateName(name) {
  if (name.length > 25) {
    // if the file ends with a dot, don't append
    // a full elipsis
    if (name[24] === '.') {
      return name.substring(0, 25) + "..";
    }

    return name.substring(0, 25) + "...";
  }

  return name;
}

function FileSvgDraw() {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold pr-1">Click to upload</span>
         or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
}

function App() {
  const [files, setFiles] = useState(null)
 
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='container w-full flex flex-col items-center justify-center'>
        <div className='w-screen md:w-1/2 px-8 py-4 inline-flex flex-row justify-between items-center'>
          <h1 className='text-[20px] font-bold flex items-center'>Stardrop</h1>

          <div className="flex items-center">
            <Button className="mr-2 md:mr-4">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </Button>

            <ModeToggle />
          </div>
        </div>

        <Separator className='w-screen md:w-1/2 px-8'/>

        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={dropZoneConfig}
          className="w-screen md:w-1/2 px-8 pt-8 relative bg-background rounded-lg"
        >
          <FileInput className="py-4 outline-dashed outline-4 outline-slate-200 dark:outline-slate-700">
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
              <FileSvgDraw />
            </div>
          </FileInput>
          <FileUploaderContent className="mt-4">
            {files &&
              files.length > 0 &&
              files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  <Paperclip className="h-4 w-4 stroke-current" />
                  <span>{TruncateName(file.name)}</span>
                </FileUploaderItem>
              ))}
          </FileUploaderContent>
        </FileUploader>

        <div class="relative flex py-5 items-center w-screen md:w-1/2 px-8">
          <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          <span class="flex-shrink mx-4 text-gray-400">or enter a code</span>
          <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <div className="w-screen md:w-1/2 px-8 pt-8 relative bg-background flex items-center justify-center rounded-lg">
          <InputOTP maxLength={6} className="p-8 outline">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button className='w-screen md:w-1/3 px-8 mt-12'>
          <Download className="mr-2 h-4 w-4" />
          Click to download
        </Button>
      </div>

      <PWABadge />
    </ThemeProvider>
  )
}

export default App

"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  preview?: string;
  onClear?: () => void;
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ className, preview, onClear, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(preview);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        props.onChange?.(event);
      }
    };

    const handleClear = () => {
      setPreviewUrl(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClear?.();
    };

    React.useEffect(() => {
      setPreviewUrl(preview);
    }, [preview]);

    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-center w-full">
          {previewUrl ? (
            <div className="relative w-40 h-40">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="rounded-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor={props.id}
              className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">画像を選択</span>
            </label>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={(e) => {
            if (typeof ref === 'function') {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
            fileInputRef.current = e;
          }}
          onChange={handleFileChange}
          {...props}
        />
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };
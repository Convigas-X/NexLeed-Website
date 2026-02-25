import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './button';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  className = ""
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onChange(result);
      setIsLoading(false);
      setPreviewError(false);
    };
    reader.onerror = () => {
      alert('Error reading file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const clearImage = () => {
    onChange('');
    setPreviewError(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isBase64Image = value?.startsWith('data:image');
  const isPathImage = value?.startsWith('/');
  const hasImage = value && (isBase64Image || isPathImage);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Preview Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative w-full aspect-video max-h-48 rounded-xl overflow-hidden cursor-pointer
          border-2 border-dashed transition-all duration-300
          ${isDragging 
            ? 'border-gold bg-gold/10' 
            : hasImage 
              ? 'border-dark-border' 
              : 'border-dark-border hover:border-gold/50 hover:bg-gold/5'
          }
          ${className}
        `}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-card">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : hasImage && !previewError ? (
          <>
            <img
              src={value}
              alt="Preview"
              onError={() => setPreviewError(true)}
              className="w-full h-full object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">Click to change image</span>
            </div>
            {/* Clear Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
            <ImageIcon className="w-10 h-10 mb-2" />
            <p className="text-sm">Click or drag image here</p>
            <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* URL Input Option */}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreviewError(false);
            }}
            placeholder="Or enter image URL /assets/..."
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
          />
        </div>
        {hasImage && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="border-dark-border text-white hover:bg-white/5 flex-shrink-0"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
        )}
      </div>

      {isBase64Image && (
        <p className="text-xs text-gold/70">
          <span className="inline-block w-2 h-2 bg-gold rounded-full mr-1 animate-pulse" />
          Image stored in browser (base64)
        </p>
      )}
    </div>
  );
}

// Simple input wrapper for the URL part
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export default ImageUpload;

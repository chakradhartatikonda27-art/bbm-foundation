"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2 } from "lucide-react";

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  className = "",
}: ImageUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(event.target?.result as string);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1. Instantly compress and convert photo in browser to lightweight Base64
      const compressedDataUrl = await compressAndConvertToBase64(file);

      // 2. Set the compressed image immediately so preview and form value update
      onChange(compressedDataUrl);

      // 3. Optional background server upload API ping
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url) {
            onChange(data.url);
          }
        }
      } catch (serverErr) {
        console.warn("Background server upload skipped, using client-compressed Base64.", serverErr);
      }
    } catch (err) {
      setError("Failed to read image file. Please try another image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Box & Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
        {value ? (
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0 group">
              <img
                src={value}
                alt="Selected Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute inset-0 bg-slate-950/80 text-rose-400 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                title="Remove photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Photo Uploaded</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Choose Different Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="px-3 py-2 rounded-xl bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 font-bold text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900/50 hover:bg-slate-900 rounded-xl p-6 text-center cursor-pointer transition-all space-y-2 group"
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-2">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                <span className="text-xs font-bold text-emerald-400">Uploading photo from your computer...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">
                    Click to Upload Photo from Computer / Drive
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    Supports PNG, JPG, WEBP, GIF, SVG (Up to 10MB)
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {error && (
          <p className="text-xs text-rose-400 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}

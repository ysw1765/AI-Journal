import { ImagePreview } from "@/components/upload/ImagePreview";

export function ImageUploader() {
  return (
    <div className="stack">
      <label className="upload-box">
        <span>选择或拖拽图片</span>
        <input type="file" accept="image/*" />
      </label>
      <ImagePreview />
    </div>
  );
}

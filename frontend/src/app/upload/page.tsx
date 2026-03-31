import { ImageUploader } from "@/components/upload/ImageUploader";

export default function UploadPage() {
  return (
    <section className="page-card">
      <p className="eyebrow">Upload</p>
      <h1>上传图片</h1>
      <ImageUploader />
    </section>
  );
}

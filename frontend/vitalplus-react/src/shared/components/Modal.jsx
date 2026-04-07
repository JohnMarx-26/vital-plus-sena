import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  image,
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      <div className="relative flex items-center justify-center min-h-screen">
        <div
          className="
            relative
            w-100
            bg-background
            rounded-xl
            shadow-2xl
            overflow-hidden
          "
          onClick={(e) => e.stopPropagation()}
        >
          {image && (
            <img
              src={image}
              alt="modal visual"
              className="w-full h-40 object-cover"
            />
          )}

          <button
            onClick={onClose}
            className="
              absolute top-3 right-3
              text-text-primary
              hover:text-brand
              transition
            "
          >
            ✕
          </button>

          <div className="p-6">
            {title && (
              <h2 className="text-lg font-semibold mb-4">
                {title}
              </h2>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
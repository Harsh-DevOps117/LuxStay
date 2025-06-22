// src/components/FullScreenLoader.tsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]); // Rerun effect when isLoading changes

  if (!isLoading) {
    return null; // Don't render anything if not loading
  }

  return createPortal(
    <div
      // Changed background to white with opacity and added backdrop-blur for the effect
      // You can adjust 'backdrop-blur-md' to 'backdrop-blur-sm', 'lg', 'xl', etc., for different blur intensities.
      // The 'bg-white/10' (or 'bg-black/10' if you want a darker undertone) provides a subtle base for the blur.
      className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-[1000]"
    >
      <div
        // Changed border-t-blue-500 to border-t-black
        className="w-20 h-20 border-4 border-t-4 border-t-black border-gray-200 rounded-full animate-spin-slow"
      ></div>
      {/* If you add text, consider making it a contrasting color like white */}
      {/* <p className="text-white mt-4 text-xl font-semibold">Uploading your property...</p> */}
    </div>,
    document.body
  );
};

export default FullScreenLoader;

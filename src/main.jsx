import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { routes } from "./lib/router/route";
import { Toaster } from "sonner";





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
    <Toaster
      richColors
      expand={false}
      position="top-right"
      toastOptions={{
        className: "font-manrope text-sm font-medium leading-relaxed",
        duration: 4000,

        success: {
          className:
            "font-manrope border-green-200 bg-white text-gray-900 shadow-lg shadow-green-100/50",
        },

        error: {
          className:
            "font-manrope border-red-200 bg-white text-gray-900 shadow-lg shadow-red-100/50",
        },

        warning: {
          className:
            "font-manrope border-amber-200 bg-white text-gray-900 shadow-lg shadow-amber-100/50",
        },

        info: {
          className:
            "font-manrope border-blue-200 bg-white text-gray-900 shadow-lg shadow-blue-100/50",
        },

        loading: {
          className:
            "font-manrope border-gray-200 bg-white text-gray-600 shadow-lg",
        },

        default: {
          className:
            "font-manrope border-gray-200 bg-white text-gray-900 shadow-lg",
        },
      }}
      className="toaster-container"
      theme="light"
      visibleToasts={5}
      offset="16px"
      gap={8}
    />
  </StrictMode>
);

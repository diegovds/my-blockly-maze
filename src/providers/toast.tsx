import { ToastOptions } from "@/components/ToastOptions";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type ToastContainerProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastContainerProps) => {
  return (
    <>
      {children}
      <Toaster toastOptions={ToastOptions} />
    </>
  );
};

export default ToastProvider;

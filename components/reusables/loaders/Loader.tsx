"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  time: number;
  opacity?: number;
}
const Loader: React.FC<LoaderProps> = ({ time, opacity }) => {
  const [visible, setVisible] = useState<boolean>(true);
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setVisible(false);
    }, time * 1000);
    return () => clearTimeout(timer);
  }, [time]);
  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        opacity === 100
          ? "bg-white dark:bg-background"
          : `bg-black bg-opacity-50`
      } z-50`}
    >
      <div className="flex space-x-4">
        <div className="w-4 h-4 bg-primary rounded-full animate-wave delay-0"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-wave delay-200"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-wave delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;

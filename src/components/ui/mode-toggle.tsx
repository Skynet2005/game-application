// components/ui/modetoggle.tsx
"use client"
import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => { setIsDark(theme === "dark"); }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") { setTheme("light"); } else { setTheme("dark"); }
  };

  return (
    <button onClick={toggleTheme} className="focus:outline-none">
      {isDark ? (
        <Image src="/navbar/moon.png" alt="moon" width={30} height={10} sizes="(max-width: 600px) 60vw, 200px (max-height: 600px) 60vw, 200px" />
      ) : (
        <Image src="/navbar/sun.png" alt="sun" width={30} height={10} sizes="(max-width: 600px) 60vw, 200px (max-height: 600px) 60vw, 200px" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

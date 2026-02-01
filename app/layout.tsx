"use client";

import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Simple page view tracking
    const page = window.location.pathname;

    const stats = JSON.parse(
      localStorage.getItem("familysave_analytics") || "{}"
    );

    stats[page] = (stats[page] || 0) + 1;

    localStorage.setItem(
      "familysave_analytics",
      JSON.stringify(stats)
    );

    console.log("📊 Page views:", stats);
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

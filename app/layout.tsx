import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixar-Style Animation - Jax & Nino",
  description: "A Pixar-style 3D miniature animation featuring Jax the jeep and Nino the robot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

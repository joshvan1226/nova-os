import "./globals.css";

export const metadata = {
  title: "Nova OS",
  description: "Josh's AI worker command center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
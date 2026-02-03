import "./globals.css";
import Header from "./(navigation)/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="min-h-screen bg-black text-white">
        <Header />
        {/* push content below fixed header */}
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}

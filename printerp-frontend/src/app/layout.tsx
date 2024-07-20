import MuiProvider from "@/providers/MuiProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <MuiProvider>{children}</MuiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import AppProvider from "./components/AppContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Pizza - Application",
  description: "Seu melhor pedido de pizza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
          <footer className="border-t p-8 text-center text-gray-500 mt-10">
            &copy; 2023 - Todos os direitos reservados
          </footer>
        </main>
      </body>
    </html>
  );
}

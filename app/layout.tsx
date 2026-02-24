import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
// import ButtonDownload from '@/components/button-download';
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
    title: "Idea International",
    description: "school management system for idea international school",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${GeistSans.variable} ${GeistMono.variable} antialiased mx-0 start`}
            data-brand="orange"
        >
            <body className="font-sans">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <Suspense fallback={null}>
                        <HeroUIProvider>
                            {children}
                        </HeroUIProvider>
                        {/* <ButtonDownload /> */}
                        <Analytics />
                    </Suspense>
                </ThemeProvider>
            </body>
        </html >
    )
}

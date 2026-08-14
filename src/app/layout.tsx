import type { Metadata } from "next";
import localFont from "next/font/local";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const camilaFont = localFont({
	src: "../../public/fonts/VLCAMILA.otf",
	variable: "--font-camila"
})

const libre = Libre_Baskerville({
	variable: "--font-libre-baskerville",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fine-dining experience - OKA F&B website",
	description: "OKA Studio website template for F&B business",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" type="image/png"></link>
			</head>
			<body className={`${camilaFont.variable} ${libre.variable} antialiased bg-[#FAF7F2]`}>{children}</body>
		</html>
	);
}

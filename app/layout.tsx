import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import './globals.css';
import StoreProvider from './StoreProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Classroom',
	description: 'A place to track your present students!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<StoreProvider>
					{children}
				</StoreProvider>
			</body>
		</html>
	);
};
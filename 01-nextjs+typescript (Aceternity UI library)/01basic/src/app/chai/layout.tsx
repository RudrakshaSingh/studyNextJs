export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <><h2 className="text-3xl text-center text-yellow-500 font-bold underline mb-10">inner layout nav</h2>
        {children}</>
  );
}

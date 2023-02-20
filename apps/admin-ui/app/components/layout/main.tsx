export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {children}
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}

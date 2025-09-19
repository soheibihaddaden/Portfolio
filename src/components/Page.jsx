export default function Page({ children, color = "#fff" }) {
  return (
    <main className="page" style={{ color }}>
      {children}
    </main>
  );
}

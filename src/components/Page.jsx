export default function Page({ children, color = "#fff" }) {
  return (
    <main style={{ position: "relative", minHeight: "100vh", color }}>
      {children}
    </main>
  );
}

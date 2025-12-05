import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Bem-vindo ao Sistema IPA</h1>

      <button 
        // AQUI ESTÁ A MUDANÇA: Direto para o arquivo na pasta pages
        onClick={() => router.push("/ProducaoSementes")}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Sementes Produzidas
      </button>
    </div>
  );
}
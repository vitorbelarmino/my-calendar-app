import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Página não encontrada</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Voltar para home
      </Link>
    </div>
  );
}

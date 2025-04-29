import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a StageUnify</h1>
      <p className="text-xl mb-8 text-center">
        Sistema de gestión de eventos para la industria del entretenimiento
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/eventos"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Eventos</h2>
          <p>Gestiona todos tus eventos en un solo lugar</p>
        </Link>
        <Link
          href="/empresas"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Empresas</h2>
          <p>Administra las empresas y sus relaciones</p>
        </Link>
        <Link
          href="/socios"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Socios</h2>
          <p>Gestiona los socios y sus participaciones</p>
        </Link>
      </div>
    </div>
  )
} 
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, CATEGORIES } from '@/constants/services'
import { categoryToSlug } from '@/lib/format'
import Navbar from '@/components/layout/Navbar'
import ServiceCard from '@/components/sections/ServicesCard'

const CATEGORY_COLOR: Record<string, string> = {
  'Streaming Vidéo':          '#3A9AEC',
  'Pack Streaming':           '#3A9AEC',
  'Musique':                  '#2DC430',
  'Sécurité & VPN':           '#3A9AEC',
  'Applications':             '#3A9AEC',
  'Intelligence Artificielle':'#3A9AEC',
}

export async function generateStaticParams() {
  return CATEGORIES
    .filter((c) => c !== 'Tous')
    .map((cat) => ({ slug: categoryToSlug(cat) }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const cat = CATEGORIES.find((c) => categoryToSlug(c) === slug)
  if (!cat || cat === 'Tous') notFound()

  const services = SERVICES.filter((s) => s.category === cat)
  const color = CATEGORY_COLOR[cat] ?? '#3A9AEC'

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', paddingTop: '96px' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span style={{ color: color }}>{cat}</span>
          </nav>

          {/* En-tête */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div
                style={{
                  width: '5px',
                  height: '36px',
                  borderRadius: '3px',
                  background: color,
                }}
              />
              <h1
                className="font-title"
                style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text-main)', lineHeight: 1 }}
              >
                {cat}
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginLeft: '20px' }}>
              {services.length} service{services.length > 1 ? 's' : ''} disponible{services.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Grille complète */}
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

        </div>
      </main>
    </>
  )
}

// app/services/[id]/page.tsx  — Server Component

import { notFound } from 'next/navigation'
import { SERVICES } from '@/constants/services'
import Navbar from '@/components/layout/Navbar'
import ProductDetail from './ProductDetail'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) return {}
  return {
    title: `${service.name} — Service Peterson`,
    description: service.tagline,
  }
}

export default async function ServicePage({ params }: Props) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) notFound()

  return (
    <>
      <Navbar />
      <ProductDetail service={service} />
    </>
  )
}

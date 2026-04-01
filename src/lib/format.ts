export const formatPrice = (amount: number): string =>
  amount.toLocaleString('fr-FR')

export function categoryToSlug(cat: string): string {
  return cat
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

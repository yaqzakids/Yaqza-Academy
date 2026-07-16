import PassportCollectibleCard from '../../PassportCollectibleCard'
import { COLLECTIBLE_CATEGORIES } from '../passportPageData'
import type { KnowledgeCollectible } from '../../../types'

export default function CollectiblesPageContent({ collectibles }: { collectibles: KnowledgeCollectible[] }) {
  const byCategory = COLLECTIBLE_CATEGORIES.map((category) => ({
    category,
    items: collectibles.filter((_, i) => i % COLLECTIBLE_CATEGORIES.length === COLLECTIBLE_CATEGORIES.indexOf(category)),
  }))

  return (
    <>
      <h2 className="passport-page-title">Collectibles</h2>
      <p className="passport-page-subtitle">Treasures found on the journey</p>
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
        {byCategory.map(({ category, items }) =>
          items.length > 0 ? (
            <section key={category}>
              <h3 className="passport-field-label m-0 mb-0.5">{category}</h3>
              <div className="grid grid-cols-2 gap-1">
                {items.map((item) => (
                  <PassportCollectibleCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ) : null,
        )}
        {collectibles.length === 0 && (
          <p className="passport-page-subtitle text-center mt-4">Explore cities to discover collectibles.</p>
        )}
      </div>
    </>
  )
}

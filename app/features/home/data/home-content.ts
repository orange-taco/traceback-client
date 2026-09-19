import {
  archiveEntries,
  getProductEntry,
  products,
} from "~/features/catalog/data/records";

export function getHomeContent() {
  const heroEntry = archiveEntries[0];
  const featuredProducts = products.flatMap((product) => {
    const entry = getProductEntry(product);
    return entry ? [{ product, entry }] : [];
  });

  return { heroEntry, featuredProducts };
}

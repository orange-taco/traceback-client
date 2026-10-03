import { getHomeContent } from "~/features/home/data/home-content";
import { FeaturedProducts } from "~/features/home/sections/featured-products";
import { HomeHero } from "~/features/home/sections/home-hero";

export default function IndexRoute() {
  const { heroEntry, featuredProducts } = getHomeContent();

  return (
    <div>
      <HomeHero entry={heroEntry} />
      <FeaturedProducts items={featuredProducts} />
    </div>
  );
}

// A horizontally auto-scrolling strip of JuiceCard items that pauses on hover.
import JuiceCard from "@/components/home/JuiceCard";

export default function CarouselSection({ items = [], onAdd }) {
  const list = items.length
    ? items
    : Array.from({ length: 6 }).map((_, i) => ({
        id: `apple-${i}`,
        name: "Apple Juice",
        price: 250,
        thumbnail: "/images/apple.png",
      }));

  return (
    <div className="juice-carousel">
      <div className="carousel-track d-flex">
        {list.map((it, idx) => (
          <div className="juice-item" key={`${it.id}-${idx}`}>
            <JuiceCard item={it} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}

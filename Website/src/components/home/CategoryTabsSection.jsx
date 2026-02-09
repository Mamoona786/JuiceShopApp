import CategoryTab from "@/components/home/CategoryTab";
import ProductCard from "@/components/home/ProductCard";

export default function CategoryTabsSection({ onAdd, items = [] }) {
  const apple = items[0] || { id: "apple-tab", name: "Apple Juice", price: 250, thumbnail: "/images/apple.png" };
  return (
    <>
      <ul className="nav nav-tabs my-4" id="categoryTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="category1-tab" data-bs-toggle="tab" data-bs-target="#category1" type="button" role="tab" aria-controls="category1" aria-selected="true">Fresh Juices</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="category2-tab" data-bs-toggle="tab" data-bs-target="#category2" type="button" role="tab" aria-controls="category2" aria-selected="false">Milk Shakes</button>
        </li>
      </ul>
      <div className="tab-content" id="categoryTabsContent">
        <CategoryTab id="category1" active>
          <div className="row">
            <div className="col-md-4"><ProductCard item={apple} onAdd={onAdd} /></div>
          </div>
          <div className="row pt-3"></div>
        </CategoryTab>
        <CategoryTab id="category2">
          <div className="row">
            <div className="col-md-4"><ProductCard item={apple} onAdd={onAdd} /></div>
          </div>
        </CategoryTab>
      </div>
    </>
  );
}

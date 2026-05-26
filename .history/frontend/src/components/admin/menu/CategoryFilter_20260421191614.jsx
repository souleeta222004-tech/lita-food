const categories = ["Tất cả", "Bánh", "Cafe", "Trà sữa", "Gà rán"];

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div className="menu-category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={category === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
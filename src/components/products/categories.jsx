import CategoryPill from "./category-pill"

const Categories = () => {
  return (
    <div>
      <div className="flex gap-2 items-center justify-center">
        <CategoryPill name={"New arrivals"} />
        <CategoryPill name={"Women"} />
        <CategoryPill name={"Cord sets"} />
        <CategoryPill name={"Jackets"} />
        <CategoryPill name={"Accessories"} />
      </div>
    </div>
  )
}

export default Categories
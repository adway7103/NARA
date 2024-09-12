export default function ColorSection ({colors, defaultColor}){
    return (
        <div className="flex gap-2">
        {colors.map((el, index) => (
            <button
              key={`ColorSection${index}el`}
              title={`${el}`}
              className={`p-3 rounded-full border-4 ${
                defaultColor === el ? "border-indigo-500" : null
              }`}
              style={{ backgroundColor: el }}
            >
              {" "}
            </button>
          ))}
      </div>
    )
}
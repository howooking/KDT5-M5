export default function Select() {
  return (
    <div className="px-3 py-4 ring-1 ring-gray-400 focus:outline-none">
      <select name="카테고리">
        <option value="">카테고리</option>
        <option value="">축구화</option>
        <option value="">풋살화</option>
        <option value="">족구화</option>
        <option value="">운동화</option>
        <option value="">의류</option>
      </select>
    </div>
  );
}

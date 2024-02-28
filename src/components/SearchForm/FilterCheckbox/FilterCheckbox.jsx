function FilterCheckbox({handleTumblerChange, checked}) {
  return (
    <div className="filter">
        <input type="checkbox" className="filter__input link" checked={checked} onChange={handleTumblerChange} />
        <label className="filter__label text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;

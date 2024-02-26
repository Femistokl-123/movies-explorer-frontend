import FilterCheckbox from "./FilterCheckbox";
import {useState} from "react";

function SearchForm({ handleShortFilms, isChecked, handleSetSearch, search }) {
  const [input, setInput] = useState(search || "");

  function handleSubmit(e) {
    if (input === "") return;
    e.preventDefault();
    handleSetSearch(input);
    e.preventDefault();
  }

  function handleCheckBoxChange(e) {
    handleSetSearch(input);
    handleShortFilms(!isChecked);
    console.log("check", isChecked)
  }

  return (
    <section className="search ">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__movie">
        <input type="text" className="search__form-input" placeholder="Фильм" required value={input} onChange={e => setInput(e.target.value)} />
        <button className="search__submit link" type="submit"></button>
        </div>
        <FilterCheckbox handleTumblerChange={handleCheckBoxChange} checked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;

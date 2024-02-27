import FilterCheckbox from "./FilterCheckbox";
import {useState} from "react";

function SearchForm({ handleShortFilms, isChecked, handleSetSearch, search }) {
  const [input, setInput] = useState(search || "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (input === "") {
      setError("Нужно ввести ключевое слово");
      return;
    }
    handleSetSearch(input);
    setError("");
  }

  function handleCheckBoxChange(e) {
    handleSetSearch(input);
    handleShortFilms(!isChecked);
    console.log("check", isChecked)
  }

  return (
    <section className="search ">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__movie">
        <input type="text" className="search__form-input" placeholder="Фильм" required value={input} onChange={e => setInput(e.target.value)} />

        <button className="search__submit link" type="submit"></button>
        </div>
        {error && <div className="search__error">{error}</div>}
        <FilterCheckbox handleTumblerChange={handleCheckBoxChange} checked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;

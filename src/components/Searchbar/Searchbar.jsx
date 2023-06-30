import css from './searchbar.module.css'

export const Searchbar = ({ onSubmit }) => {
    return (
      <header className={css.searchbar}>
        <form onSubmit={onSubmit} className={css.searchform}>
          <button type="submit" className={css.searchformbutton}>
            <span className={css.searchformbuttonlabel}>Search</span>
          </button>

          <input
            className={css.searchforminput}
            type="text"
            name="searchQueryInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
};

import css from './button.module.css';

export const ButtonLoadMore = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.button}>
      Load more
    </button>
  );
};

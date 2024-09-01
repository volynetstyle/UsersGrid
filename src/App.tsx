import s from "./App.module.scss";
import UsersDisplay from "./components/UsersDisplay";
import SearchInput from "./components/SearchInput";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setSearchQuery, resetSearchQuery } from "./store/slices/userSlice";
import useLastCallback from "./lib/hooks/useLastCallback";
import { debounce } from "./lib/utils/schedulers";
import { selectFoundedCount } from "./store/selectors/user";
import { formatCount } from "./components/utils/formatCount";
import SetTheme from "./components/SetTheme";

const DEBOUNCE_DURATION = 250;

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFoundedCount);

  const handleFilterChange = useLastCallback(
    debounce(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
      },
      DEBOUNCE_DURATION,
      false,
      true
    )
  );

  const handleResetFilters = useLastCallback(() => {
    dispatch(resetSearchQuery());
  });

  return (
    <div className={s.MainSection}>
      <SearchInput onChange={handleFilterChange} onReset={handleResetFilters} />
      <section aria-describedby="founded-count">
        <p>{formatCount(users)}</p>
      </section>
      <UsersDisplay />
      <SetTheme />
    </div>
  );
}

export default App;

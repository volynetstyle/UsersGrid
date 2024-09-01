import s from "./App.module.scss";
import UsersDisplay from "./components/UsersDisplay";
import SearchInput from "./components/SearchInput";

import { useAppDispatch } from "./store/hooks";
import { setSearchQuery, resetSearchQuery } from "./store/slices/userSlice";
import useLastCallback from "./lib/hooks/useLastCallback";
import { debounce } from "./lib/utils/schedulers";

const DEBOUNCE_DURATION = 250;

function App() {
  const dispatch = useAppDispatch();

  const handleFilterChange = useLastCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  }, DEBOUNCE_DURATION, false, true));

  const handleResetFilters = useLastCallback(() => {
    dispatch(resetSearchQuery());
  });

  return (
    <div className={s.MainSection}>
      <SearchInput
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      <UsersDisplay />
    </div>
  );
}

export default App;

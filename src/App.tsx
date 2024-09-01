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

  const handleFilterChange = useLastCallback(debounce((value: string) => {
    dispatch(setSearchQuery(value));
  }, DEBOUNCE_DURATION, false, true));

  const handleResetFilters = useLastCallback(() => {
    dispatch(resetSearchQuery());
  });

  return (
    <div className={s.MainSection}>
      <SearchInput
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        labels={["Name", "Username", "Email", "Phone"]}
      />
      <UsersDisplay />
    </div>
  );
}

export default App;

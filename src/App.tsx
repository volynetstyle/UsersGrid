import s from "./App.module.scss";
import UsersDisplay from "./components/UsersDisplay";
import SearchInput from "./components/SearchInput";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setSearchQuery, resetSearchQuery } from "./store/slices/userSlice";
import useLastCallback from "./lib/hooks/useLastCallback";
import { debounce } from "./lib/utils/schedulers";
import { selectFoundedCount } from "./store/selectors/user";
import { formatCount } from "./components/utils/formatCount";
import SwitchTheme from "./components/SwitchTheme";

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

  const renderCount = () => (
    <section aria-describedby="founded-count">
      <p>{formatCount(users)}</p>
    </section>
  );
  
  const renderFooter = () => (
    <footer>
      <div className={s.footerContent}>
        <div className={s.footerLinks}>
          <p>@2024 All rights reserved</p>
          <p>
            Created by{" "}
            <a href="https://github.com/volynetstyle">Andrii Volynets</a>
          </p>
          <p>
            SourceCode available on{" "}
            <a href="https://github.com/volynetstyle/UsersGrid">GitHub</a>
          </p>
        </div>
        <SwitchTheme />
      </div>
    </footer>
  );

  return (
    <div className={s.App}>
      <section className={s.MainSection}>
        <SearchInput
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
        {renderCount()}
        <UsersDisplay />
      </section>
      {renderFooter()}
    </div>
  );
}

export default App;

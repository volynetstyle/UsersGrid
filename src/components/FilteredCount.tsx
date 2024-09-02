import { FC, memo } from "react";
import { useAppSelector } from "../store/hooks";
import { selectFoundedCount } from "../store/selectors/user";
import { formatCount } from "./utils/formatCount";

const FilteredCount: FC = () => {
  const count = useAppSelector(selectFoundedCount);

  return (
    <div aria-describedby="founded-count">
      <p>{formatCount(count)}</p>
    </div>
  );
};

export default memo(FilteredCount);

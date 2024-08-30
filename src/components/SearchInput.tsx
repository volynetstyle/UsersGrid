import { FC, ReactNode, memo } from "react";
import buildClassName from "../lib/utils/buildClassName";
import s from "./SearchInput.module.scss";

interface OwnProps {
  ref?: React.RefObject<HTMLInputElement>;
  children?: React.ReactNode;
  parentContainerClassName?: string;
  className?: string;
  inputId?: string;
  value?: string;
  focused?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  canClose?: boolean;
  labels?: ReactNode[];
  onChange: (value: string) => void;
  onReset?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchInput: FC<OwnProps> = ({
  ref,
  parentContainerClassName,
  className,
  inputId,
  value = "",
  focused,
  isLoading = false,
  placeholder,
  labels,
  disabled = false,
  autoComplete,
  canClose,
  onChange,
  onReset,
  onFocus,
  onBlur,
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <form
      className={buildClassName(
        s.searchInputRoot,
        parentContainerClassName,
        focused && s.focused
      )}
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      <label htmlFor={inputId} className={s.visuallyHidden}>
        Search
      </label>
      {labels && (
        <div className={s.labelsContainer}>
          <label htmlFor={inputId} className={s.label}>
            {labels}
          </label>
          <span className={s.separator}></span>
        </div>
      )}
      <input
        className={buildClassName(s.input, className, !labels && s.noLabels)}
        ref={ref}
        id={inputId}
        type="text"
        dir="auto"
        placeholder={placeholder || "Search"}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        spellCheck="false"
        aria-label="Search input"
      />
      {!isLoading && (value || canClose) && onReset && (
        <button
          type="button"
          className={s.clearButton}
          onClick={onReset}
          aria-label="Clear search"
        >
          {/* Clear button content */}
        </button>
      )}
    </form>
  );
};

export default memo(SearchInput);

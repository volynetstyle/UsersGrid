import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  memo,
  RefObject,
  useEffect,
  useState,
} from "react";
import useLastCallback from "../lib/hooks/useLastCallback";
import buildClassName from "../lib/utils/buildClassName";

import s from "./SearchInput.module.scss";

interface OwnProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  id?: string;
  className?: string;
  containerClassName?: string;
  label?: string;
  required?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  focused?: boolean;
  variant?: "slide" | "move" | "zoom";
}

const SearchInput: FC<OwnProps> = ({
  id,
  ref,
  className,
  containerClassName,
  label = "Please enter a value",
  required,
  error,
  success,
  helperText,
  focused,
  variant = "move",
  onChange,
  ...props
}) => {
  const [isInputFocused, setFocused] = useState(focused);

  useEffect(() => {
    if (ref?.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      focused ? ref.current.focus() : ref.current.blur();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  const handleChange = useLastCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (/^\s/.test(value)) {
      e.currentTarget.value = "";
      return;
    }

    onChange?.(e);
    setFocused(value.trim().length > 0);
  });

  const fullClassName = buildClassName(
    s.inputGroup,
    error && s.error,
    containerClassName,
    success && s.success,
    className,
  );

  const renderLabel = () =>
    label ? (
      <label
        data-variant={variant}
        data-position={isInputFocused ? "static" : "float"}
        className={buildClassName(s.userLabel)}
        htmlFor={id}
      >
        {label}&nbsp;{required && "(required)"}
      </label>
    ) : null;

  const renderHelper = () =>
    !error && helperText ? (
      <span id={`${id}-helper`} className={s.helperText}>
        {helperText}
      </span>
    ) : null;

  const renderError = () =>
    error ? (
      <span id={`${id}-error`} className={s.errorText}>
        {error}
      </span>
    ) : null;

  const renderSuccess = () =>
    !error && success ? <span className={s.successText}>{success}</span> : null;

  return (
    <div className={s.inputContainer}>
      <div className={fullClassName}>
        <input
          ref={ref}
          id={id}
          required={required}
          className={s.input}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          onChange={handleChange}
          {...props}
        />
        {renderLabel()}
        {renderHelper()}
      </div>
      {renderError()}
      {renderSuccess()}
    </div>
  );
};

export default memo(SearchInput);
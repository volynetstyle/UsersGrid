import { FC } from 'react';
import s from "./CustomLoader.module.scss";

const CustomLoader: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
  </div>
  );
};

export default CustomLoader;
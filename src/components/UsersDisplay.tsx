import { FC, memo, useEffect } from "react";
import buildClassName from "../lib/utils/buildClassName";
import s from "./UsersDisplay.module.scss";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectFilteredUsers } from "../store/selectors/user";
import { fetchUsers } from "../store/actions/user";
import CustomLoader from "./CustomLoader";

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const UsersDisplay: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const { loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderUsers = () => {
    if (loading) return <CustomLoader />;
    if (error) return <p>Oops... Something went wrong...</p>;
  
    return (
      <div className={buildClassName(s.tableContainer, className)}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
               <tr key={user.id}>
               <td>
                 <span>ID</span> 
                 <p>{user.id}</p>
               </td>
               <td>
                 <span>Name</span>
                 <p>{user.name}</p>
               </td>
               <td>
                 <span>Username</span>
                 <p>{user.username}</p>
               </td>
               <td>
                 <span>Email</span> 
                 <p>{user.email}</p>
               </td>
               <td>
                 <span>Phone</span>
                 <p>{user.phone}</p>
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return renderUsers();
};

export default memo(UsersDisplay);

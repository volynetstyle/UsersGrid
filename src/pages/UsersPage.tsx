import { FC, useEffect } from "react";
import { fetchUsers, selectUsers } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import buildClassName from "../lib/utils/buildClassName";
import s from "./UsersPage.module.scss";

interface OwnProps {
  className?: string;
}

interface StateProps {
  searchQuery?: string;
}

type Props = OwnProps & StateProps;

const UsersPage: FC<Props> = ({ className }) => {
  const user = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user.users.length]);

  const renderUsers = () => {
    if (user.loading) {
      return <div>Loading...</div>;
    }
    if (user.error) {
      return <div>Error: {user.error}</div>;
    }
    if (user.users.length) {
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
              {user.users.map((user) => (
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
    }
    return <div>No users found.</div>;
  };

  return renderUsers();
};

export default UsersPage;

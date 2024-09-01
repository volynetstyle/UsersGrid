import { FC, memo, useEffect } from "react";

import buildClassName from "../lib/utils/buildClassName";
import s from "./UsersDisplay.module.scss";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectFilteredUsers } from "../store/selectors/user";
import { fetchUsers} from "../store/slices/userSlice";

interface OwnProps {
  className?: string;
}

interface StateProps {
  searchQuery?: string;
}

type Props = OwnProps & StateProps;

const UsersPage: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderUsers = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (filteredUsers.length) {
      return (
        <div className={buildClassName(s.tableContainer, className)}>
          <div>
            <table className={s.table} data-skeleton={loading || !filteredUsers.length}>
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
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return <div>No users found.</div>;
  };

  return (
    <>
      {renderUsers()}
    </>
  );
};

export default memo(UsersPage);

import { FC, } from 'react';
import SearchInput from '../components/SearchInput';

interface OwnProps {
  className?: string;
}

interface StateProps {
  searchQuery?: string;

}

const UsersPage: FC<OwnProps & StateProps> = (props) => {

  
  return (
  <>
    <SearchInput onChange={() => {}}/>
  </>);
};

export default UsersPage;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/users/usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { users, isLoading, error } = useSelector((store) => store.users);

  if (isLoading) <h2>Loading ...</h2>;
  if (error !== undefined) <h2>You have an ERROR</h2>;
  return (
    <div>
      {users.map((user) =>
        user.results.map((result) => (
          <ul>
            <li key={result.id.value}>
              {result.name.first} {result.name.last}
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default Users;

import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { limit: 5, offset: 0 }
  });
  const [createUser] = useMutation(CREATE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateUser = async () => {
    await createUser({ variables: { name: 'New User', email: 'new@example.com' } });
    refetch();  // Refetch the user list after creating a new user
  };

  return (
    <div>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <button onClick={handleCreateUser}>
        Add User
      </button>
    </div>
  );
};

export default App;

import { useEffect, useState } from 'react'

interface RandomUser {
  gender: string;
  name: {
    title: string,
    first: string,
    last: string
  };
  email: string;
  login: {
    username: string,
    uuid: string
  };
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  };
  dob: {
    age: number;
  };
}

export function Home() {
  const [randomUsers, setRandomUsers] = useState<RandomUser[]>([]);
  
  async function fetchRandomuser() {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();
    setRandomUsers(data.results);
  }

  useEffect(() => {
    fetchRandomuser();
    
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <table>
        <tbody>
          <tr>
            <th>Foto do Usuário</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Username</th>
            <th>Idade</th>
          </tr>
          {randomUsers.map(user => {
            return (
              <tr key={user.login.uuid}>
                <td><img src={user.picture.thumbnail} alt="" /></td>
                <td>{user.name.first}</td>
                <td>{user.email}</td>
                <td>{user.login.username}</td>
                <td>{user.dob.age}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
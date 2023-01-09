import { FormEvent, useEffect, useState } from 'react'
import { Loading } from '../components/Loading';

interface RandomUser {
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
  const [filteredRandomUsers, setFilteredRandomUsers] = useState<RandomUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userName, setUserName] = useState('');
  
  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;
  

  function handleFilterUsers(event: FormEvent) {
    event.preventDefault();

    if(!userName) fetchRandomuser();
    
    let firstLetterName = userName.substring(0,1).toUpperCase();
    let nameComplement = userName.substring(1,userName.length).toLowerCase();
    let formattedName = firstLetterName+nameComplement;
    
    let filteredUsers = randomUsers.filter(user => (
      user.name.first.includes(formattedName) ||
      user.email.includes(userName) ||
      user.login.username.includes(userName)
    ));
    console.log('aplicando filtro...',formattedName)
    setRandomUsers(filteredUsers);
    indexOfFirstUser = 0;
    indexOfLastUser = 10;
  }

  async function fetchRandomuser() {
    const response = await fetch(`https://randomuser.me/api/?inc=name,email,login,picture,dob&results=30&seed=xa&noinfo`);
    // const response = await fetch('https://randomuser.me/api/?page=1&results=10&seed=xa');
    // const response = await fetch('https://randomuser.me/api/?results=10');
    // const response = await fetch('https://randomuser.me/api/?inc=name,email,login,picture,dob');
    const data = await response.json();
    setRandomUsers(data.results);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchRandomuser();
    
  }, [currentPage])

  if(isLoading) return <Loading />

  return (
    <div>
      <h1>Home Page{randomUsers.length}</h1>
      <form onSubmit={handleFilterUsers}>
        <input 
          type="text" 
          placeholder='Busque pelo nome, e-mail ou username do usuário' 
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
        <button >Buscar</button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Foto do Usuário</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Username</th>
            <th>Idade</th>
          </tr>
          {randomUsers.slice(indexOfFirstUser, indexOfLastUser).map(user => {
            return (
              <tr key={user.login.uuid}>
                <td><img src={user.picture.thumbnail} alt="" /></td>
                <td>{user.name.title} {user.name.first} {user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.login.username}</td>
                <td>{user.dob.age}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <>
        <button onClick={() => setCurrentPage(1)}>1</button>
        <button onClick={() => setCurrentPage(2)}>2</button>
        <button onClick={() => setCurrentPage(3)}>3</button>
      </>
    </div>
  )
}
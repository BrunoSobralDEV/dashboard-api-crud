import { FormEvent, useEffect, useState } from 'react'
import { Loading } from '../components/Loading';

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
}

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredRandomUsers, setFilteredRandomUsers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userName, setUserName] = useState('');
  
  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;
  

  function handleFilterCustomers(event: FormEvent) {
    event.preventDefault();

    if(!userName) fetchCustomers();
    
    let firstLetterName = userName.substring(0,1).toUpperCase();
    let nameComplement = userName.substring(1,userName.length).toLowerCase();
    let formattedName = firstLetterName+nameComplement;
    
    let filteredUsers = customers.filter(customer => (
      customer.name.includes(formattedName) ||
      customer.email.includes(userName)
    ));
    console.log('aplicando filtro...',formattedName)
    setCustomers(filteredUsers);
    indexOfFirstUser = 0;
    indexOfLastUser = 10;
  }

  async function fetchCustomers() {
    const response = await fetch(`http://localhost:3000/customers`);
    const data = await response.json();
    setCustomers(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCustomers();
    
  }, [currentPage])

  if(isLoading) return <Loading />

  return (
    <div>
      <h1>Lista de Clientes - JSONServer</h1>
      
      <div style={{display: "flex", justifyContent: "space-between", padding: "40px 0"}}>
        <form onSubmit={handleFilterCustomers}>
          <input 
            style={{width: "220px"}}
            type="text" 
            placeholder='Busque pelo nome ou e-mail' 
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
          <button >Buscar</button>
        </form>

        <button>+ Cadastrar</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CPF</th>
          </tr>
          {customers.slice(indexOfFirstUser, indexOfLastUser).map((customer, index) => {
            return (
              <tr key={index}>
                <td style={{padding: "10px"}}>{customer.name}</td>
                <td style={{padding: "10px"}}>{customer.email}</td>
                <td style={{padding: "10px"}}>{customer.phone}</td>
                <td style={{padding: "10px"}}>{customer.address}</td>
                <td style={{padding: "10px"}}>{customer.cpf}</td>
                <td style={{padding: "10px"}}>Edtar | Deletar</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <>
        <button onClick={() => setCurrentPage(1)}>1</button>
        {/* <button onClick={() => setCurrentPage(2)}>2</button>
        <button onClick={() => setCurrentPage(3)}>3</button> */}
      </>
    </div>
  )
}
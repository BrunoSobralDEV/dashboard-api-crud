import { FormEvent, useEffect, useState } from 'react'
import { Pencil, Trash, MagnifyingGlass, UserPlus } from "phosphor-react";
import { Table, Alert, Button, Modal, Form, InputGroup } from 'react-bootstrap';

import { Loading } from '../components/Loading';
import { Create } from '../components/Crud';

interface Customer {
  id: number;
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
  const [msgErroFetchApi, setMsgErroFetchApi] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;

  const refresh = () => window.location.reload();

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
    try {
      const response = await fetch(`http://localhost:3000/customers`);
      // const response = await fetch(`https://63daa6cc2af48a60a7d33020.mockapi.io/customers`);
      const data = await response.json();
      setCustomers(data);
      setIsLoading(false);
      
    } catch (error) {
      setMsgErroFetchApi('Não foi possível se conectar ao servidor, tente atualizar a página')
      console.log(error === 'Failed to fetch')
      console.log('Erro:', error)
      setIsLoading(false);
    }
  }

  const setData = (data: Customer) => {
    let { id, name, email, phone, address, cpf } = data;
    localStorage.setItem('ID', String(id));
    localStorage.setItem('Name', name);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone Number', phone);
    localStorage.setItem('Address', address);
    localStorage.setItem('CPF', cpf);

    handleShow();
 }

  useEffect(() => {
    fetchCustomers();
  }, [currentPage])

  if(isLoading) return <Loading />

  return (
    <div>
      <h1>Lista de Clientes - JSONServer</h1>
      
      <div style={{display: "flex", justifyContent: "space-between", padding: "40px 0"}}>
        <Form onSubmit={handleFilterCustomers}>
          <InputGroup className="mb-3">
          <Form.Control
            placeholder="Busque pelo nome ou e-mail"
            aria-label="Busque pelo nome ou e-mail"
            aria-describedby="basic-addon2"
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
          {/* <Form.Group className="mb-6">
            <Form.Control 
              type="text" 
              placeholder='Busque pelo nome ou e-mail' 
              value={userName}
              onChange={event => setUserName(event.target.value)}
            />
          <Button className="mb-3" variant="secondary">
            <MagnifyingGlass size={16} /> Buscar
          </Button>
          </Form.Group> */}
          {/* <input 
            style={{width: "220px"}}
            type="text" 
            placeholder='Busque pelo nome ou e-mail' 
            value={userName}
            onChange={event => setUserName(event.target.value)}
          /> */}
          {/* <button ><MagnifyingGlass size={16} /> Buscar</button> */}
        </Form>

        <div>
          <button onClick={handleShow}>Cadastrar</button>
        </div>
      </div>
      
      {msgErroFetchApi && 
        <Alert key={'msgErroFetchApi'} variant='danger'>
          {msgErroFetchApi} <span style={{cursor: 'pointer', color: 'blue'}} onClick={refresh}>Aqui!</span>
      </Alert>
      }

      {customers.length > 0 &&
        <Table striped>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>CPF</th>
              <th>Editar | Deletar</th>
            </tr>
            {customers.slice(indexOfFirstUser, indexOfLastUser).map((customer, index) => {
              return (
                <tr key={index}>
                  <td style={{padding: "10px"}}>{customer.name}</td>
                  <td style={{padding: "10px"}}>{customer.email}</td>
                  <td style={{padding: "10px"}}>{customer.phone}</td>
                  <td style={{padding: "10px"}}>{customer.address}</td>
                  <td style={{padding: "10px"}}>{customer.cpf}</td>
                  <td style={{padding: "10px"}}>
                    <button onClick={() => setData(customer)}><Pencil size={24} /></button>  <button><Trash size={24} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      }
      <>
        <button onClick={() => setCurrentPage(1)}>1</button>
        {/* <button onClick={() => setCurrentPage(2)}>2</button>
        <button onClick={() => setCurrentPage(3)}>3</button> */}
      </>
      
      <Create showModal={showModal} handleClose={handleClose}/>
    </div>
  )
}
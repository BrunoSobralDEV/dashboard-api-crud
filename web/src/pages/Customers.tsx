import { FormEvent, useEffect, useState } from 'react'
import { Pencil, Trash } from "phosphor-react";
import { Table, Alert, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

import { Loading } from '../components/Loading';
import { CreateModal, UpdateModal } from '../components/Crud';
import { apiURL } from '../lib/api';

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
  const [isLoadingBtn, setIsLoadingBtn] = useState(true);
  const [userName, setUserName] = useState('');
  const [msgErroFetchApi, setMsgErroFetchApi] = useState('');
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleCloseCreate = () => {
    setShowModalCreate(false);
    fetchCustomers();
  };
  const handleCloseUpdate = () => {
    setShowModalUpdate(false);
    fetchCustomers();
  };
  const handleShowCreate = () => setShowModalCreate(true);
  const handleShowUpdate = () => setShowModalUpdate(true);

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
    
    setCustomers(filteredUsers);
    indexOfFirstUser = 0;
    indexOfLastUser = 10;
  }

  async function fetchCustomers() {
    try {
      const response = await fetch(`${apiURL}`);
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

  function setDataToLocalStorage(data: Customer) {
    let { id, name, email, phone, address, cpf } = data;
    localStorage.setItem('ID', String(id));
    localStorage.setItem('Name', name);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone Number', phone);
    localStorage.setItem('Address', address);
    localStorage.setItem('CPF', cpf);
    
    handleShowUpdate();
 }

 async function handleCustomerDelete(id:number) {
  const response = await axios.delete(`${apiURL}${id}`)
    .then(() => fetchCustomers());
 }


  useEffect(() => {
    fetchCustomers();
  }, [currentPage])

  if(isLoading) return <Loading />

  return (
    <div>
      <h1>Lista de Clientes</h1>
      
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
        </Form>

        <div>
          <button className="btn btn-outline-primary" onClick={handleShowCreate}>Cadastrar</button>
        </div>
      </div>
      
      {msgErroFetchApi && 
        <Alert key={'msgErroFetchApi'} variant='danger'>
          {msgErroFetchApi} <span style={{cursor: 'pointer', color: 'blue'}} onClick={refresh}>Aqui!</span>
      </Alert>
      }

      {customers.length > 0 &&
        <Table striped size='sm'>
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
                    <span style={{color: '#8f8f3f', cursor: 'pointer'}} onClick={() => setDataToLocalStorage(customer)}>
                      <Pencil size={20} />
                    </span>{" "}
                    <span style={{color: '#ff0000', cursor: 'pointer'}} onClick={() => handleCustomerDelete(customer.id)}>
                      <Trash size={20} />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      }
      <nav aria-label="Page navigation" className=' d-flex justify-content-end'>
        <ul className="pagination">
          <li className="page-item"><span role="button" onClick={() => setCurrentPage(1)} className="page-link">1</span></li>
          {/* <li className="page-item"><span role="button" onClick={() => setCurrentPage(2)} className="page-link" href="#">2</span></li>
          <li className="page-item"><span role="button" onClick={() => setCurrentPage(3)} className="page-link" href="#">3</span></li> */}
        </ul>
      </nav>
      
      <CreateModal showModal={showModalCreate} handleClose={handleCloseCreate}/>
      <UpdateModal showModal={showModalUpdate} handleClose={handleCloseUpdate}/>
    </div>
  )
}
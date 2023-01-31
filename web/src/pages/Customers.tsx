import { FormEvent, useEffect, useState } from 'react'
import { Pencil, Trash, MagnifyingGlass, UserPlus } from "phosphor-react";
import {Alert, Button, Modal, Form} from 'react-bootstrap';

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
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Form onSubmit={handleFilterCustomers}>
          <Form.Group className="mb-6">
            <Form.Control 
              type="text" 
              placeholder='Busque pelo nome ou e-mail' 
              value={userName}
              onChange={event => setUserName(event.target.value)}
            />
          </Form.Group>
          {/* <input 
            style={{width: "220px"}}
            type="text" 
            placeholder='Busque pelo nome ou e-mail' 
            value={userName}
            onChange={event => setUserName(event.target.value)}
          /> */}
          <Button className="mb-3" variant="secondary">
            <MagnifyingGlass size={16} /> Buscar
          </Button>
          {/* <button ><MagnifyingGlass size={16} /> Buscar</button> */}
        </Form>

        <button onClick={handleShow}>Cadastrar</button>
      </div>
      
      <table>
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
                  <Pencil size={24} /> | <Trash size={24} />
                </td>
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
      
      <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@exemplo.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="(DDD) 00000-0000"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Endereço"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="000.000.000-00"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
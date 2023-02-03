import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import axios from 'axios';

interface Create {
  showModal: boolean;
  handleClose: () => void;
}

export function CreateModal({showModal, handleClose}: Create) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  const [validated, setValidated] = useState(false);
  const [id, setID] = useState(0);

  useEffect(() => {
    setID(Number(localStorage.getItem('ID')) || 0);
    setName(localStorage.getItem('Name') || "");
    setEmail(localStorage.getItem('Email') || "");
    setPhone(localStorage.getItem('Phone Number') || "")
    setAddress(localStorage.getItem('Address') || "")
    setCpf(localStorage.getItem('CPF') || "")
    
  }, [showModal]);

  async function handlePostData(e) {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/customers', {
      name,
      email,
      phone,
      address,
      cpf
    });


    name ? handleClose() : null;
  }

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePostData}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="(DDD) 00000-0000"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Endereço"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              onChange={(e) => setCpf(e.target.value)}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit"> 
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export function UpdateModal({showModal, handleClose}: Create) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  const [validated, setValidated] = useState(false);
  const [id, setID] = useState(0);


  async function handlePostData(e) {
    e.preventDefault();

    await axios.put(`http://localhost:3000/customers/${id}`, {
      name,
      email,
      phone,
      address,
      cpf
    })

    name ? handleClose() : null;
  }

  useEffect(() => {
    setID(Number(localStorage.getItem('ID')) || 0);
    setName(localStorage.getItem('Name') || "");
    setEmail(localStorage.getItem('Email') || "");
    setPhone(localStorage.getItem('Phone Number') || "")
    setAddress(localStorage.getItem('Address') || "")
    setCpf(localStorage.getItem('CPF') || "")
  }, []);

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editar Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePostData}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="(DDD) 00000-0000"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Endereço"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit"> 
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

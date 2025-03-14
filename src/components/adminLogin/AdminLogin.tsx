import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

type AdminLoginProps = {
  onLoginSuccess: (token: string) => void;
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data.token);
      } else {
        setError("Credenciais inválidas ou acesso negado.");
      }
    } catch (err) {
      setError("Erro na conexão com o servidor.");
      console.error(err);
    }
  };

  return (
    <Form className="w-25" onSubmit={handleSubmit}>
      <h1 className="mb-4">Admin Login</h1>
      <Form.Group className="mb-3" controlId="formBasicUser">
        <Form.Label>Usuário:</Form.Label>
        <Form.Control type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha:</Form.Label>
        <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default AdminLogin;
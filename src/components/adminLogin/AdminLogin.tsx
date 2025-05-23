import React from "react";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

type AdminLoginProps = {
  onLoginSuccess: (token: string) => void;
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL as string;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data.token);
      } else {
        setError("Usuário ou senha incorreto.");
      }
    } catch (err) {
      setError("Erro na conexão com o servidor.");
      console.error(err);
    }
  };

  return (
    <section style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center bg-primary">
      <Form style={{ minWidth: "280px" }} className="p-3 text-bg-light rounded-3 fs-5" onSubmit={handleSubmit}>
        <h1 className="mb-4">Admin Login</h1>
        {error && <Alert variant="danger" className="fs-6 p-2">{error}</Alert>}
        <Form.Group className="mb-4" controlId="formBasicUser">
          <Form.Label>Usuário:</Form.Label>
          <Form.Control type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 py-2 fs-5">
          Login
        </Button>
      </Form>
    </section>
  );
};

export default AdminLogin;
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '', // required
    password: '', // required
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.user));
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(event) => handleChange(event)}
        />
        <input
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={(event) => handleChange(event)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

import { ChangeEvent, FormEvent, useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '', // required
    password: '', // required
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.user));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h1>Login Form</h1>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}

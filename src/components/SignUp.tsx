import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div>Sign up</div>
      <form action="">
        <label>
          Username
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          E-mail
          <input />
        </label>
      </form>
    </>
  );
}

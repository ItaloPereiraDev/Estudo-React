import './styles.css';
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
export function Home() {
  const [studentName, setStudentName] = useState(''); //Usa-se o useState para criar um estado, que é uma maneira de atualizar o valor de uma variável no front-end. O primeiro parâmetro é a variável que será atualizada, e o segundo é a função que atualiza o valor da variável.
  const [student, setStudent] = useState([]);
  const [user, setUser] = useState({name:"", avatar:""});
  const id = student.length + 1;
  function handleAddStudent() {
    const newStudent = {
      id,
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR",{hour: '2-digit', minute:'2-digit', second:'2-digit'})
    }
    setStudent(prevState =>[...prevState, newStudent]);
  }

  useEffect(() => {
    //Corpo do useEffect. Aquilo que eu quero que execute.
    fetch('https://api.github.com/users/ItaloPereiraDev')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
    .catch(error => console.log(error))
  }
  ,
  [
    //Estados que o useEffect deve ser executado. Se fica vazio, é executado apenas uma vez, quando a página é renderizada.
  ])

  return (
    <div className='container'>
    <header>
      <h1>Lista de presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Não foi possível carregar a imagem" />
      </div>
    </header>
    <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setStudentName(e.target.value)}
    />
    <button type="submit" onClick={handleAddStudent}>Adicionar</button>
    {
      student.map(student => <Card key={student.id} name={student.name} time={student.time} />)
    }
    </div>
  )
}

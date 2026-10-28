import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs' // библиотека №1: работа с датой и временем
import axios from 'axios' // библиотека №2: HTTP-запросы
import './App.css'

function App() {
  // Текущая дата и время, форматируем через Day.js
  const [now, setNow] = useState(dayjs())
  // Данные, полученные с сервера через axios (пока null — показываем «Загрузка...»)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Раз в секунду обновляем часы
  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000)
    return () => clearInterval(id) // очищаем таймер при размонтировании
  }, [])

  // Один раз при загрузке страницы запрашиваем пост с тестового API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error(err)
        setError('Не удалось загрузить данные')
      })
  }, [])

  const currentDate = now.format('YYYY-MM-DD HH:mm:ss')

  return (
    <div className="app">
      <section className="card">
        <h1>Текущая дата и время:</h1>
        <p className="clock">{currentDate}</p>
        <small>Day.js</small>
      </section>

      <section className="card">
        <h1>Данные из API:</h1>
        {error && <p className="error">{error}</p>}
        {!error && (data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Загрузка...</p>)}
        <small>axios</small>
      </section>
    </div>
  )
}

export default App

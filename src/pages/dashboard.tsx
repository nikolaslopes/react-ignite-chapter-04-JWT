import { useEffect } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { Api } from '../services/Api'

export default function Dashboard() {
  const { user } = useAuthContext()

  useEffect(() => {
    Api.get('/me')
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <h1>Olá, {user?.email}!</h1>
    </>
  )
}

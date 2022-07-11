import { useAuthContext } from '../context/useAuthContext'

export default function Dashboard() {
  const { user } = useAuthContext()

  return (
    <>
      <h1>Olá, {user.email}!</h1>
    </>
  )
}

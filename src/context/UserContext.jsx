import { createContext, useContext } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const user = {
    name: 'Ahmed',
    age: 21,
    jobTitle: 'Web Developer',
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function UserContextCard() {
  const user = useContext(UserContext)

  return (
    <div className="mx-auto my-4 max-w-6xl  border-2 border-yellow-400 p-4 ">
        <p>Name: <span>{user.name}</span></p>
        <p>Age: <span>{user.age}</span></p>
        <p>Job title:<span>{user.jobTitle}</span></p>
    </div>
  )
}

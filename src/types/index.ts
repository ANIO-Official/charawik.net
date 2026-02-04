import type { ReactNode } from "react"

export interface userData {
  token: string,
  user: {
    _id: string,
    username: string,
    email: string,
    password: string,
    __v: Number
  }
}

export interface AuthContextType {
  setToken: (value: string) => void, //call to set the theme
  token: string,
  setUsername: (value: string)=> void, //call to set the username
  username: string
}

export interface ContextProviderProps {
  children: ReactNode
}

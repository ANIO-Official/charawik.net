import type { ReactNode } from "react"

//====Fetch Data Types
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

export interface characterResData{
  message: string
  characters: Character 
}

export interface Character {
  _id: string,
  profileImage: string,
  name: string,
  age: Number,
  biography: string,
  likes: string[],
  dislikes: string[],
  owner: string,
  __v: Number

}

export interface CharacterData {
  characters: Character[],
  count: Number
}

export interface ActivityData {

}

//======== Context Types

export interface AuthContextType {
  setToken: (value: string) => void, //call to set the theme
  token: string,
  setUsername: (value: string) => void, //call to set the username
  username: string
}

//======== Prop Types

export interface ContextProviderProps {
  children: ReactNode
}

export interface CharacterPreviewProps {
  characterName: string,
  characterPicture: string,
  characterID: string
}

export interface DeletionModalProps {
  hidden: boolean,
  setHidden: (newBool: boolean) => void,
  documentType: string,
  id: string
}

//======== Other Types
export interface ProfileImage {
  profilePicture: string
}

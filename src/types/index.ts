import type { ReactNode } from "react"

//====Fetch Data Types
export interface userData {//Register/Login Response
  token: string,
  user: {
    _id: string,
    username: string,
    email: string,
    password: string,
    __v: Number
  }
}
export interface CharacterData {//Get Response (All)
  characters: Character[],
  count: Number
}

export interface characterResData{//Put/Post Response (One)
  message: string
  characters: Character 
}

export interface Character { //Get Response (One)
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

export interface Activity {//Get Response (One)
  _id: string,
  title: string,
  content: string,
  character: string,
  __v: Number
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
export interface ActivityPreviewProps{
  activity: Activity
}

export interface DeletionModalProps {
  hidden: boolean,
  setHidden: (newBool: boolean) => void,
  documentType: string,
  id: string
}

export interface ActivityModalProps{
  hidden: boolean,
  setHidden: (newBool: boolean) => void,
  id: string
  setActivities: Function
}

//======== Other Types
export interface ProfileImage {
  profilePicture: string
}

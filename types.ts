export interface Message {
  id: number
  name: string
  text: string
}

export interface Product {
  id: number
  name: string
  price: number
}

export interface MessageWithComment {
  id: number
  name: string
  text: string
  comments: Message[]
}

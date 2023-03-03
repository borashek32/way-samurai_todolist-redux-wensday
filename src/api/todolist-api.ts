import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  // для этой api не настроены headers
  // headers: {
  //   "API-KEY": "blablabla"
  // }
})


export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>('/todo-lists')
      .then(res => res)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: title})
      .then(res => res)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
      .then(res => res)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
      .then(res => res)
  }
}

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
type ResponseType<T = {}> = {
  data: T
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

// type CreateTodolistResponseType = {
//   id: string
//   fieldsErrors: []
//   data: {
//     item: TodolistType
//   }
//   resultCode: number
// }
// type UpdateTodolistResponseType = {
//   data: {}
//   fieldsErrors: []
//   messages: string[]
//   resultCode: number
// }
// type DeleteTodolistResponseType = {
//   data: {}
//   fieldsErrors: []
//   messages: string[]
//   resultCode: number
// }


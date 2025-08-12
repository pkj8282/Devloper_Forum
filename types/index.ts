// 공통 인터페이스 정의

export interface IUser {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface IPost {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
  author?: IUser
}

export interface IComment {
  id: string
  content: string
  post_id: string
  author_id: string
  created_at: string
  updated_at: string
  author?: IUser
}
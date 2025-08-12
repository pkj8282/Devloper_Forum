import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

export const createClient = () => {
  // 환경변수가 설정되지 않은 경우 더미 클라이언트 반환
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.')
    return null
  }

  const cookieStore = cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 미들웨어에서 cookies를 설정하려고 할 때는 무시
          }
        },
      },
    }
  )
}
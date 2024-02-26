import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  auth: AuthType | null
  loadingStatus: LoadingStatusTypes
}

export type AuthType = {
  user: {
    id: number
    name: string
    userRole: 'totur' | 'student'
    email: string
    avatarUrl: string
    description?: string
    createdAt: Date
  }
  accessToken: string
}

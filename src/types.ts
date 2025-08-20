export interface Question {
  id: string
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
  category: string
  difficulty: string
}

export interface UserSelection {
  userName: string
  category: string
  difficulty: string
  limit: number
}

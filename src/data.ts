import type { Question } from './types'

export async function getData(
  category: string,
  difficulty: string,
  limit: number = 10
): Promise<void> {
  try {
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Question[] = await response.json()

    localStorage.setItem('quizData', JSON.stringify(data))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

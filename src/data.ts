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

export const categories = [
  {
    name: 'Science',
    imageSrc: '/materijal/category/sci.png',
    value: 'science',
  },
  {
    name: 'Film',
    imageSrc: '/materijal/category/film.png',
    value: 'film_and_tv',
  },
  {
    name: 'Art & Literature',
    imageSrc: '/materijal/category/art.png',
    value: 'arts_and_literature',
  },
  {
    name: 'History',
    imageSrc: '/materijal/category/history.png',
    value: 'history',
  },
  {
    name: 'Society & Culture',
    imageSrc: '/materijal/category/soc.png',
    value: 'society_and_culture',
  },
  {
    name: 'Geography',
    imageSrc: '/materijal/category/geo.png',
    value: 'geography',
  },
  {
    name: 'Food & Drink',
    imageSrc: '/materijal/category/food.png',
    value: 'food_and_drink',
  },
  {
    name: 'General Knowledge',
    imageSrc: '/materijal/category/knowledge.png',
    value: 'general_knowledge',
  },
  { name: 'Music', imageSrc: '/materijal/category/music.png', value: 'music' },
  {
    name: 'Sport',
    imageSrc: '/materijal/category/sport.png',
    value: 'sport_and_leisure',
  },
]

export const difficulties = [
  { name: 'Easy', value: 'easy' },
  { name: 'Medium', value: 'medium' },
  { name: 'Hard', value: 'hard' },
]

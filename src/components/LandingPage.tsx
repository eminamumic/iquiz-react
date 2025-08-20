import React, { useState, useEffect } from 'react'
import { CategoryCard } from './CategoryCard'
import { DifficultyCard } from './DifficultyCard'
import { getData } from '../data'
import type { UserSelection } from '../types'
import { categories } from '../data'
import { difficulties } from '../data'
import { useNavigate } from 'react-router-dom'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const [userSelection, setUserSelection] = useState<UserSelection>(() => {
    const savedSelection = localStorage.getItem('userSelection')
    return savedSelection ? JSON.parse(savedSelection) : {}
  })

  useEffect(() => {
    localStorage.setItem('userSelection', JSON.stringify(userSelection))
  }, [userSelection])

  const handleCategory = (value: string) => {
    setUserSelection((prev) => ({ ...prev, category: value }))
  }

  const handleDifficulty = (value: string) => {
    setUserSelection((prev) => ({ ...prev, difficulty: value }))
  }

  const handleName = (name: string) => {
    setUserSelection((prev) => ({ ...prev, userName: name }))
  }

  const handleLimit = (limit: number) => {
    setUserSelection((prev) => ({ ...prev, limit }))
  }

  const handleStartQuiz = async () => {
    const { userName, category, difficulty, limit } = userSelection

    if (!userName) {
      alert('Please enter your name.')
      return
    }
    if (!category) {
      alert('Please choose a category.')
      return
    }
    if (!difficulty) {
      alert('Please choose a difficulty.')
      return
    }

    try {
      await getData(category, difficulty, limit || 10)
      navigate('/quiz')
    } catch (error) {
      console.error('Error fetching quiz data:', error)
      alert('An error occurred while starting the quiz. Please try again.')
    }
  }

  return (
    <div className="landing-page">
      <nav className="navbar">
        <img className="logo-img" src="/materijal/logo.png" alt="logo" />
        <p id="about-us" onClick={() => alert('Show how to play modal here')}>
          How to play
        </p>
      </nav>

      <main>
        {/* Hero / Name input */}
        <section className="hero-landingpage">
          <h1 className="header-text">
            A challenge for your mind.
            <br />
            Are you ready?
          </h1>
          <div className="input-container-name">
            <h1 className="header-text name-header">Enter your name</h1>
            <input
              type="text"
              id="name-input"
              className="question-input-name"
              value={userSelection.userName || ''}
              onChange={(e) => handleName(e.target.value)}
            />
          </div>
        </section>

        <section className="category-landingpage">
          <h1 className="header-text">Choose a Quiz Category</h1>
          <div className="category-container">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.value}
                name={cat.name}
                imageSrc={cat.imageSrc}
                active={userSelection.category === cat.value}
                onClick={() => handleCategory(cat.value)}
              />
            ))}
          </div>
        </section>

        <section className="difficulty-landingpage">
          <h1 className="header-text">Choose Difficulty</h1>
          <div className="category-container">
            {difficulties.map((diff) => (
              <DifficultyCard
                key={diff.value}
                level={diff.name}
                active={userSelection.difficulty === diff.value}
                onClick={() => handleDifficulty(diff.value)}
              />
            ))}
          </div>
        </section>

        <section className="question-number-landingpage">
          <h1 className="header-text">Choose Number of Questions</h1>
          <div className="input-container">
            <input
              type="number"
              id="question-number"
              min={1}
              max={50}
              className="question-input"
              value={userSelection.limit || ''}
              onChange={(e) => handleLimit(parseInt(e.target.value))}
            />
          </div>
        </section>

        <section>
          <button
            id="start-quiz-btn"
            className="btn-landingpage"
            onClick={handleStartQuiz}
          >
            Start
          </button>
        </section>
      </main>
    </div>
  )
}

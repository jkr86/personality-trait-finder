import { useState } from 'react'
import { data } from './data.json'
import { fetchTrait } from './api'

const Quiz = () => {
  const [step, setStep] = useState(1)
  const [questions] = useState(data)
  const [answers, setAnswers] = useState([])
  const [trait, setTrait] = useState('')

  const handleSubmit = async () => {
    let currentStep = step
    if (currentStep <= 2) {
      setStep(currentStep + 1)
      return
    }
    const { message } = await fetchTrait(answers)
    setTrait(message)
    setStep(4)
  }

  const handleChange = (value) => {
    let answerExists = [...answers].find(
      (sin) => sin.question === value.question
    )
    if (answerExists) {
      answerExists.answer = value.answer
      let filteredAnswers = [...answers].filter((sin) => sin !== answerExists)
      setAnswers([...filteredAnswers, answerExists])
    } else {
      setAnswers([...answers, value])
    }
  }

  return (
    <div className="mb-8 mr-0 w-full rounded bg-white shadow sm:mb-0 sm:mr-8 sm:w-1/2">
      <div
        className={`h-64 w-full rounded-t border-b border-gray-400 p-6 ${
          step === 4 && 'flex items-center justify-center'
        }`}
      >
        {/* Questions */}
        {questions.map((single, idx) => {
          return (
            step === idx + 1 && (
              <div key={idx}>
                <h2 className="mb-6 text-lg font-semibold">
                  {single.question}
                </h2>
                <form>
                  <ul>
                    <fieldset id="group1">
                      {single.answers.map((answer, ind) => {
                        return (
                          <li className='my-1' key={ind}>
                            <label className="flex items-center">
                              <input
                                onChange={(e) =>
                                  handleChange({
                                    question: single.id,
                                    answer: answer.marks,
                                    options: single.answers.length,
                                  })
                                }
                                type="radio"
                                value={answer.text}
                                name="group1"
                              />
                              <span className="ml-2">{answer.text}</span>
                            </label>
                          </li>
                        )
                      })}
                    </fieldset>
                  </ul>
                </form>
              </div>
            )
          )
        })}
        {/* Results */}
        {step === 4 && <h2 className="text-center text-2xl">{trait}</h2>}
      </div>
      {step !== 4 && (
        <div className="flex h-12 w-full items-center justify-between rounded-b bg-gray-100 px-6">
          <div>
            Question : <span>{`${step}/${questions.length}`}</span>
          </div>

          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
export default Quiz

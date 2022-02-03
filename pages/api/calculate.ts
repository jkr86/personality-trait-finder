// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'Please fill all required field',
    })
  }
  let answers = req.body
  if (!answers.length) {
    return res.status(200).send({
      message:
        'You have not given the answers. We are unable to calculate your personality trait',
    })
  }
  let answersAverage = 0
  answers.forEach((element) => {
    answersAverage += element.answer / element.options
  })
  let average = answersAverage / answers.length
  res.status(200).json({
    message: `Based on your answers we have found that you are an ${
      average > 0.5 ? 'Extrovert' : 'Introvert'
    }`,
  })
}

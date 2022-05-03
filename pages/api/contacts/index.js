export default async function handler(req, res) 
{
    const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts?'+ new URLSearchParams(req.query))
    const data = await response.json()
    return res.json(data)
}
  
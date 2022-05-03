export default async function handler(req, res) 
{
    console.log(req.method,req.body)
    
    let options = {}

    if(req.method == 'PUT')
    {
        options = {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(req.body)
        }
    }
    else if(req.method == 'DELETE')
    {
        options = {
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        }
    }
    else
    {
        options = {
            method:'GET',
            headers:{'Content-Type':'application/json'},
        }
    }

    const response = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${req.query.id}`,options)
    const data = await response.json()
    return res.json(data)
}
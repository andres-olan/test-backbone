import Layout from '../../../components/layout/Layout'
import Link from'next/link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Delete(props)
{
    const router = useRouter()
    const [question,setQuestion] = useState(true)
    const [message,setMessage] = useState({show:false,title:'',message:'',type:''})

    async function onClick()
    {
        const options = {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        const response = await fetch(`http://localhost:3000/api/contacts/${router.query.id}`,options)
        const remove = await response.json()
        
        if(remove)
        {
            setMessage({show:true,title:'SUCCESS',message:`Contacto: ${router.query.id} eliminado correctamente.`,type:'success'})
            setQuestion(false)
        }
    }

    return(
        <Layout title='backbone | delete'>
            <Link href='/contacts'>regresar a contactos</Link>
            <h1>Eleminar contacto: {router.query.id}</h1>
            {
                question
                &&
                <center>
                    <h2>¿Esta seguro que quiere eliminar este contacto?</h2>
                    <Button type='submit' variant="contained" onClick={() => {onClick()}}>aceptar</Button>
                </center>
            }
            {
                message.show
                &&
                <Grid container>
                    <Grid item lg={12} style={{paddingRight:16}}>
                        <Alert severity={message.type} onClose={() => {setMessage({show:false,title:'',message:'',type:''})}}>
                            <AlertTitle>{message.title}</AlertTitle>
                            {message.message}
                        </Alert>
                    </Grid>
                </Grid>
            }
        </Layout>
    )
}
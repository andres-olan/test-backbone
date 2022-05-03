import Layout from "../../components/layout/Layout"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from "react";
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function Create()
{
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const router = useRouter()
    const [message,setMessage] = useState({show:false,title:'',message:'',type:''})

    async function onSubmit(e)
    {
        console.log(e)

        const options = {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e)
        }

        const response = await fetch(`http://localhost:3000/api/contacts`,options)
        const create = await response.json()

        if(create)
        {
            setMessage({show:true,title:'SUCCESS',message:`Contacto creado correctamente.`,type:'success'})
        }
    }

    return(
        <Layout title='backbone | create'>
            <Link href='/contacts'>regresar a contactos</Link>
            <h1>Crear contacto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField 
                            type='text'
                            id="outlined-basic" 
                            name='firstName' 
                            label="First Name" 
                            variant="outlined" 
                            size='small' 
                            {...register('firstName')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            type='text'
                            id="outlined-basic" 
                            name='lastName' 
                            label="Last Name" 
                            variant="outlined" 
                            size='small' 
                            {...register('lastName')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            type='text'
                            id="outlined-basic" 
                            name='email' 
                            label="E-Mail" 
                            variant="outlined" 
                            size='small' 
                            {...register('email')}
                            error={errors.email != undefined ? true : false}
                            helperText={errors.email && errors.email.message}
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            type='text'
                            id="outlined-basic" 
                            name='phone' 
                            label="Phone" 
                            variant="outlined" 
                            size='small' 
                            {...register('phone')}
                            error={errors.phone != undefined ? true : false}
                            helperText={errors.phone && errors.phone.message}
                        />
                    </Grid>
                    <Grid item lg={2} className="d-grid">
                        <Button type='submit' variant="contained" fullWidth>crear</Button>
                    </Grid>
                    {
                        message.show
                        &&
                        <Grid item lg={12} style={{paddingRight:16}}>
                            <Alert severity={message.type} onClose={() => {setMessage({show:false,title:'',message:'',type:''})}}>
                                <AlertTitle>{message.title}</AlertTitle>
                                {message.message}
                            </Alert>
                        </Grid>
                    }
                </Grid> 
            </form>
        </Layout>
    )
}
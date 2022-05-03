import Layout from '../../../components/layout/Layout'
import Link from'next/link'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Edit(props)
{
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const router = useRouter()
    const [message,setMessage] = useState({show:false,title:'',message:'',type:''})

    async function onSubmit(e)
    {
        const options = {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e)
        }

        const response = await fetch(`http://localhost:3000/api/contacts/${router.query.id}`,options)
        const edit = await response.json()
        
        if(edit.message !== undefined)
        {
            if(edit.message === 'ValidationError')
            {
                if(edit.data.errors.email != undefined)
                {
                    setError('email',{type:'custom',message:String(edit.data.errors.email)})
                }
                else if(edit.data.errors.phone)
                {
                    setError('phone',{type:'custom',message:String(edit.data.errors.phone)})
                }
                
                setMessage({show:false,title:'',message:'',type:''})
            }
            else
            {
                setMessage({show:true,title:'ERROR',message:edit.message,type:'error'})
            }
        }
        else
        {
            setMessage({show:true,title:'SUCCESS',message:`Contacto: ${router.query.id} editado correctamente.`,type:'success'})
        }
    }

    return(
        <Layout title='backbone | edit'>
            <Link href='/contacts'>regresar a contactos</Link>
            <h1>Editar contacto: {props.contact.id}</h1>
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
                            defaultValue={props.contact.firstName}
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
                            defaultValue={props.contact.lastName}
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
                            defaultValue={props.contact.email}
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
                            defaultValue={props.contact.phone}
                            {...register('phone')}
                            error={errors.phone != undefined ? true : false}
                            helperText={errors.phone && errors.phone.message}
                        />
                    </Grid>
                    <Grid item lg={2} className="d-grid">
                        <Button type='submit' variant="contained" fullWidth>editar</Button>
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

export const getServerSideProps = async (context) => {
    const response = await fetch(`http://localhost:3000/api/contacts/${context.query.id}`)
    const contact = await response.json()
    return {props:{contact}}
}
import Link from "next/link"
import Layout from '../../components/layout/Layout'
import DataGrid from '../../components/dataGrid/DataGrid'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import { useEffect, useState } from "react"

export default function Contacts(props)
{
    const [contacts,setContacts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if(props.contacts.results)
        {
            setContacts(props.contacts.results)
        }
    },[props.contacts.results])

    async function changePagination(e,value)
    {
        const response = await fetch(`http://localhost:3000/api/contacts?`+ new URLSearchParams({
            page:value,
            perPage:10
        }))
        const contacts = await response.json()

        setContacts(contacts.results)
        setPage(value)
    }

    return(
        <Layout title='backbone | contacts'>
            <Link href='/'>regresar al inicio</Link>
            <h1>Contactos</h1>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >  
                <Link href='/contacts/create'>
                    <Button variant="contained">crear contacto</Button>
                </Link>
            </Grid>
            <br></br>
            <Paper>
                <DataGrid 
                    columns={['_id','firstName','lastName','email','phone']} 
                    rows={contacts}
                    options={(data) => {
                        return(
                            <>
                                <Link href={'/contacts/edit/'+data._id}>
                                    <IconButton color="primary">
                                        <EditIcon/>
                                    </IconButton>
                                </Link>
                                <Link href={'/contacts/delete/'+data._id}>
                                    <IconButton color="primary">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Link>
                            </>
                        )
                    }}
                />
                <br></br>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Pagination 
                        count={props.contacts.totalPages} 
                        defaultPage={page} 
                        variant="outlined" 
                        shape="rounded" 
                        onChange={(e,value) => {changePagination(e,value)}}
                        style={{margin:10}}
                    />
                </Grid>
            </Paper>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/contacts')
    const contacts = await response.json()
    return {props:{contacts}}
}
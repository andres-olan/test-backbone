import Link from 'next/link'
import Layout from '../components/layout/Layout'

export default function Home() 
{
    return (
        <Layout title='backbone | test'>
          <h1>Bienvenido al <Link href='/contacts'>test de backbone</Link></h1>
        </Layout>
    )
}

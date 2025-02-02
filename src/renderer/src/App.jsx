import {useState, useEffect} from 'react'

import icon from './assets/icon.png'
import { useNavigate, Link } from 'react-router'



const App= () => {
  useEffect(()=> {document.title = 'Партнеры'}, [])
  const [partners, setPartners] = useState([])
  const navigate = useNavigate()
  useEffect(()=> {
    (async () => {
      const res = await window.api.getPartners()
      setPartners(res)
    })()
  }, [])



return (
  <div className='container'>
    <div className='partner-header'>
      <img src={icon} alt="" />
      <h1>Партнеры</h1>
    </div>
    <ul className='partners-list'>
      {partners.map((partner) => {
        return <li className='partner-card' key={partner.id} onClick={() => navigate('/update', {state: {partner}})}>
          <div className='partner-data'>
          <p className='partner-card-header'>{partner.company_type_name} | {partner.name}</p>
          <p>{partner.director}</p>
          <p>+ {partner.phone}</p>
          <p>Рейтинг: {partner.rating}</p>
          </div>
          <div className='partner-data partner-discount'>
          <p className='partner-card-header'>{partner.discount}%</p>
          </div>
        </li>
      })}
      
    </ul>
    <Link to={'/create'}>
    <button>Создать партнера</button></Link>
  </div>
)
}

export default App;
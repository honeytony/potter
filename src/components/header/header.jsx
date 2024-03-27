
import { useEffect, useState } from 'react';
import { useHeroesStore, useSchoolStore } from '../../store/store';
import './header.scss'

function Header() {

  const [choosedSchool, setChoosedSchool] = useState(0);
  const [name, setName] = useState('');

  const schools = useSchoolStore((state)=>state.schools);
  const fetchSchools = useSchoolStore((state)=>state.fetchSchools);
  
  const fetchHeroes = useHeroesStore((state)=>state.fetchHeroes);
  
  const filterByName = useHeroesStore((state)=>state.filterByName);

  const handleChoosedSchool = useHeroesStore((state)=>state.handleChoosedSchool)

  useEffect(()=>{
    fetchSchools();
  },[])


    useEffect(()=>{
      if(name.length > 2){
        filterByName(name);
      } else {
        fetchHeroes();
      }
    }, [name])



    useEffect(()=>{
      if(choosedSchool > 0){
        handleChoosedSchool(choosedSchool);
      } else {
        fetchHeroes();
      }
    },[choosedSchool])

    return <header>
      <div className="container">
        <h1>Harry Potter</h1>
        <h3>View all characters from the Harry Potter universe</h3>

        <div className="inputs">
          <form action="">

            <div className="name">
              <label htmlFor="name">Имя</label>
              <input type="text" placeholder='Гермиона' id="name" value={name}
              onChange={(e)=>{setName(e.target.value)}}
              />
            </div>

            <div className="school">
              <label htmlFor="school">Школа</label>
              <select id='school' onChange={(element)=>{setChoosedSchool(element.target.value)}}>
                <option value="0">Выберите</option>
                  {
                    schools.map((school)=>{
                      return <option value={school.id}>{school.name}</option>
                    })
                  }
              </select>
            </div>
          </form>
        </div>
      </div>
    </header>;
}

export default Header;
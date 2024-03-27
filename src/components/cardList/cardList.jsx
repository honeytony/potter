import { useEffect } from 'react';
import { useHeroesStore } from '../../store/store';
import Card from '../card/card';
import './cardList.scss';


function CardList() {

    const heroes = useHeroesStore((state) => state.heroes);
    
    const loading = useHeroesStore((state) => state.loading);
    const fetchHeroes = useHeroesStore((state) => state.fetchHeroes);

    useEffect(()=>{
        
        fetchHeroes();

    },[])


    return <div className="card-list">
        <div className="container">
            { loading ? <p>Loading...</p> : heroes && heroes.map((card)=>{
                
                    return <Card img={'http://localhost:3001/img/'+card.img}
                                 name={card.name} 
                                 actor={card.actor}
                                 gender={card.gender}
                                 school={card.school.name}
                                 wand={card.wand}
                                 alive={card.alive}
                                 />;
                }) 
            }
        </div>
    </div>;
}

export default CardList;
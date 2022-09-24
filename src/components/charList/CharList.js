import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {
     state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelServise = new MarvelService()

    onCharListLoaded = (charList) => {
         this.setState({
            charList,
            loading: false
         })
    }

    updateCharList = () => {
        this.marvelServise
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
     
    componentDidMount() {
        this.updateCharList()
    }
    
    render() {
        return (
        <div className="char__list">
            <ul className="char__grid">
               <DrowCharList charList={this.state.charList} />
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }
    
}

const DrowCharList = ({ charList }) => {
    const drowItem =(item) => {
        return (
           <li className="char__item" key={item.id}>
                <img src={item.thumbnail} alt="abyss"
                 style={item.thumbnail.includes('image_not_available.jpg') ? { objectFit: 'contain' } : { objectFit: 'cover' }}/>
                    <div className="char__name">{item.name}</div>
            </li> 
        )
    }

    return charList.map(item => drowItem(item))
}

export default CharList;
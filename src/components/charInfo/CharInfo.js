import { Component } from 'react';

import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }
    
    marvelServise = new MarvelService()

    componentDidMount() {
        this.updateChar()
       
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return
        }

        this.onCharLoading();

        this.marvelServise
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
        
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spiner}
                {content}
            </div>
        
    )}
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnail.includes('image_not_available.jpg') ? { objectFit: 'contain' } : { objectFit: 'cover' }}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">{homepage}</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">{wiki}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length < 1 ? 'there no comics' : null }
                {
                        comics.slice(0, 10).map((item, i) => {
                        return (
                            <li key={ i } className="char__comics-item">
                            {item.name}
                        </li>
                    )
                    })
                }
            </ul>
            </>
    )
}

export default CharInfo;
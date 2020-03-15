import React, {useEffect, useState} from 'react'

const Filters = (props) => {

    let {books, GENDERS, GENRES, setBooks, setLoading} = props
    let [filters, setFilters] = useState({genre: '', gender: '', sort_by: {field:'', type: false}} )
    let [initial_state, setInitialState] = useState(true);

    useEffect(() => {
        if(!initial_state){
            setLoading()
            setTimeout(()=>{
                handleChange()
            }, 100)

        }
    }, [filters])

    useEffect(() => {
        setInitialState(false)
    }, [])


    const handleChange = () => {

        if(filters.genre){
            books = books.filter(book => {
                return book.genre === filters.genre
            })
        }

        if(filters.gender){
            books = books.filter(book => {
                return book.gender === filters.gender
            })
        }

        if(filters.sort_by.field){

            if ( filters.sort_by.type ) {
                books.sort(function (a, b) {
                    if (a[filters.sort_by.field] < b[filters.sort_by.field]) return -1;
                    if (a[filters.sort_by.field] > b[filters.sort_by.field]) return 1;
                    return 0;
                });
            } else {
                books.sort(function (a, b) {
                    if (a[filters.sort_by.field] > b[filters.sort_by.field]) return -1;
                    if (a[filters.sort_by.field] < b[filters.sort_by.field]) return 1;
                    return 0;
                });
            }
        }

        setBooks(books)
    }


    const genreClick = (event) => {
        setFilters({...filters, genre: event.target.value})
    }

    const genderClick = (event) => {
        setFilters({...filters, gender: event.target.value})
    }

    const sortBooksByName = () => {
        setFilters({...filters, sort_by: {field:'bookname', type: !filters.sort_by.type} })
    };

    const sortBooksByAuthor = () => {
            setFilters({...filters, sort_by: {field:'author', type: !filters.sort_by.type} })
    };

    return (
        <div className={'filters'}>

            <button className={'myButton'} onClick={sortBooksByName}>Sort By Book Name</button>

            <button className={'myButton'} onClick={sortBooksByAuthor}>Sort By Author Name</button>

            <div className="select">
                <select onChange={genreClick}>
                    <option value=""> - Select Genre - </option>
                    {GENRES.map((genre, id) => <option key={id}>{genre}</option>)}
                </select>
                <div className="select_arrow"></div>
            </div>

            <div className="select">
                <select onChange={genderClick}>
                    <option value=""> - Select Gender &#9893;- </option>
                    {GENDERS.map((gender, id) => <option key={id}>{gender}</option>)}
                </select>
                <div className="select_arrow"></div>
            </div>

        </div>
    );
};

export default Filters;
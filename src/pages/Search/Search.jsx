import React, { Fragment, useEffect } from 'react'
import { getThank } from '../../redux/slices/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ListSearch from '../../components/ListSearch/ListSearch';
function Search() {
    const listSearch = useSelector((state) => state.SearchSlice.listSearch);
    console.log("listSearch", listSearch);
    const dispatch = useDispatch();
    const a = useParams('h');
    console.log(a, "a search");
    useEffect(() => {
        dispatch(getThank(a.id));

    }, [a.id]);
   
    return (
        <div>
            
        </div>
    );
}

export default Search;

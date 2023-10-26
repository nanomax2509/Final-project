    import React, { Fragment, useEffect, useState } from 'react';
    import { getThank } from '../../redux/slices/Search';
    import { useDispatch, useSelector } from 'react-redux';
    import ListSearch from '../../components/ListSearch/ListSearch';
    import { NavLink } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom';
    import css from './Search.module.scss'
    function Search() {
        const dispatch = useDispatch();
        const listSearch = useSelector((state) => state.SearchSlice.listSearch);
        const [searchTerm, setSearchTerm] = useState('');
        const navigate = useNavigate();
        const handleInputChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            // Thực hiện hành động tìm kiếm với giá trị searchTerm
            dispatch(getThank(searchTerm));
            navigate(`/listSearch?searchTerm=${searchTerm}`);
        };

        return (
            <div>
                <form onSubmit={handleSubmit} className='d-flex'>
                    <input
                    className={css.inputSearch}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Tìm kiếm khoá học"
                    />
                    <button className={css.btnSubmit} type="submit">Tìm kiếm</button>
                </form>
            
            </div>
        );
    }

    export default Search;
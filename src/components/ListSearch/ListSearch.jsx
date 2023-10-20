import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '../../utils/index';
import CardSearch from './CardSearch.jsx/CardSearch';

function ListSearch(props) {

	const {	listSearch,  style, className,searchId  } = props;
    console.log(listSearch,"array")
	return (
		<Fragment>
            <h1>Tìm thấy {listSearch.lenght} khoá học cho từ khoá : {searchId}</h1>
		<div className={mergeClassName( className)} style={style}>
			{Array.isArray(listSearch) &&
				listSearch.map((search) => {
					return <CardSearch key={search.maKhoaHoc} search={search} />;
				})}
		</div>
        </Fragment>
	);
}

export default ListSearch;

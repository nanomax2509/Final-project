import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '../../utils/index';
import CardSearch from './CardSearch.jsx/CardSearch';
import { useLocation } from 'react-router-dom';
function ListSearch(props) {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchTerm = searchParams.get('searchTerm');
  
	const listSearch = useSelector((state) => state.SearchSlice.listSearch);
	const { style, className } = props;
	console.log(listSearch, "array")
	return (
		<Fragment>
			<h1 className='p-3'>Tìm thấy {listSearch.length} khoá học cho từ khoá : <span className='text-info'>{searchTerm}</span></h1>
			<div className={mergeClassName(className)} style={style}>
				<div className="row pl-4 pr-4">
				{Array.isArray(listSearch) &&
					listSearch.map((search) => {
						return <CardSearch key={search.maKhoaHoc} search={search} />;
					})}
				</div>
			</div>
		</Fragment>
	);
}

export default ListSearch;

import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate'
import { useScrollTop } from './hooks/useScrollTop';

const Home = lazy(() => import('./pages/Home/Home'));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* element={HomeTemplate} => v5 */}
				<Route path='' element={<HomeTemplate />}>
					
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

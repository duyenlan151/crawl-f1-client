import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const Users = lazy(() => import('@/pages/users'));

const Results = lazy(() => import('@/pages/results'));

export { Home, Users, Results };

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter, Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import { Nav } from './Nav';
import Login from './components/login/login';
import { useState } from 'react';
import RequireAuth from './components/RequireAuth';
import UsersProcessor from './components/users/managedUsers/UsersProcessor';
import ArticlesProcessor from './components/articles/ManageArticlesProcessor';
import UserProfileProcessor from './components/users/userProfile/UserProfileProcessor';
import GroupsProcessor from './components/groups/ManageGroupsProcessor';
import PendingArticlesProcessor from './components/articles/PendingArticlesProcessor';
import AddArticleView from './components/articles/NewArticle/AddArticleView';
import ReadArticlesProcessor from './components/articles/ReadArticle/ReadArticleProcessor';
import EditArticlesProcessor from './components/articles/EditArticle/EditArticleProcessor';
import AllPublishedArticles from './components/PublishedArticles';
import Welcome from './components/Welcome';
import Register from './components/register/Register';

function App() {
  const [token, setToken] = useState();

  const Roles = ["Reader", "Journalist", "Admin"];

  //        <Route element={<RequireAuth allowedRoles={["journalist", "reader"]} />}>
  //<Route path="/NewArticle" element={<NewArticle />} />
  //</Route>

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
      <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ReadArticle" element={<ReadArticlesProcessor />} />
        <Route path="/PublishedArticles" element={<AllPublishedArticles />} />

        <Route path="/ManageArticles" element={<ArticlesProcessor />} />
        <Route path="/ManageGroups" element={<GroupsProcessor />} />
        <Route path="/ManageUsers" element={<UsersProcessor />} />

        <Route path="/PendingArticles" element={<PendingArticlesProcessor/>} />
        <Route path="/EditArticle" element={<EditArticlesProcessor />} />

        <Route path="/UserProfile" element={<UserProfileProcessor />} />
        <Route path="/NewArticle" element={<AddArticleView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Home from '@/views/Home'
import Notes from "@/views/Notes";
import ViewAll from "@/views/ViewAll";
import AddTask from "@/views/AddTask";
import ViewTask from "@/views/ViewTask";

const routes = [
	{ path: '/', component: Home },
	{ path: '/notes', component: Notes },
	{ path: '/view-all', component: ViewAll },
	{ path: '/add-task', component: AddTask },
	{ path: '/view-task/:id', component: ViewTask },
]

export default routes;
import { defineStore } from 'pinia'
import axios from 'axios'
const url = 'https://63e772d0ac3920ad5bde168c.mockapi.io/todo-nep/v1/task/'

export const useTaskStore = defineStore('task-store', {
	state: () => ({
		tasks: [],
		isLoading: false,
	}),
	getters: {
		urgentTasks: (state) => state.tasks.filter(item => item.urgent === true),
		storeHasData: (state) => state.tasks.length > 0,
		numberOfTasks: (state) => state.tasks.filter(item => item.completed === false).length,
		getTaskByID: (state) => { return (id) => state.tasks.find((task) => task.id === id)}
	},
	actions: {
		async initialiseTasks() {
			this.isLoading = true;
			axios.get(url)
				.then((response) => {
					if(response.status === 200) {
						this.tasks = response.data.reverse()
					}
					this.isLoading = false;
				})
				.catch(error => {
					console.log(error);
					this.isLoading = false;
				})
		},
		addTask(payload) {
			let newPayload = {
				...payload,
				createdAt: new Date()
			}
			return axios.post(url, newPayload)
				.then((response) => {
					if(response.data) {
						this.tasks.unshift(response.data);
						return response;
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		delete(id) {
			// Delete the to do item and emit an event to remove the to do item from the list
			return axios.delete(url + id, {
				data: {
					id: id,
				}
			})
			.then((response) => {
				if(response.data) {
					let index = this.tasks.findIndex(item => item.id === id)
					this.tasks.splice(index, 1);
				}
			})
			.catch(error => {
				console.log(error);
				this.loading = false;
			})
		},
		updateTask({payload, id}) {
			let index = this.tasks.findIndex(item => item.id === id)
			axios.put(url + id, payload)
				.then((response) => {
					if(response.data)
						this.tasks[index] = response.data;
				})
				.catch(error => {
					console.log(error);
				})
		},
	},
})
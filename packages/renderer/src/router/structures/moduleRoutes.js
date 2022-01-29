import store from '../../store';

export const moduleRoutes = [
	{
		path: '',
		name: 'modules',
		component: () =>
			import(
				'/@/views/structures/modules/ModulesList.vue'
				),
		meta: {
			code: 'Module.viewAny',
			feather: 'filter',
		},
		children: [
			{
				path: 'form/:id?',
				name: 'module.form',
				component: () =>
					import(
						'/@/views/structures/modules/ModuleForm.vue'
						),
				beforeEnter: (to) => {
					if (to.params.id) {
						return store
							.dispatch('module/getModule', to.params.id)
							.then(() => {
								return { name: to.name };
							})
							.catch(() => -1);
					}
				},
			},
		],
	},
];

const formRules = [
  	{ 
		field: 'title', 
		method: 'isEmpty', 
		validWhen: false, 
		message: 'Name of film is required.' 
	},
	{ 
		field: 'star', 
		method: 'isEmpty', 
		validWhen: false, 
		message: 'Enter at least one actor' 
  	},
  	{ 
		field: 'year',
		method: 'isEmpty', 
		validWhen: false, 
		message: 'Year of film is required'
  	},
  	{ 
		field: 'year', 
		method: 'matches', 
		validWhen: true, 
		args:[/^\d{4}$/],
		message: 'Year must be only numbers end have length "4"'
	},
]

export default formRules;
let B7Validator = {
    handleSubmit: (event) =>{
        event.preventDefault();
        let send = true;

        B7Validator.clearErrors();

        let inputs = document.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = B7Validator.checkInput(input);    
            if (check !== true) {
                send = false;
                B7Validator.showError(input,check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput: (input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for (let k in rules){
                let rDetails = rules[k].split('=');
                switch (rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatorio';
                        }
                        break;
                    case 'min':
                        if(input.value.length <= rDetails[1]){
                            return `Tamanho minimo é de ${rDetails[1]} digitos`
                        }
                        break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Não é um email válido!'
                            }
                        }

                        break;
                    }
                }
            }
            return true;
        },
        showError: (input, error)=>{
            input.style.borderColor = 'red';
            let errorEl = document.createElement('div');
            errorEl.classList.add('error');
            errorEl.innerHTML = error;
            input.parentElement.insertBefore(errorEl, input.ElementSibling);
        },
        clearErrors: ()=>{

            let inputs = form.querySelectorAll('input');
            inputs.forEach((e) => { e.style = '' });

            let errorEl = document.querySelectorAll('.error');
            errorEl.forEach((e)=>{ e.remove() });
        }
};
let form = document.querySelector('.b7validator');

form.addEventListener('submit', B7Validator.handleSubmit)
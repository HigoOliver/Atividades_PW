// Consultar o CEP com função assíncrona
const consultarCEP = async () => {
    const cep = document.getElementById('cep').value.trim(); // Obtém o valor do input e remove espaços no ínicio e no final
   
    const resultadoDiv = document.getElementById('resultados');
    resultadoDiv.style.display = 'none'; 

    
    
    // Validação do CEP
    if (cep.length !== 8 || isNaN(cep)) {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, insira um CEP válido com 8 dígitos.</p>';
        resultadoDiv.style.display = 'block';
        return;
    }

    try {
        // Requisição à API do ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Verifica se a resposta foi ok
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP');
        }

        const data = await response.json();
        
        // Verifica se o CEP foi encontrado
        if (data.erro) {
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML = '<p style="color: red;">CEP não encontrado. Tente outro CEP.</p>';
        } else {
            // Exibe os dados retornados pela API
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML = `
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;
        }
    } catch (error) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerHTML = '<p style="color: red;">Ocorreu um erro ao consultar o CEP.</p>';
    }
};

//  Evento de clique no botão de consulta
document.getElementById('consultar').addEventListener('click', (event) => {
    event.preventDefault(); 
    consultarCEP(); 
});

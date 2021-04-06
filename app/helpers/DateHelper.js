class DateHelper {
    
    constructor() {
        
        throw new Error('Esta classe não pode ser instanciada');
    }
    
    static dataParaTexto(data) {
        
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
    
    static textToData(text) {
        
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) 
            throw new Error('Deve estar no formato dd/mm/aaaa');
             
        return new Date(...text.split('/').reverse().map((item, indice) => item - indice % 2));
    }
}
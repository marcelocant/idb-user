class ProxyFactory {
    
    static create(object, props, acao) {
     
        return new Proxy(object, {
                
                get(target, prop, receiver) {
                    
                    if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                        
                        return function() {
                            
                            console.log(`interceptando ${prop}`);
                            let retorno = Reflect.apply(target[prop], target, arguments);
                            acao(target);
                            return retorno;
                        }
                    }
                    
                    return Reflect.get(target, prop, receiver);
                },
                
                set(target, prop, value, receiver) {
                    
                    let retorno = Reflect.set(target, prop, value, receiver);
                    if(props.includes(prop)) acao(target);
                    return retorno;
                }
        });
    }
    
    static _isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}
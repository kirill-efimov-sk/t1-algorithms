interface IMaskingStrategy {
    apply(value: string): string;
}

// ==================== Masking Strategies ====================
class LoginMaskStrategy implements IMaskingStrategy {
    apply(login: string): string {
        if (login.length <= 7) {
            return login[0] + '*'.repeat(login.length - 1);
        }

        return `${login.slice(0, 2)}***${login.slice(-1)}`;
    }
}

class NameMaskStrategy implements IMaskingStrategy {
    private loginMaskStrategy = new LoginMaskStrategy();

    apply(fullName: string): string {
        const parts = fullName.split(' ');
        if (parts.length === 0) return fullName;
        
        // Reusing the login strategy
        const maskedSurname = this.loginMaskStrategy.apply(parts[0]);
        
        // Not masking
        const name = parts[1] || '';
        
        // Reusing the login strategy
        let maskedPatronymic = '';
        if (parts[2]) {
            maskedPatronymic = this.loginMaskStrategy.apply(parts[2]);
        }

        const maskedFullName = [maskedSurname, name];
        if (maskedPatronymic) {
            maskedFullName.push(maskedPatronymic);
        }

        const result = maskedFullName.filter(part => part.length > 0).join(' '); //toString
        return result;
    }
}

class EmailMaskStrategy implements IMaskingStrategy {
    apply(email: string): string {
        // Format check @
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return email;
        
        const username = email.slice(0, atIndex);
        const domain = email.slice(atIndex); 
        
        if (username.length === 0) return email;
        
        return `${username[0]}***${domain}`;
    }
}

class CardMaskStrategy implements IMaskingStrategy {
    apply(cardNumber: string): string {
        // Remove all whitespaces
        const cleanCardNumber = cardNumber.replace(/\s/g, '');
        
        if (cleanCardNumber.length < 10) return cardNumber;
        
        // Get first 6 numbers
        const firstPart = cleanCardNumber.slice(0, 6);
        // Get all between the first and second parts 
        const middlePart = '*'.repeat(cleanCardNumber.length - 10);
        // Get last 4 numbers
        const secondPart = cleanCardNumber.slice(-4);
        
        const maskedCard = firstPart + middlePart + secondPart;
        
        // Formatting card number (4111 11** **** 1234)
        return maskedCard.match(/.{1,4}/g)?.join(' ') || maskedCard;
    }
}

// ==================== Chain of Responsibility ====================
abstract class FieldHandler {
    protected next: FieldHandler | null = null;
    protected abstract fieldName: string;
    protected abstract regex: RegExp;
    protected abstract strategy: IMaskingStrategy;
    
    setNext(handler: FieldHandler): FieldHandler {
        this.next = handler;
        return handler;
    }
    
    handle(text: string): string {
        let result = this.processField(text);
        if (this.next) {
            result = this.next.handle(result);
        }
        return result;
    }
    
    private processField(text: string): string {
        return text.replace(this.regex, (match, value) => {
            const maskedValue = this.strategy.apply(value);
            return `${this.fieldName}=${maskedValue}`;
        });
    }
}

// ==================== Parser Handlers ====================
class LoginHandler extends FieldHandler {
    protected fieldName = 'login';
    protected regex = /login=([^&\s]+)/g;
    protected strategy = new LoginMaskStrategy();
}

class NameHandler extends FieldHandler {
    protected fieldName = 'name';
    protected regex = /name=([^&]+?)(?=\s+\w+=|$)/g;
    protected strategy = new NameMaskStrategy();
}

class EmailHandler extends FieldHandler {
    protected fieldName = 'email';
    protected regex = /email=([^&\s]+)/g;
    protected strategy = new EmailMaskStrategy();
}

class CardHandler extends FieldHandler {
    protected fieldName = 'card';
    protected regex = /card=(.+?)(?=\s+\w+=|$)/g;
    protected strategy = new CardMaskStrategy();
}

// ==================== Parser ====================
export class MaskingParser {
    private handlerChain: FieldHandler;
    
    constructor() {
        const loginHandler = new LoginHandler();
        const nameHandler = new NameHandler();
        const emailHandler = new EmailHandler();
        const cardHandler = new CardHandler();
        
        loginHandler
            .setNext(nameHandler)
            .setNext(emailHandler)
            .setNext(cardHandler);
        
        this.handlerChain = loginHandler;
    }
    
    parse(input: string): string {
        if (!input || typeof input !== 'string') {
            return '';
        }
        return this.handlerChain.handle(input);
    }
}

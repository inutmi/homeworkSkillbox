let password = '123456789';

// Длина больше или равна 4 и должна содержать "-" или "_"
if (password.length >= 4 && (password.includes("_") || password.includes("-"))) {
    console.log('Пароль надёжный');
} else {
    console.log('Пароль недостаточно надёжный');
}
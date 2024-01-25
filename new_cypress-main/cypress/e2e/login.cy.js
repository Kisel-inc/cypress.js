describe('Автотест на форму логина', function () {
   it('Верный логин и пароль', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели пароль
        cy.get('#loginButton').click(); // Нажали вход
        cy.get('#messageHeader').should('be.visible'); // Проверка что текст виден
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Этот текст

      })

   it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели логин
        cy.get('#loginButton').should('be.disabled'); // Кнопка войти не активная
        cy.get('#pass').type('iLoveqastudio5'); // Ввели пароль
        cy.get('#loginButton').should('be.enabled'); // Кнопка войти активная
        cy.get('#loginButton').click(); // Нажали вход
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Этот текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверка что крестик видно

    })

   it('Функция восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#forgotEmailButton').click(); // Нажать забыл пароль
        cy.get('#forgotForm > .header').should('be.visible'); // Видна надпись
        cy.get('#forgotForm > .header').contains('Восстановите пароль'); // Эта надпись
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible'); // Крестик виден
        cy.get('#mailForgot').type('german2@dolnikov.ru'); // Ввели мэил
        cy.get('#restoreEmailButton').click(); // Нажали отправить код
        cy.get('#messageHeader').should('be.visible'); // Проверить что текст видимый
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Этот текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден

   })

   it('Проверка на негативный кейс авторизации', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#mail').type('german@dolnikov5.ru'); // Ввели неправильный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали вход
        cy.get('#messageHeader').should('be.visible'); // Проверка что текст виден
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Этот текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден
   })

   it('Проверка на негативный кейс валидации', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали вход
        cy.get('#messageHeader').should('be.visible'); // Проверка что текст виден
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Этот текст

   })

   it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Посетили сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин со строчными букввами
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали вход
        cy.get('#messageHeader').should('be.visible'); // Проверка что текст виден
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Этот текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден

   })

})

import { jest, describe, beforeEach, test, expect } from '@jest/globals';
import { handleRegister, handleLogin, handleLogout, carregarUsuario, initDOM } from './script.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- INÍCIO DO MOCK DE LOCALSTORAGE ---
let store = {};
const localStorageMock = {
  getItem(key) {
    return store[key] || null;
  },
  setItem(key, value) {
    store[key] = value.toString();
  },
  removeItem(key) {
    delete store[key];
  },
  clear() {
    store = {};
  }
};
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});


// --- MOCK DE ALERT e CONFIRM ---
global.alert = jest.fn();
global.confirm = jest.fn(() => true); 

// --- CONFIGURAÇÃO DO DOM ---
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
// --- FIM DO DOM ---


// ==================
// INÍCIO DOS TESTES
// ==================
describe("Testes de Autenticação (Login e Registro)", () => {

  let nomeInput, senhaInput, welcomeMsg, loginScreen, appScreen;

  beforeEach(() => {
    document.body.innerHTML = html;
    localStorage.clear();
    jest.clearAllMocks(); 
  initDOM(); 

  nomeInput = document.getElementById('nome');
  senhaInput = document.getElementById('senha');
  welcomeMsg = document.getElementById('welcome');
  loginScreen = document.getElementById('login-screen');
  appScreen = document.getElementById('app-screen');
});

  // --- TESTES DE REGISTRO ---

  test('deve registrar um novo usuário com sucesso', () => {
    nomeInput.value = 'novoUsuario';
    senhaInput.value = 'senha123';
    handleRegister();

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0]).toEqual({ nome: 'novoUsuario', senha: 'senha123' });
    expect(global.alert).toHaveBeenCalledWith('Registrado com sucesso. Agora faça login.');
    expect(nomeInput.value).toBe(''); 
  });

  test('não deve registrar um usuário duplicado', () => {
    const usuariosIniciais = [{ nome: 'usuarioExistente', senha: '123' }];
    localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
    
    nomeInput.value = 'usuarioExistente';
    senhaInput.value = 'senha456';

    handleRegister();
    const usuariosFinais = JSON.parse(localStorage.getItem('usuarios'));
    expect(usuariosFinais).toHaveLength(1); 
    expect(global.alert).toHaveBeenCalledWith('Usuário já existe.');
  });

  test('não deve registrar com campos vazios', () => {
    nomeInput.value = 'usuario';
    senhaInput.value = '';

    handleRegister();

    expect(localStorage.getItem('usuarios')).toBe(null); 
    expect(global.alert).toHaveBeenCalledWith('Preencha nome e senha.');
  });

  // --- TESTES DE LOGIN ---

  test('deve logar um usuário válido e atualizar a UI', () => {
    const usuariosIniciais = [{ nome: 'usuarioValido', senha: 'abc' }];
    localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));

    nomeInput.value = 'usuarioValido';
    senhaInput.value = 'abc';

    handleLogin();

    expect(localStorage.getItem('usuarioAtual')).toBe('usuarioValido');
    expect(nomeInput.value).toBe(''); 
    
    expect(appScreen.classList.contains('hidden')).toBe(false);
    expect(loginScreen.classList.contains('hidden')).toBe(true);
    expect(welcomeMsg.textContent).toBe('Bem-vindo, usuarioValido!');
  });
  
  test('não deve logar usuário com senha inválida', () => {
    const usuariosIniciais = [{ nome: 'usuarioValido', senha: 'abc' }];
    localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
    nomeInput.value = 'usuarioValido';
    senhaInput.value = 'senhaErrada';

    handleLogin();

    expect(localStorage.getItem('usuarioAtual')).toBe(null);
    expect(global.alert).toHaveBeenCalledWith('Usuário ou senha inválidos.');
    expect(appScreen.classList.contains('hidden')).toBe(true); 
  });

  // --- TESTE DE LOGOUT ---

  test('deve fazer logout e mostrar a tela de login', () => {
    localStorage.setItem('usuarioAtual', 'usuarioLogado');
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');

    handleLogout();

    expect(localStorage.getItem('usuarioAtual')).toBe(null);
    expect(appScreen.classList.contains('hidden')).toBe(true);
    expect(loginScreen.classList.contains('hidden')).toBe(false);
  });

});
import { save, load } from "./src/helpers.js";

// --- INÍCIO DO MOCK DE LOCALSTORAGE ---
let store = {};

// Criamos um objeto localStorage falso com os métodos que o seu código usa
const localStorageMock = {
  getItem(key) {
    return store[key] || null;
  },
  setItem(key, value) {
    store[key] = value.toString();
  },
  clear() {
    store = {};
  }
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});
// --- FIM DO MOCK ---


describe("Funções helpers", () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  test("save() deve salvar corretamente no localStorage", () => {
    save("testeKey", { a: 1 });
    const resultado = JSON.parse(localStorage.getItem("testeKey"));
    expect(resultado).toEqual({ a: 1 });
  });

  test("load() deve carregar o valor salvo", () => {
    localStorage.setItem("item", JSON.stringify({ nome: "Alana" }));
    const valor = load("item", null);
    expect(valor).toEqual({ nome: "Alana" });
  });

  test("load() deve retornar fallback caso a chave não exista", () => {
    const valor = load("naoExiste", "fallback");
    expect(valor).toBe("fallback");
  });
});
// ---------- HELPERS ----------
const $ = id => document.getElementById(id);

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}

// ---------- AUTH ----------
const nome = $('nome');
const senha = $('senha');
const btnLogin = $('btnLogin');
const btnRegistrar = $('btnRegistrar');
const loginScreen = $('login-screen');
const appScreen = $('app-screen');
const welcome = $('welcome');
const logoutBtn = $('logout');

btnRegistrar.addEventListener('click', () => {
  const n = nome.value.trim();
  const s = senha.value;
  if (!n || !s) return alert('Preencha nome e senha.');
  const usuarios = load('usuarios', []);
  if (usuarios.some(u => u.nome === n)) return alert('Usuário já existe.');
  usuarios.push({ nome: n, senha: s });
  save('usuarios', usuarios);
  alert('Registrado com sucesso. Agora faça login.');
  nome.value = '';
  senha.value = '';
});

btnLogin.addEventListener('click', () => {
  const n = nome.value.trim();
  const s = senha.value;
  const usuarios = load('usuarios', []);
  const user = usuarios.find(u => u.nome === n && u.senha === s);
  if (!user) return alert('Usuário ou senha inválidos.');
  localStorage.setItem('usuarioAtual', n);
  nome.value = '';
  senha.value = '';
  carregarUsuario();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('usuarioAtual');
  appScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

// ---------- UI ELEMENTS ----------
const tipoEl = $('tipo');
const categoriaEl = $('categoria');
const valorEl = $('valor');
const dataEl = $('data');
const listaTransacoes = $('listaTransacoes');
const saldoEl = $('saldo');

const nomeMeta = $('nomeMeta');
const valorMeta = $('valorMeta');
const criarMetaBtn = $('criarMeta');
const listaMetas = $('listaMetas');

const metasGeral = $('metasGeral');
const barraGeral = $('barraGeral');
const progressoGeralTxt = $('progressoGeralTxt');

// ---------- TRANSAÇÕES ----------
$('adicionar').addEventListener('click', () => {
  const usuario = localStorage.getItem('usuarioAtual');
  if (!usuario) return alert('Faça login.');

  const tipo = tipoEl.value;
  const categoria = categoriaEl.value.trim() || '—';
  const valor = parseFloat(valorEl.value);
  const data = dataEl.value || new Date().toISOString().slice(0,10);

  if (isNaN(valor) || valor <= 0) return alert('Valor inválido.');

  const transacoes = load('transacoes', {});
  transacoes[usuario] = transacoes[usuario] || [];
  transacoes[usuario].push({ tipo, categoria, valor, data });
  save('transacoes', transacoes);

  // limpa inputs e atualiza UI
  valorEl.value = '';
  categoriaEl.value = '';
  dataEl.value = '';
  atualizarInterface();
});

// ---------- METAS (CAIXINHAS) ----------
criarMetaBtn.addEventListener('click', () => {
  const usuario = localStorage.getItem('usuarioAtual');
  if (!usuario) return alert('Faça login.');
  const nomeM = nomeMeta.value.trim();
  const objetivo = parseFloat(valorMeta.value);

  if (!nomeM) return alert('Nome da meta obrigatório.');
  if (isNaN(objetivo) || objetivo <= 0) return alert('Valor da meta inválido.');

  const metas = load('metas', {});
  metas[usuario] = metas[usuario] || [];
  metas[usuario].push({ nome: nomeM, objetivo: objetivo, acumulado: 0 });
  save('metas', metas);

  nomeMeta.value = '';
  valorMeta.value = '';
  atualizarInterface();
});

function adicionarValorMeta(usuario, index) {
  const valorAdd = parseFloat(prompt('Quanto deseja adicionar a essa caixinha? (R$)'));
  if (isNaN(valorAdd) || valorAdd <= 0) return alert('Valor inválido.');
  const metas = load('metas', {});
  if (!metas[usuario] || !metas[usuario][index]) return alert('Meta não encontrada.');
  metas[usuario][index].acumulado = Number(metas[usuario][index].acumulado) + Number(valorAdd);
  save('metas', metas);
  atualizarInterface();
}

function excluirMeta(usuario, index) {
  if (!confirm('Excluir esta meta?')) return;
  const metas = load('metas', {});
  metas[usuario].splice(index, 1);
  save('metas', metas);
  atualizarInterface();
}

// ---------- RENDERIZAÇÃO ----------
function atualizarInterface() {
  const usuario = localStorage.getItem('usuarioAtual');
  if (!usuario) return;

  // transações e saldo
  const transacoes = load('transacoes', {});
  const userTrans = transacoes[usuario] || [];
  listaTransacoes.innerHTML = '';
  let income = 0, expense = 0;
  userTrans.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.tipo === 'income' ? 'Receita' : 'Despesa'}</td>
                    <td>${t.categoria}</td>
                    <td>R$ ${Number(t.valor).toFixed(2)}</td>
                    <td>${t.data}</td>`;
    listaTransacoes.appendChild(tr);
    if (t.tipo === 'income') income += t.valor;
    else expense += t.valor;
  });
  const saldo = income - expense;
  saldoEl.textContent = saldo.toFixed(2);

  // metas (cada caixinha)
  const metas = load('metas', {});
  const userMetas = metas[usuario] || [];
  listaMetas.innerHTML = '';
  if (userMetas.length === 0) {
    listaMetas.innerHTML = '<p>Nenhuma meta criada ainda.</p>';
    metasGeral.classList.add('hidden');
  } else {
    metasGeral.classList.remove('hidden');

    // mostra metas individuais
    userMetas.forEach((m, idx) => {
      const progresso = m.objetivo > 0 ? Math.min((m.acumulado / m.objetivo) * 100, 100) : 0;
      const div = document.createElement('div');
      div.className = 'meta-item';
      div.innerHTML = `
        <div class="meta-header">
          <h4>${m.nome}</h4>
          <div class="meta-actions">
            <button class="small" data-action="add" data-index="${idx}">Adicionar</button>
            <button class="small danger" data-action="del" data-index="${idx}">Excluir</button>
          </div>
        </div>
        <p>Objetivo: R$ ${Number(m.objetivo).toFixed(2)}</p>
        <p>Acumulado: R$ ${Number(m.acumulado).toFixed(2)} — ${progresso.toFixed(1)}%</p>
        <div class="barra"><div class="barraProgresso" style="width:${progresso}%"></div></div>
      `;
      listaMetas.appendChild(div);
    });

    // delegação de eventos para botões das metas
    listaMetas.querySelectorAll('button').forEach(btn => {
      const action = btn.getAttribute('data-action');
      const idx = Number(btn.getAttribute('data-index'));
      btn.onclick = () => {
        if (action === 'add') adicionarValorMeta(usuario, idx);
        if (action === 'del') excluirMeta(usuario, idx);
      };
    });

    // progresso geral (soma acumulado / soma objetivos)
    const somaObjetivos = userMetas.reduce((s, m) => s + Number(m.objetivo), 0);
    const somaAcumulado = userMetas.reduce((s, m) => s + Number(m.acumulado), 0);
    const progressoGeral = somaObjetivos > 0 ? Math.min((somaAcumulado / somaObjetivos) * 100, 100) : 0;
    barraGeral.style.width = `${progressoGeral}%`;
    progressoGeralTxt.textContent = `${progressoGeral.toFixed(1)}%`;
  }

  // mostra o app
  welcome.textContent = `Bem-vindo, ${usuario}!`;
  loginScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
}

// ---------- INICIALIZAÇÃO ----------
function carregarUsuario() {
  const usuario = localStorage.getItem('usuarioAtual');
  if (usuario) atualizarInterface();
}

// Executa ao carregar a página
window.addEventListener('load', carregarUsuario);

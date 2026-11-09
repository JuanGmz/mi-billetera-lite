const form = document.getElementById('gasto-form');
const lista = document.getElementById('historial');
const vacio = document.getElementById('vacio');
const totalEl = document.getElementById('total');

const fmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
const fmtFecha = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' });

async function render() {
  const gastos = await getAllExpenses();
  // Más reciente primero (id como desempate)
  gastos.sort((a, b) => b.fecha - a.fecha || b.id - a.id);

  lista.replaceChildren();
  let total = 0;

  for (const g of gastos) {
    total += g.monto;

    const li = document.createElement('li');

    const info = document.createElement('div');
    const concepto = document.createElement('div');
    concepto.className = 'item-concepto';
    concepto.textContent = g.concepto;
    const meta = document.createElement('div');
    meta.className = 'item-meta';
    meta.textContent = `${g.categoria} · ${fmtFecha.format(g.fecha)}`;
    info.append(concepto, meta);

    const monto = document.createElement('div');
    monto.className = 'item-monto';
    monto.textContent = fmt.format(g.monto);

    li.append(info, monto);
    lista.append(li);
  }

  vacio.hidden = gastos.length > 0;
  totalEl.textContent = fmt.format(total);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const concepto = form.concepto.value.trim();
  const monto = parseFloat(form.monto.value);
  if (!concepto || !Number.isFinite(monto) || monto <= 0) return;

  await addExpense({ concepto, monto, categoria: form.categoria.value, fecha: Date.now() });
  form.reset();
  form.concepto.focus();
  await render();
});

render();

if ('serviceWorker' in navigator) {
  // Si ya había un SW y toma el control uno nuevo, recargar para mostrar la versión nueva
  if (navigator.serviceWorker.controller) {
    let recargado = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (recargado) return;
      recargado = true;
      location.reload();
    });
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) =>
      console.error('Fallo el registro del Service Worker:', err)
    );
  });
}

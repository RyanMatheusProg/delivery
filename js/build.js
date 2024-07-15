app.template("add_item", "<div class=\"card\">\n  <div class=\"subtitle\"><b>Adicionar Item</b></div>\n  <form action=\"add_item\">\n    <div class=\"field\">\n      <label for=\"platform\" class=\"label\">Plataforma</label>\n      <span class=\"select is-small total-width\">\n        <select required name=\"platform\" id=\"platform\" class=\"select control total-width\">\n          <option value=\"agilgo\" selected>ÁgilGO</option>\n<option value=\"beedelivery\">Bee Delivery</option>\n<option value=\"borzo\">Borzo</option>\n<option value=\"box\">Box Delivery</option>\n  <option value=\"ifood\">Ifood</option>\n  <option value=\"james\">James Delivery</option>\n  <option value=\"lalamove\">Lalamove</option>\n  <option value=\"mercadolivre\">Mercado Livre</option>\n  <option value=\"rappi\">Rappi</option>\n  <option value=\"uber\">Uber</option>\n  <option value=\"99\">99</option>\n  <option value=\"other\">Outros</option>\n</select>\n      </span>\n    </div>\n    <div class=\"field\">\n      <label for=\"day\" class=\"label\">Horário da entrega</label>\n      <input required type=\"datetime-local\" id=\"day\" name=\"day\" class=\"input is-small\" value=\"{{ date() }}\" max=\"{{ date() }} 23:59:59\">\n    </div>\n    <div class=\"field\">\n      <label for=\"money\" class=\"label\">Quantidade Obtida</label>\n      <input required type=\"number\" class=\"input is-small\" min=\"0.00\" id=\"money\" name=\"money\" step=\"0.01\" value=\"0.00\"/>\n    </div>\n    <br>\n    <button type=\"submit\" class=\"button is-info\">Salvar</button>\n  </form>\n</div>");
app.template("delete_item", "{% if error %}\n<div>{{ error }}</div>\n{% else %}\n<div class=\"card\">\n  <div class=\"subtitle\"><b>Remover Entrega</b></div>\n  <form action=\"delete_item\">\n    <input type=\"hidden\" name=\"id\" value=\"{{ item.id }}\" />\n    <div class=\"field\">\n      <label class=\"label\">Plataforma</label>\n      <span class=\"select is-small total-width\">\n        <select disabled required class=\"select control total-width\">\n          <option>{{ platform(item.platform) }}</option>\n        </select>\n      </span>\n    </div>\n    <div class=\"field\">\n      <labelclass=\"label\">Horário da entrega</label>\n      <input disabled required type=\"datetime-local\" id=\"day\" class=\"input is-small\" value=\"{{ item.day|date_input }}\" max=\"{{ date() }}T23:59\">\n    </div>\n    <div class=\"field\">\n      <label class=\"label\">Quantidade Obtida</label>\n      <input disabled required type=\"number\" class=\"input is-small\" min=\"0.00\" id=\"money\" step=\"0.01\" value=\"{{ item.money|format_currency(true) }}\"/>\n    </div>\n    <br>\n    <button type=\"submit\" class=\"button is-danger\">Confirmar remoção</button>\n    <a href=\"#edit?id={{ item.id }}&message=Remoção cancelada\" class=\"button is-info\">Cancelar</a>\n  </form>\n</div>\n{% endif %}");
app.template("detail", "<div class=\"card\">\n  <p class=\"subtitle\">Período</p>\n  <form action=\"filter_period\">\n    <div class=\"input_group\">\n      <input required name=\"from\" type=\"date\" class=\"input is-small\" max=\"{{ date() }}\" value=\"{{ from }}\"/>\n      <input required name=\"to\" type=\"date\" class=\"input is-small\" value=\"{{ to }}\"/>\n      <button type=\"submit\" class=\"button is-primary is-small\">\n        Pesquisar\n      </button>\n    </div>\n  </form>\n</div>\n\n{% if items.length > 0 %}\n  {% for item in items %}\n  <div class=\"card detail_card\" data-href=\"#edit?id={{ item.id }}\">\n    <div class=\"icon\">\n      <i class=\"bx bxs-package\"></i>\n    </div>\n    <div class=\"text\">\n      <p>{{ platform(item.platform) }} - <b style=\"color: red;\">{{ item.day|date_format }}</b></p>\n      <p style=\"text-align: right;\"><b>{{ item.money|format_currency }}</b></p>\n    </div>\n  </div>\n  {% endfor %}\n{% else %}\n<div class=\"card\">\n  Sem entregas nesse período\n</div>\n{% endif %}");
app.template("edit", "{% if error %}\n<div>{{ error }}</div>\n{% else %}\n{% if params.message %}\n<div class=\"card alert-success\">\n  {{ params.message }}\n</div>\n{% endif %}\n<div class=\"card\">\n  <div class=\"subtitle\"><b>Editar Entrega</b></div>\n  <form action=\"edit_item\">\n    <div class=\"field\">\n      <label for=\"platform\" class=\"label\">Plataforma</label>\n      <span class=\"select is-small total-width\">\n        <select required name=\"platform\" id=\"platform\" class=\"select control total-width\">\n          <option value=\"agilgo\" {% if item.platform == \"agilgo\" %}selected{% endif %}>ÁgilGO</option>\n<option value=\"beedelivery\" {% if item.platform == \"beedelivery\" %}selected{% endif %}>Bee Delivery</option>\n<option value=\"borzo\" {% if item.platform == \"borzo\" %}selected{% endif %}>Borzo</option>\n<option value=\"box\" {% if item.platform == \"box\" %}selected{% endif %}>Box Delivery</option>\n  <option value=\"ifood\" {% if item.platform == \"ifood\" %}selected{% endif %}>Ifood</option>\n  <option value=\"james\" {% if item.platform == \"james\" %}selected{% endif %}>James Delivery</option>\n  <option value=\"lalamove\" {% if item.platform == \"lalamove\" %}selected{% endif %}>Lalamove</option>\n  <option value=\"mercadolivre\" {% if item.platform == \"mercadolivre\" %}selected{% endif %}>Mercado Livre</option>\n  <option value=\"rappi\" {% if item.platform == \"rappi\" %}selected{% endif %}>Rappi</option>\n  <option value=\"uber\" {% if item.platform == \"uber\" %}selected{% endif %}>Uber</option>\n  <option value=\"99\" {% if item.platform == \"99\" %}selected{% endif %}>99</option>\n  <option value=\"other\" {% if item.platform == \"other\" %}selected{% endif %}>Outros</option>\n</select>\n      </span>\n    </div>\n    <div class=\"field\">\n      <label for=\"day\" class=\"label\">Horário da entrega</label>\n      <input required type=\"datetime-local\" id=\"day\" name=\"day\" class=\"input is-small\" value=\"{{ item.day|date_input }}\" max=\"{{ date() }}T23:59\">\n    </div>\n    <div class=\"field\">\n      <label for=\"money\" class=\"label\">Quantidade Obtida</label>\n      <input required type=\"number\" class=\"input is-small\" min=\"0.00\" id=\"money\" name=\"money\" step=\"0.01\" value=\"{{ item.money|format_currency(true) }}\"/>\n    </div>\n    <br>\n    <button type=\"submit\" class=\"button is-info\">Salvar</button>\n    <a href=\"#delete_item?id={{ item.id }}\" class=\"button is-danger\">Deletar</a>\n  </form>\n</div>\n{% endif %}");
app.template("home", "<div class=\"right\">\n  <a class=\"button\" href=\"#add_item\">Adicionar Entregas</a>\n</div>\n<div class=\"card p-0\">\n  <div class=\"tab\">\n    <button class=\"tablinks active\" data-to=\"0\">Hoje</button>\n    <button class=\"tablinks\" data-to=\"1\">Semanal</button>\n    <button class=\"tablinks\" data-to=\"2\">Mensal</button>\n  </div>\n  <div class=\"tabcontent\" style=\"display: block;\">\n    <p>Ganhos</p>\n    <p class=\"title\">{{ today.credit|format_currency }}</p>\n    <p>Melhor Plataforma: {{ platform(today.bestPlatform) }} </p>\n    <p>\n  <a href=\"#detail?from={{ period.today.from }}&to={{ period.today.to }}\" class=\"button is-small\">Detalhar</a>\n</p>\n  </div>\n  <div class=\"tabcontent\">\n    <p>Ganhos</p>\n    <p class=\"title\">{{ week.credit|format_currency }}</p>\n    <p>Melhor Plataforma: {{ platform(week.bestPlatform) }}</p>\n    <div style=\"padding: 10px\">\n      <div class=\"x-chart\" data-chart={{ week.chart|json }}></div>\n    </div>\n    <p>\n    <a href=\"#detail?from={{ period.week.from }}&to={{ period.week.to }}\" class=\"button is-small\">Detalhar</a>\n  </p>\n  </div>\n  <div class=\"tabcontent\">\n    <p>Ganhos</p>\n    <p class=\"title\">{{ month.credit|format_currency }}</p>\n    <p>Melhor Plataforma: {{ platform(month.bestPlatform) }}</p>\n    <div style=\"padding: 10px\">\n      <div class=\"x-chart\" data-chart={{ month.chart|json }}></div>\n    </div>\n    <p>\n    <a href=\"#detail?from={{ period.month.from }}&to={{ period.month.to }}\" class=\"button is-small\">Detalhar</a>\n  </p>\n  </div>\n  \n</div>");
app.component("chart", (screen) => {
for(const $ of screen.find(".x-chart")){
  const attr = $.attr("data-chart");
  $.parent.removeAttribute("data-chart");
  $.html("<canvas height=\"400\"></canvas>")
  const json = JSON.parse(attr);
  console.log(json);
  new Chart(
    $.parent.querySelector("canvas"),
    {
      type: "bar",
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            min: 0,
            max: Math.ceil((Math.max(...(json.map(e => e[1]))) + 20) / 10) * 10
          }
        }
      },
      data: {
        labels: json.map(e => e[0]),
        datasets: [
          {
            label: "Quantidade obtida",
            data: json.map(e => e[1])
          }
        ]
      }
    }
  )
}
});
app.component("form", (screen) => {
screen.find("form").forEach((e) => {
      const url = e.attr("action");
      e.on("submit", (ev) => {
        ev.preventDefault();
        const form = new FormData(ev.currentTarget);
        app.request(url, form).then((res) => {
          if(res.status === "error"){
            return alert(res.message || "Houve um erro desconhecido");
          } else {
            const u = res.url || "home";
            app.mount(u, { message: res.message })
          }
        })
      })
    })
});
app.component("screen_link", (screen) => {
/*screen.find("a").forEach((e) => {
  e.on("click", (e)=>{
    const href = e.currentTarget.getAttribute("href")
    if(href.startsWith("#")){
      e.preventDefault();
      app.mount(href.slice(1));
    }
  })
})*/
screen.find("[data-href]").forEach((e) => {
  e.on("click", (e)=>{
    const href = e.currentTarget.getAttribute("data-href")
    if(href.startsWith("#")){
      location.href = href;
    }
  })
})
});
app.component("tabs", (screen) => {
const tabs = screen.find(".tabcontent");

screen.find(".tablinks").forEach((el) => {
  const index = el.attr("data-to");
  el.on("click", (ev) => {
    screen.find(".tablinks.active").forEach(($e) => {
      $e.removeClass("active");
    })
    screen.find(".tabcontent").forEach(($e) => {
      $e.css.display = "none";
    });
    if(tabs[index])
      tabs[index].css.display = "block";
    el.addClass("active")
  })
})
});
app.screen("delete_item", async (params) => {
const item = await db.delivery.where({ id: Number(params.id || 0) }).first();

if(!item) return { error: "Not Found"};

return {
  item,
  params
}
});
app.screen("detail", async (params) => {
const textFrom = params.from 
  ? params.from
  : getMonthDates()[0];

const from = new Date(textFrom).getTime();

const textTo = params.to
  ? params.to
  : getMonthDates().pop()
const to = new Date(textTo).getTime() + (((24 * 60 * 60) - 1) * 1000);

const offset = (Number(params.page) || 1) * 25 - 25;
let i = 0;
let m = 0;
const items = await db.delivery.orderBy("day").reverse().filter((e) => {
  i++;
  if(i <= offset) return false;
  if(m > 25) return false;
  m++
  return e.day >= from && e.day <= to;
}).toArray();
    
const register = items.slice(0, 25);

return {
  from: textFrom,
  to: textTo,
  items: register,
  hasBeforePage: offset > 0,
  hasNextPage: items.length === 26,
  beforePage: Number(params.page || 1) - 1,
  nextPage: Number(params.page || 1) + 1,
}
});
app.screen("edit", async (params) => {
const item = await db.delivery.where({ id: Number(params.id || 0) }).first();

if(!item) return { error: "Not Found"};

return {
  item,
  params
}
});
app.screen("home", async (params) => {

const weekDays = getFormattedWeekDates();
const monthDays = getMonthDates();
const todayText = formatDate(new Date());
const t = [
  ...weekDays, ...monthDays
].map(e => (new Date(e)).getTime());
const registers = await db.delivery.where("day").between(Math.min(...t), Math.max(...t), true, true).toArray();

const today = { 
  credit: 0, 
  platforms: createPlatformObject(),
  bestPlatform: "agilgo"
};
const week = {
  credit: 0,
  platforms: createPlatformObject(),
  bestPlatform: "agilgo",
  chart: {},
  $chart: {}
};
const month = {
  credit: 0,
  platforms: createPlatformObject(),
  bestPlatform: "agilgo",
  chart: {},
  $chart: {}
}
for(const w of weekDays)
  week.$chart[w] = 0;
for(const d of monthDays)
  month.$chart[d] = 0
for(const item of registers){
  const day = formatDate(new Date(item.day))
  if(todayText === day){
    today.platforms[item.platform] += item.money
    today.credit += item.money;
  }
  if(weekDays.includes(day)){
    week.platforms[item.platform] += item.money;
    week.credit += item.money;
    week.$chart[day] += item.money
  }
  if(monthDays.includes(day)){
    month.platforms[item.platform] += item.money;
    month.credit += item.money;
    month.$chart[day] += item.money
  }
}
today.bestPlatform = findIndexOfMaxValue(today.platforms);
week.bestPlatform = findIndexOfMaxValue(week.platforms);
month.bestPlatform = findIndexOfMaxValue(month.platforms);

for(const d of Object.keys(month.$chart)){
  const day = d.split("-")[2];
  month.chart[Number(day)] = month.$chart[d];
}
console.log(week.$chart)
let $i=-1;
const $s = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]
for(const $d of Object.keys(week.$chart)){
  $i++;
  week.chart[$s[$i]] = week.$chart[$d]
}

function createPeriod(start, end){
  return {from: start, to: end };
}

const period = {
  today: createPeriod(todayText, todayText),
  week: createPeriod(weekDays[0], weekDays[weekDays.length - 1]),
  month: createPeriod(monthDays[0], monthDays[monthDays.length - 1])
}

return {
  today, week, month, period
}
});
app.action("add_item", async (params, form) => {
const platform = form.get("platform")
if(!Platforms[platform]) return API.error("Plataforma desconhecida");
const date = form.get("day");
if(!T.date(date)) return API.error("Data inválida");
const d = new Date(date);
if(d > new Date()) return API.error("Não é possível definir uma data no futuro");

const money = form.get("money");
if(Number(money) < 0) return API.error("Valor recebido não pode ser negativo");

const res = await db.delivery.add({
  platform, day: d.getTime(), money: Number(money)
})
return API.redirect("home", "Adicionado com sucesso")
});
app.action("delete_item", async (params, form) => {
await db.delivery.delete(Number(params.id || 0));
return API.redirect("detail", "Removido com sucesso")
});
app.action("edit_item", async (params, form) => {
const platform = form.get("platform")
if(!Platforms[platform]) return API.error("Plataforma desconhecida");
const date = form.get("day");
if(!T.date(date)) return API.error("Data inválida");
const d = new Date(date);
if(d > new Date()) return API.error("Não é possível definir uma data no futuro");

const money = form.get("money");
if(Number(money) < 0) return API.error("Valor recebido não pode ser negativo");


const item = await db.delivery.where({ id: Number(params.id || 0) }).modify({
  platform, day: d.getTime(), money: Number(money)
});

if(!item) return API.error("Erro desconhecido")

return API.redirect("edit?id=" + params.id, "Editado com sucesso")
});
app.action("filter_period", async (params, form) => {
const from = form.get("from");
if(!/^[0-9]+\-[0-9]+\-[0-9]+$/.test(from)) return API.error("Data inválida " + from);

const to = form.get("to");
if (!/^[0-9]+\-[0-9]+\-[0-9]+$/.test(to)) return API.error("Data inválida " + to);

return API.redirect("detail?from=" + from + "&to=" + to, "Filtrado com sucesso")
});

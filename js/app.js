const date = () => `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

Twig.extendFunction("date", function() {
  return date();
});

Twig.extendFilter("json", function(value){
  return JSON.stringify(Object.entries(value));
})

Twig.extendFilter("date_format", function(value){
  if(!T.date(value)) return `Data inválida`
  const d = new Date(value);
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
})

function convertTimestampToDatetimeLocal(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

Twig.extendFilter("date_input", (value) => {
  return convertTimestampToDatetimeLocal(value);
})

function formatCurrency(number) {
  // Formatando o número como moeda brasileira (R$)
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

Twig.extendFilter("format_currency", (value, onlyNumber = false) => {
  if(onlyNumber)
    return Number(value).toFixed(2)
  return formatCurrency(Number(value))
});

const Platforms = {
  agilgo: "ÁgilGO",
  beedelivery: "Bee Delivery",
  borzo: "Borzo",
  box: "Box Delivery",
  ifood: "Ifood",
  james: "James",
  lalamove: "Lalamove",
  mercadolivre: "Mercado Livre",
  rappi: "Rappi",
  uber: "Uber",
  "99": "99",
  other: "Outros"
}

Twig.extendFunction("platform", (name) => {
  return String(Platforms[name] ?? name)
})

function createPlatformObject(){
  const obj = {};
  for(const k in Platforms)
     obj[k] = 0;
  return obj;
}

class T {
  static string(v){
    return typeof v === "string";
  }
  static number(v){
    return typeof v === "number";
  }
  static date(v){
    try {
      new Date(v);
      return true;
    } catch {
      return false;
    }
  }
  static integer(v){
    return this.all(
      this.number(v),
      Number.isInteger(v)
    )
  }
  static boolean(v){
    return typeof v === "boolean"
  }
  static fun(v){
    return typeof v === "function";
  }
  static all(...list){
    if(l.length === 0) return false
    for(const l of list){
      if(l !== true) return false;
    }
    return true
  }
  static one(...list){
    if(l.length === 0) return false;
    for(const l of list) {
      if(l === true) return true;
    }
    return false;
  }
  static isNull(v){
    return v === null;
  }
}
class AppQuery {
  
  constructor(parent){
    this.parent = parent;
    this._events = [];
    this._handles = [];
  }
  removeClass(name){
    this.parent.classList.remove(name);
  }
  addClass(name){
    this.parent.classList.add(name)
  }
  find(tag){
    return [...this.parent.querySelectorAll(tag)].map(e => new AppQuery(e))
  }
  $get(index){
    return this.parent.querySelector(index) || this.parent.querySelector(`[data-index=${JSON.stringify(index)}]`) || null;
  }
  get(index){
    const b = this.$get(index);
    if(b) return new AppQuery(b);
    return null;
  }
  text(text = null){
    if(T.string(text)){
      this.parent.textContent = text;
    }
    return this.parent.textContent;
  }
  html(text = null){
    if(T.string(text)) this.parent.innerHTML = text;
    return this.parent.innerHTML;
  }
  attr(name, value = null){
    if(!T.isNull(value)) {
      this.parent.setAttribute(name, value);
    }
    return this.parent.getAttribute(name)
  }
  on(name, cb){
    if(T.string(name) && T.fun(cb) && !this._events.find(e => e.cb === cb)){
      this.parent.addEventListener(name, cb);
      this._events.push({ name, cb });
    }
  }
  event(name, cb){
    this._handles.push({ name, cb});
  }
  removeEvent(name){
    this._handles = this._handles.filter(e => e.name !== name);
  }
  get css(){
    return this.parent.style
  }
}
class API {
  static error(message){
    return { status: "error", message: message }
  }
  static redirect(url, message){
    return { status: "success", url, message }
  }
}
window.API = API;
class AppProvider {
  constructor(){
    this._actions = new Map();
    this._components = new Map();
    this._screens = new Map();
    this._templates = new Map();
    this.$page = "home";
    this.$args = {};
    this.manager = new AppQuery(document.getElementById("screen_manager"))
  }
  action(url, cb){
    if(T.fun(cb)) this._actions.set(url, cb);
  }
  async request(url, formData){
    const action = this._actions.get(url);
    if(!action){
      return API.error("Erro inesperado");
    }
       return await action(this.$args, formData);
    
  }
  template(name, text){
    this._templates.set(name, Twig.twig({
      data: text
    }));
  }
  component(name, cb){
    if(T.fun(cb)) this._components.set(name, cb);
  }
  screen(name, cb){
    if(T.fun(cb)) this._screens.set(name, cb);
  }
  unmount(){
    this.manager.html("Loading...")
  }
  
  getArgs(url, args={}){
    const [name, ...query] = url.split("?");
    for(const q of query.join("?").split("&")){
      const [n, v = ""] = q.split("=");
      args[n] = v;
    }
    return { name, args };
  }
  
  async mount(url, cArgs = {}){
    this.unmount();
    const { name, args } = this.getArgs(url, cArgs);
    this.$args = args;
    this.$page = url;
    console.log("Renderizando " + name)
    
    const template = this._templates.get(name);
    if(template){
      const pre = this._screens.get(name);
      let vars = { query: args };
      if(pre){
        vars = Object.assign(vars, await pre(args));
      }
      this.manager.html(template.render(vars));
      for(const c of this._components.values()){
        if(T.fun(c)) c(this.manager);
      }
      
    } else {
      this.manager.html("Not Found")
    }
  }
  /*
  screen(name, cb){
    const s = this.manager.get(`[data-screen=${JSON.stringify(name)}]`);
    if(s) {
      s.css.display = "none";
      if(T.fun(cb)) cb(s);
      this._screens.set(name, s);
    }
  }
  mount(name){
    for(const el of document.querySelectorAll("[data-screen]")){
      const n = el.getAttribute("data-screen")
      console.log("Adicionando " + n)
      if(!this._screens.has(n)){
        this.screen(n);
      }
    }
    for(const c of this._components.values()){
      if(T.fun(c)) c(this.manager);
    }
    this.render(name)
  }
  component(name, cb){
    this._components.set(name, cb);
  }
  async render(name){
    console.log("Renderizando " + name)
    for(const s of this._screens.values()){
      s.css.display = "none";
    }
    const el  = this._screens.get(name);
    if(el) {
      const template = await this.
    }
    el.css.display = "block";
  }*/
}

window.app = new AppProvider();

function formatDate(date) {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}

function getLastMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceLastMonday = (dayOfWeek + 6) % 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceLastMonday);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}

function getFormattedWeekDates() {
  const startOfWeek = getLastMonday();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    dates.push(formatDate(currentDate));
  }
  return dates;
}

function getMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const dates = [];
  for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    dates.push(formatDate(date));
  }

  return dates;
}

function findIndexOfMaxValue(obj) {
  let maxValue = -Infinity;
  let maxIndex = null;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] > maxValue) {
        maxValue = obj[key];
        maxIndex = key;
      }
    }
  }

  return maxIndex;
}

function getDateRange(from, to) {
  const dates = [];
  let currentDate = new Date(from);

  while (currentDate <= new Date(to)) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
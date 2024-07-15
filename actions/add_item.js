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
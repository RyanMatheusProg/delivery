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
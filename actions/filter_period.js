const from = form.get("from");
if(!/^[0-9]+\-[0-9]+\-[0-9]+$/.test(from)) return API.error("Data inválida " + from);

const to = form.get("to");
if (!/^[0-9]+\-[0-9]+\-[0-9]+$/.test(to)) return API.error("Data inválida " + to);

return API.redirect("detail?from=" + from + "&to=" + to, "Filtrado com sucesso")
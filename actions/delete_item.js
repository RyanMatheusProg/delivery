await db.delivery.delete(Number(params.id || 0));
return API.redirect("detail", "Removido com sucesso")
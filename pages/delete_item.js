const item = await db.delivery.where({ id: Number(params.id || 0) }).first();

if(!item) return { error: "Not Found"};

return {
  item,
  params
}
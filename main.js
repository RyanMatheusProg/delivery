window.addEventListener("hashchange", () => {
  if(location.hash.length < 2) app.mount("home")
  else app.mount(location.hash.slice(1))
})
document.addEventListener("DOMContentLoaded", async function(){
  
  
  const db = new Dexie("app_db_v2");
  db.version(2).stores({
    delivery: `++id, platform, day, time, money`
  });
  window.db = db;
  
  // Components
  
  document.querySelector("#title").addEventListener("click", () => {
    app.mount("home");
  })
  
  // Render
  const page = localStorage.getItem("last_page") || "home";
  app.component("last_page", () => {
     localStorage.setItem("last_page", app.$page)
  })
  app.mount(page);
});
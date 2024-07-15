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
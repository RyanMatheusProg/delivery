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
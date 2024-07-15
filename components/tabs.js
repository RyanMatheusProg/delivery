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
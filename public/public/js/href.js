if (window.location.host == "www.hterobot.com") {
  let targetProtocol = "https:";
  if (window.location.protocol != targetProtocol)
    window.location.href = targetProtocol +
    window.location.href.substring(window.location.protocol.length);
}
let API_ROOT = "";
console.log(DEFINE_URL, "ddddd");
if (
  location.hostname.indexOf("dev-") != -1 ||
  location.hostname.indexOf("test-") != -1 ||
  location.hostname.indexOf("prod-") != -1
) {
  API_ROOT = `https://${location.hostname}`;
} else {
  API_ROOT = DEFINE_URL;
}

export default API_ROOT;

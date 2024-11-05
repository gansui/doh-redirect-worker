const DOH_ADDRESS = '1.1.1.1'

export default {
  async fetch(request, environment, context) {
//async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url

  if (pathname !== "/dns-query") {
    return Response.redirect("https://baidu.com/", 301)
  }

  //if (request.method !== "GET" && request.method !== "POST") {
  //  return new Response(`Method ${request.method} not allowed.`, { status: 405 })
  //}

  if(request.headers.get('content-type') !== 'application/dns-message') {
        return Response.redirect("https://www.bing.com/", 301)
  }
  const newURL = `https://${DOH_ADDRESS}${pathname}${search}`
  const newRequest = new Request(newURL, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect
  })

  return await fetch(newRequest)
}
}

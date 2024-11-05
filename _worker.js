const DOH_ADDRESS = '1.0.0.1'

export default {
  async fetch(request, environment, context) {
//async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url

  if (pathname !== "/dns-query") {
    return Response.redirect("https://baidu.com/", 301)
  }
  
  const contentType=request.headers.get('content-type')

  if(contentType.toLowerCase() !== 'application/dns-message') {
    return new Response(` Error: Invalid header.\n`, { status: 300 })
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

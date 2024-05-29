const href: string = window.location.href.includes('localhost')
    ? 'http://localhost:8080/' : window.location.href;

export default href;
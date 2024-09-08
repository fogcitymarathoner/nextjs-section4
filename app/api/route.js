
export function GET(request) {
    console.log(request);
    return new Response("Hello World");
}
export function POST(request) {
    console.log(request);
}
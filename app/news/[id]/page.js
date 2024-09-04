export default function NewsDetail({params})
{
    const newsId = params.id
    return (
        <>
            <h1>News Detail Page</h1>
            <p>{newsId}</p>
        </>
    )
}
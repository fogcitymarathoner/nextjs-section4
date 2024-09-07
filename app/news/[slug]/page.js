import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import Link from "next/link";
import ImagePage from "next/image";
import Image from "next/image";

export default function NewsDetail({params}) {
    const newsSlug = params.slug
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug)
    if (!newsItem){
        notFound()
    }
    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    {/*<Image src={newsSlug} alt={newsSlug} />*/}
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
                </Link>

                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    )
}